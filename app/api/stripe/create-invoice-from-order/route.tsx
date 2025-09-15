import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { sendEmail, Address } from "../../../utils/emailUtilities";

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {})
  : null;

async function ensureCustomerByEmail(
  email?: string | null,
  name?: string | null
) {
  if (!stripe || !email) return null;
  const existing = await stripe.customers.search({ query: `email:'${email}'` });
  if (existing.data.length > 0) return existing.data[0];
  return await stripe.customers.create({ email: email || undefined, name: name || undefined });
}

function parseLineItemsFromMetadata(md: Record<string, string | undefined>) {
  const items: { title: string; qty: number; unitPriceCents: number }[] = [];
  const indices = new Set<number>();
  Object.keys(md || {}).forEach((k) => {
    const m = k.match(/^item_(\d+)_/);
    if (m) indices.add(parseInt(m[1], 10));
  });

  indices.forEach((i) => {
    const title = md[`item_${i}_title`] || `Položka ${i}`;
    const qty = parseInt(md[`item_${i}_qty`] || "1", 10) || 1;
    const unitPriceCents =
      parseInt(md[`item_${i}_price_cents`] || "0", 10) ||
      Math.round(parseFloat(md[`item_${i}_price`] || "0") * 100);

    if (qty > 0 && unitPriceCents >= 0) {
      items.push({ title, qty, unitPriceCents });
    }
  });

  const shipping = {
    method: md["shippingMethod"],
    priceCents: parseInt(md["shippingPriceCents"] || "0", 10) || 0,
  };

  return { items, shipping };
}

async function createAndSendInvoiceFromPI(pi: Stripe.PaymentIntent, chargeEmail?: string | null, shippingForm?: Address, billingForm?: Address) {
  if (!stripe) return;
  let customerId = typeof pi.customer === "string" ? pi.customer : pi.customer?.id;
  const email = pi.receipt_email || chargeEmail || undefined;

  if (!customerId) {
    const customer = await ensureCustomerByEmail(email, undefined);
    if (!customer) return;
    customerId = customer.id;
  }

  // Update customer with billing/shipping info if provided
  try {
    await stripe.customers.update(customerId, {
      name: billingForm?.firstName || billingForm?.lastName ? `${billingForm?.firstName || ""} ${billingForm?.lastName || ""}`.trim() : undefined,
      email: email,
      address: billingForm ? {
        city: billingForm.city,
        country: billingForm.country,
        line1: billingForm.address1,
        line2: billingForm.address2,
        postal_code: billingForm.postalCode,
        state: billingForm.state,
      } : undefined,
      shipping: shippingForm ? {
        name: `${shippingForm.firstName} ${shippingForm.lastName}`.trim(),
        address: {
          city: shippingForm.city,
          country: shippingForm.country,
          line1: shippingForm.address1,
          line2: shippingForm.address2,
          postal_code: shippingForm.postalCode,
          state: shippingForm.state,
        }
      } : undefined,
    });
  } catch {}

  const orderId = pi.metadata?.orderId || "N/A";
  const { items, shipping } = parseLineItemsFromMetadata((pi.metadata || {}) as Record<string, string>);
  const currency = pi.currency;

  // Determine payment method to charge automatically
  let defaultPaymentMethodId: string | undefined = undefined;
  if (typeof pi.payment_method === "string") {
    defaultPaymentMethodId = pi.payment_method;
  } else if (pi.latest_charge && typeof pi.latest_charge === "string") {
    try {
      const ch = await stripe.charges.retrieve(pi.latest_charge);
      if (typeof ch.payment_method === "string") defaultPaymentMethodId = ch.payment_method;
    } catch {}
  }

  // Attach PM to customer so invoice can charge automatically
  if (defaultPaymentMethodId) {
    try {
      await stripe.paymentMethods.attach(defaultPaymentMethodId, { customer: customerId });
    } catch (e) {
      console.warn("⚠️ attach payment_method to customer failed/ignored", e);
    }
  }

  // Idempotency guard: skip if invoice already exists
  try {
    const existingInvoices = await stripe.invoices.search({
      query: `metadata['orderId']:'${orderId}' OR description:'${orderId}'`
    });
    if (existingInvoices.data.length > 0) {
      console.log("🧾 Invoice already exists for orderId (fallback), skipping:", orderId, existingInvoices.data.map(i => i.id));
      return;
    }
  } catch {}

  // Clean pending invoice items for this order
  try {
    const pendingItems = await stripe.invoiceItems.list({ customer: customerId, limit: 100 });
    for (const ii of pendingItems.data) {
      const desc = (ii as any).description as string | undefined;
      if (!ii.invoice && desc && desc.includes(`[${orderId}]`)) {
        await stripe.invoiceItems.del(ii.id);
      }
    }
  } catch {}

  for (const it of items) {
    const amountCents = it.unitPriceCents * it.qty;
    if (amountCents > 0) {
      await stripe.invoiceItems.create({
        customer: customerId,
        amount: amountCents,
        currency,
        description: `[${orderId}] ${it.title} × ${it.qty}`,
      });
    }
  }

  if (shipping.priceCents > 0) {
    await stripe.invoiceItems.create({
      customer: customerId,
      amount: shipping.priceCents,
      currency,
      description: `[${orderId}] Doprava: ${shipping.method || ""}`.trim(),
    });
  }

  const invoice = await stripe.invoices.create({
    customer: customerId,
    auto_advance: true,
    collection_method: "charge_automatically",
    description: `Objednávka ${orderId}`,
    metadata: { orderId },
    default_payment_method: defaultPaymentMethodId,
    pending_invoice_items_behavior: "include",
  });

  const invoiceId: string = (invoice as any).id as string;
  const finalized = await stripe.invoices.finalizeInvoice(invoiceId);

  // Fallback: send hosted invoice link by email
  try {
    const hostedUrl = (finalized as any).hosted_invoice_url as string | undefined;
    if (email && hostedUrl) {
      await sendEmail({
        to: email,
        subject: `Faktúra za objednávku ${orderId}`,
        text: `Dobrý deň,\n\nvaša faktúra za objednávku ${orderId} je k dispozícii na tejto adrese:\n${hostedUrl}\n\nĎakujeme.`,
      });
    }
  } catch (e) {
    console.warn("⚠️ Failed to send local invoice email", e);
  }

  console.log("🧾 Invoice finalized (auto charge):", (finalized as any).id, (finalized as any).hosted_invoice_url);
}

export async function POST(req: NextRequest) {
  if (!stripe) return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });

  try {
    const { orderId, paymentIntentId, shippingForm, billingForm } = (await req.json()) as { orderId?: string; paymentIntentId?: string; shippingForm?: Address; billingForm?: Address };
    console.log("🧾 create-invoice-from-order called", { orderId, paymentIntentId });

    let pi: Stripe.PaymentIntent | null = null;
    if (paymentIntentId) {
      try {
        pi = await stripe.paymentIntents.retrieve(paymentIntentId);
        console.log("🧾 Found PI by id", pi.id, pi.status);
      } catch (e) {
        console.error("❌ Failed to retrieve PI by id", e);
      }
    }

    if (!pi && orderId) {
      const query = `metadata['orderId']:'${orderId}'`;
      const piList = await stripe.paymentIntents.search({ query });
      console.log("🧾 Search PI by orderId count", piList.data.length);
      if (piList.data.length > 0) {
        pi = piList.data[0];
      }
    }

    if (!pi) {
      return NextResponse.json({ error: "PaymentIntent not found" }, { status: 404 });
    }

    let chargeEmail: string | null | undefined = undefined;
    try {
      if (pi.latest_charge && typeof pi.latest_charge === "string") {
        const charge = await stripe.charges.retrieve(pi.latest_charge);
        chargeEmail = charge.billing_details?.email;
      }
    } catch {}

    await createAndSendInvoiceFromPI(pi, chargeEmail, shippingForm, billingForm);

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("❌ create-invoice-from-order error:", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}


