import Stripe from "stripe";

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {})
  : null;

export async function POST(req: Request) {
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

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    console.log("✅ Payment succeeded:", paymentIntent.id);
  }

  return new Response("ok", { status: 200 });
}
