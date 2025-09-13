import Stripe from "stripe";
import { sendAdminEmail, sendCustomerEmail } from "../../../utils/emailUtilities";

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

  // Handle different event types
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log("✅ Payment succeeded:", paymentIntent.id);
      console.log("💰 Amount:", paymentIntent.amount, paymentIntent.currency);
      console.log("📧 Customer email:", paymentIntent.receipt_email);
      console.log("📋 Order ID:", paymentIntent.metadata?.orderId);
      
      // Send confirmation emails for successful payment
      try {
        const orderId = paymentIntent.metadata?.orderId;
        const customerEmail = paymentIntent.receipt_email;
        
        if (orderId && customerEmail) {
          // Create basic order data for email
          const orderData = {
            orderId,
            orderDate: new Date().toISOString(),
            cartItems: [], // Will be reconstructed from metadata
            shippingForm: {
              firstName: "Customer",
              lastName: "",
              email: customerEmail,
              phone: "",
              country: "",
              state: "",
              city: "",
              address1: "",
              address2: "",
              postalCode: "",
            },
            billingForm: {
              firstName: "Customer", 
              lastName: "",
              email: customerEmail,
              phone: "",
              country: "",
              state: "",
              city: "",
              address1: "",
              address2: "",
              postalCode: "",
            },
            shippingMethod: {
              id: "stripe",
              name: paymentIntent.metadata?.shippingMethod || "Stripe Payment",
              price: 0,
              currency: paymentIntent.currency.toUpperCase(),
            },
            paymentMethodId: "stripe",
          };

          // Reconstruct cart items from metadata
          const cartItems = [];
          let itemIndex = 1;
          while (paymentIntent.metadata[`item_${itemIndex}_title`]) {
            cartItems.push({
              ID: paymentIntent.metadata[`item_${itemIndex}_id`] || `item_${itemIndex}`,
              Title: paymentIntent.metadata[`item_${itemIndex}_title`],
              quantity: parseInt(paymentIntent.metadata[`item_${itemIndex}_qty`] || "1"),
              RegularPrice: paymentIntent.metadata[`item_${itemIndex}_price`] || "0",
              SalePrice: paymentIntent.metadata[`item_${itemIndex}_price`] || "0",
            });
            itemIndex++;
          }
          orderData.cartItems = cartItems;

          // Send emails
          await sendAdminEmail(orderData);
          await sendCustomerEmail(orderData);
          
          console.log("📧 Confirmation emails sent for order:", orderId);
        } else {
          console.log("⚠️ Missing order data in payment intent metadata");
        }
      } catch (emailError) {
        console.error("❌ Failed to send confirmation emails:", emailError);
      }
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

    case "charge.succeeded":
      const charge = event.data.object as Stripe.Charge;
      console.log("💳 Charge succeeded:", charge.id);
      console.log("💰 Amount:", charge.amount, charge.currency);
      console.log("📧 Customer email:", charge.billing_details?.email);
      break;

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
