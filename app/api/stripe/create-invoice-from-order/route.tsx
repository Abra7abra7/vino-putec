import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Address } from "../../../utils/emailUtilities";

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

// Fallback endpoint už faktúry nevystavuje – ponechaný len na kontrolu dostupnosti PI

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

    // Odteraz faktúry vystavuje iba webhook; fallback vracia 202/pending
    return NextResponse.json({ ok: true, mode: "webhook_only" }, { status: 202 });
  } catch (e) {
    console.error("❌ create-invoice-from-order error:", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}


