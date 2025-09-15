import Stripe from "stripe";
import { sendEmail } from "../../../utils/emailUtilities";

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {})
  : null;

export async function POST(req: Request) {
  console.log("🔔 WEBHOOK CALLED - Stripe event received");
  
  if (!stripe) {
    return new Response("Stripe not configured", { status: 500 });
  }

  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return new Response("Missing Stripe signature", { status: 400 });
  }

  let rawBody: string;

  try {
    rawBody = await req.text();
  } catch {
    return new Response("Failed to read request body", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("❌ Webhook error:", message);
    return new Response(`Webhook Error: ${message}`, { status: 400 });
  }

  async function ensureCustomerByEmail(email?: string | null, name?: string | null) {
    if (!email) return null;
    const existing = await (stripe as Stripe).customers.search({
      query: `email:'${email}'`,
    });
    if (existing.data.length > 0) return existing.data[0];
    return await (stripe as Stripe).customers.create({
      email: email || undefined,
      name: name || undefined,
    });
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

  async function createAndSendInvoiceFromPI(pi: Stripe.PaymentIntent, chargeEmail?: string | null) {
    try {
      if ((pi.metadata as any)?.invoiced === '1') {
        console.log('🧾 PI already invoiced, skipping');
        return;
      }
      let customerId = typeof pi.customer === "string" ? pi.customer : pi.customer?.id;
      const email = pi.receipt_email || chargeEmail || undefined;

      if (!customerId) {
        const customer = await ensureCustomerByEmail(email, undefined);
        if (!customer) {
          console.warn("⚠️ No email available to create a customer, skipping invoice.");
          return;
        }
        customerId = customer.id;
      }

      const orderId = pi.metadata?.orderId || "N/A";
      const { items, shipping } = parseLineItemsFromMetadata((pi.metadata || {}) as Record<string, string>);
      const currency = pi.currency;
      // Update customer from PI metadata (billing + shipping) so invoice shows correct info
      try {
        const md = (pi.metadata || {}) as Record<string, string>;
        await (stripe as Stripe).customers.update(customerId, {
          name: md["billing_firstName"] || md["billing_lastName"]
            ? `${md["billing_firstName"] || ''} ${md["billing_lastName"] || ''}`.trim()
            : undefined,
          email: md["billing_email"] || email,
          preferred_locales: ['sk', 'sk-SK'],
          address: {
            line1: md["billing_address1"] || undefined,
            line2: md["billing_address2"] || undefined,
            city: md["billing_city"] || undefined,
            state: md["billing_state"] || undefined,
            postal_code: md["billing_postalCode"] || undefined,
            country: md["billing_country"] || undefined,
          },
          shipping: {
            name: `${md["shipping_firstName"] || ''} ${md["shipping_lastName"] || ''}`.trim(),
            address: {
              line1: md["shipping_address1"] || undefined,
              line2: md["shipping_address2"] || undefined,
              city: md["shipping_city"] || undefined,
              state: md["shipping_state"] || undefined,
              postal_code: md["shipping_postalCode"] || undefined,
              country: md["shipping_country"] || undefined,
            }
          }
        });
        // Store company identifiers to customer metadata for invoice footer/memo
        await (stripe as Stripe).customers.update(customerId, {
          metadata: {
            ico: md['billing_company_ico'] || '',
            dic: md['billing_company_dic'] || '',
            ic_dph: md['billing_company_icdph'] || '',
            company_name: md['billing_company_name'] || ''
          }
        });
      } catch {}

      // Determine payment method to charge automatically
      let defaultPaymentMethodId: string | undefined = undefined;
      if (typeof pi.payment_method === "string") {
        defaultPaymentMethodId = pi.payment_method;
      } else if (pi.latest_charge && typeof pi.latest_charge === "string") {
        try {
          const ch = await (stripe as Stripe).charges.retrieve(pi.latest_charge);
          if (typeof ch.payment_method === "string") defaultPaymentMethodId = ch.payment_method;
        } catch {}
      }

      // Attach PM to customer (required for charge_automatically)
      if (defaultPaymentMethodId) {
        try {
          await (stripe as Stripe).paymentMethods.attach(defaultPaymentMethodId, { customer: customerId });
        } catch (e) {
          // ignore if already attached or cannot attach
          console.warn("⚠️ attach payment_method to customer failed/ignored", e);
        }
      }

      // Idempotency guard: if invoice for this orderId already exists, skip
      let invoiceExists = false;
      try {
        const existingInvoices = await (stripe as Stripe).invoices.search({
          query: `metadata['orderId']:'${orderId}' OR description:'${orderId}'`
        });
        invoiceExists = existingInvoices.data.length > 0;
        if (invoiceExists) {
          console.log("🧾 Invoice already exists for orderId (search)", orderId, existingInvoices.data.map(i => i.id));
        }
      } catch (e) {
        console.warn('⚠️ invoices.search failed, will fallback to list:', e);
      }
      if (!invoiceExists) {
        try {
          const listed = await (stripe as Stripe).invoices.list({ customer: customerId, limit: 10 });
          invoiceExists = listed.data.some(inv => (inv.metadata as any)?.orderId === orderId || inv.description?.includes(orderId));
          if (invoiceExists) console.log('🧾 Invoice already exists for orderId (list)', orderId);
        } catch (e) { console.warn('⚠️ invoices.list failed:', e); }
      }
      if (invoiceExists || (pi.metadata as any)?.invoiced === '1') return;

      // Clean any pending invoice items for this order to avoid duplicates
      try {
        const pendingItems = await (stripe as Stripe).invoiceItems.list({ customer: customerId, limit: 100 });
        let removed = 0;
        for (const ii of pendingItems.data) {
          // Only delete items not yet attached to an invoice and belonging to this order
          const desc = (ii as any).description as string | undefined;
          if (!ii.invoice && desc && desc.includes(`[${orderId}]`)) {
            await (stripe as Stripe).invoiceItems.del(ii.id);
            removed++;
          }
        }
        console.log(`🧹 Removed ${removed} pending invoice_items for order ${orderId}`);
      } catch {}

      // Create invoice items for products
      let createdItems = 0;
      for (const it of items) {
        const amountCents = it.unitPriceCents * it.qty;
        if (amountCents > 0) {
          await (stripe as Stripe).invoiceItems.create({
            customer: customerId,
            amount: amountCents,
            currency,
            description: `[${orderId}] ${it.title} × ${it.qty}`,
          });
          createdItems++;
        }
      }

      // Shipping as separate line
      if (shipping.priceCents > 0) {
        await (stripe as Stripe).invoiceItems.create({
          customer: customerId,
          amount: shipping.priceCents,
          currency,
          description: `[${orderId}] Doprava: ${shipping.method || ""}`.trim(),
        });
        createdItems++;
      }
      console.log(`➕ Created ${createdItems} invoice_items for order ${orderId}`);

      // Create and finalize invoice with send_invoice (manual email from Stripe)
      const invoice = await (stripe as Stripe).invoices.create({
        customer: customerId,
        auto_advance: false,
        collection_method: "send_invoice",
        days_until_due: 7,
        description: `Objednávka ${orderId}`,
        metadata: { orderId },
        pending_invoice_items_behavior: "include",
      });

      const finalized = await (stripe as Stripe).invoices.finalizeInvoice((invoice as any).id as string);
      try {
        await (stripe as Stripe).invoices.sendInvoice((finalized as any).id as string);
      } catch (e) {
        console.warn('⚠️ invoices.send failed', e);
      }
      console.log("🧾 Invoice finalized & sent:", (finalized as any).id, (finalized as any).hosted_invoice_url);
      try { await (stripe as Stripe).paymentIntents.update(pi.id, { metadata: { ...pi.metadata, invoiced: '1' } }); } catch (e) { console.warn('⚠️ failed to set PI.invoiced=1', e); }
    } catch (err) {
      console.error("❌ Failed to create/send invoice:", err);
    }
  }

  console.log(`🔔 Processing event: ${event.type}`);
  
  // Handle different event types
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      let chargeEmail: string | null | undefined = undefined;
      try {
        if (paymentIntent.latest_charge && typeof paymentIntent.latest_charge === "string") {
          const charge = await (stripe as Stripe).charges.retrieve(paymentIntent.latest_charge);
          chargeEmail = charge.billing_details?.email;
        }
      } catch (e) {
        console.warn("⚠️ Unable to retrieve charge for email:", e);
      }

      await createAndSendInvoiceFromPI(paymentIntent, chargeEmail);
      break;

    case "payment_intent.payment_failed":
      const failedPayment = event.data.object as Stripe.PaymentIntent;
      console.log("❌ Payment failed:", failedPayment.id);
      console.log("💸 Amount:", failedPayment.amount, failedPayment.currency);
      console.log("📋 Order ID:", failedPayment.metadata?.orderId);
      break;

    case "payment_intent.canceled":
      const canceledPayment = event.data.object as Stripe.PaymentIntent;
      console.log("🚫 Payment canceled:", canceledPayment.id);
      console.log("📋 Order ID:", canceledPayment.metadata?.orderId);
      break;

    case "payment_intent.requires_action":
      const actionRequired = event.data.object as Stripe.PaymentIntent;
      console.log("⚠️ Payment requires action:", actionRequired.id);
      console.log("📋 Order ID:", actionRequired.metadata?.orderId);
      break;

    // removed charge.succeeded to avoid double-processing

    case "charge.failed":
      const failedCharge = event.data.object as Stripe.Charge;
      console.log("❌ Charge failed:", failedCharge.id);
      console.log("💸 Amount:", failedCharge.amount, failedCharge.currency);
      break;

    case "customer.created":
      const customer = event.data.object as Stripe.Customer;
      console.log("👤 New customer created:", customer.id);
      console.log("📧 Email:", customer.email);
      break;

    case "customer.updated":
      const updatedCustomer = event.data.object as Stripe.Customer;
      console.log("👤 Customer updated:", updatedCustomer.id);
      break;

    default:
      console.log(`🔔 Unhandled event type: ${event.type}`);
  }

  return new Response("ok", { status: 200 });
}
