import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { sendEmail } from "../../../utils/emailUtilities";

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

async function createInvoiceIfMissing(pi: Stripe.PaymentIntent, chargeEmail?: string | null) {
  if (!stripe) return { status: 'error' };
  const md = (pi.metadata || {}) as Record<string, string>;
  const orderId = md.orderId || 'N/A';
  let customerId = typeof pi.customer === 'string' ? pi.customer : pi.customer?.id;
  const email = md["billing_email"] || pi.receipt_email || chargeEmail || undefined;

  if (!customerId) {
    const customer = await ensureCustomerByEmail(email, undefined);
    if (!customer) return { status: 'no_customer' };
    customerId = customer.id;
  }

  // Idempotency: if already invoiced or invoice exists, skip
  const piMetadata = (pi.metadata ?? {}) as Record<string, string | undefined>;
  if (piMetadata.invoiced === '1') return { status: 'invoiced' };
  const existing = await stripe.invoices.search({ query: `metadata['orderId']:'${orderId}'` });
  if (existing.data.length > 0) return { status: 'exists', invoiceId: existing.data[0].id };

  // Update customer locale + addresses
  try {
    await stripe.customers.update(customerId, {
      preferred_locales: ['sk', 'sk-SK'],
      email,
      name: md['billing_firstName'] || md['billing_lastName']
        ? `${md['billing_firstName'] || ''} ${md['billing_lastName'] || ''}`.trim()
        : undefined,
      address: {
        line1: md['billing_address1'] || undefined,
        line2: md['billing_address2'] || undefined,
        city: md['billing_city'] || undefined,
        state: md['billing_state'] || undefined,
        postal_code: md['billing_postalCode'] || undefined,
        country: md['billing_country'] || undefined,
      },
      shipping: {
        name: `${md['shipping_firstName'] || ''} ${md['shipping_lastName'] || ''}`.trim(),
        address: {
          line1: md['shipping_address1'] || undefined,
          line2: md['shipping_address2'] || undefined,
          city: md['shipping_city'] || undefined,
          state: md['shipping_state'] || undefined,
          postal_code: md['shipping_postalCode'] || undefined,
          country: md['shipping_country'] || undefined,
        }
      },
      metadata: {
        ico: md['billing_company_ico'] || '',
        dic: md['billing_company_dic'] || '',
        ic_dph: md['billing_company_icdph'] || '',
        company_name: md['billing_company_name'] || ''
      }
    });
  } catch {}

  // Attach payment method to customer if needed
  let defaultPm: string | undefined = undefined;
  if (typeof pi.payment_method === 'string') defaultPm = pi.payment_method;
  else if (pi.latest_charge && typeof pi.latest_charge === 'string') {
    try {
      const ch = await stripe.charges.retrieve(pi.latest_charge);
      if (typeof ch.payment_method === 'string') defaultPm = ch.payment_method;
    } catch {}
  }
  if (defaultPm) {
    try { await stripe.paymentMethods.attach(defaultPm, { customer: customerId }); } catch {}
  }

  // Clean pending invoice items for this order
  try {
    const pending = await stripe.invoiceItems.list({ customer: customerId, limit: 100 });
    for (const ii of pending.data) {
      const desc = (ii.description ?? undefined) as string | undefined;
      if (!ii.invoice && desc && desc.includes(`[${orderId}]`)) {
        await stripe.invoiceItems.del(ii.id);
      }
    }
  } catch {}

  // Recreate invoice items from metadata
  const currency = pi.currency;
  const indices = new Set<number>();
  Object.keys(md).forEach(k => { const m = k.match(/^item_(\d+)_/); if (m) indices.add(parseInt(m[1],10)); });
  for (const i of Array.from(indices).sort((a,b)=>a-b)) {
    const title = md[`item_${i}_title`] || `Položka ${i}`;
    const qty = parseInt(md[`item_${i}_qty`] || '1', 10) || 1;
    const unitCents = parseInt(md[`item_${i}_price_cents`] || '0', 10) || Math.round(parseFloat(md[`item_${i}_price`] || '0')*100);
    const amount = unitCents * qty;
    if (amount > 0) {
      await stripe.invoiceItems.create({ customer: customerId, amount, currency, description: `[${orderId}] ${title} × ${qty}` });
    }
  }
  const shippingCents = parseInt(md['shippingPriceCents'] || '0', 10) || 0;
  if (shippingCents > 0) {
    await stripe.invoiceItems.create({ customer: customerId, amount: shippingCents, currency, description: `[${orderId}] Doprava: ${md['shippingMethod'] || ''}`.trim() });
  }

  const invoice: Stripe.Invoice = await stripe.invoices.create({
    customer: customerId,
    auto_advance: true,
    collection_method: 'charge_automatically',
    description: `Objednávka ${orderId}`,
    metadata: { orderId },
    default_payment_method: defaultPm,
  });
  const finalized: Stripe.Invoice = await stripe.invoices.finalizeInvoice(invoice.id as string);

  try {
    const pdf = (finalized as unknown as Stripe.Invoice).invoice_pdf as string | undefined;
    if (pdf && email) {
      await sendEmail({
        to: email,
        subject: `Faktúra – objednávka ${orderId}`,
        text: `Dobrý deň,\n\nVaša faktúra je pripravená na stiahnutie (PDF):\n${pdf}\n\nĎakujeme za nákup.`,
      });
    }
  } catch {}

  try { await stripe.paymentIntents.update(pi.id, { metadata: { ...piMetadata, invoiced: '1' } as Stripe.MetadataParam }); } catch {}
  return { status: 'created', invoiceId: finalized.id };
}

export async function POST(req: NextRequest) {
  if (!stripe) return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });

  try {
    const { orderId, paymentIntentId } = (await req.json()) as { orderId?: string; paymentIntentId?: string };
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

    const result = await createInvoiceIfMissing(pi, chargeEmail);
    return NextResponse.json({ ok: true, result });
  } catch (e) {
    console.error("❌ create-invoice-from-order error:", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}


