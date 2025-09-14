import { Resend } from 'resend';
import { getLocalization } from "./getLocalization";
import { Product } from "../../types/Product";

// ----- Interfaces -----

export interface Address {
  firstName: string;
  lastName: string;
  country: string;
  state: string;
  city: string;
  address1: string;
  address2: string;
  postalCode: string;
  phone: string;
  email: string;
}

export interface ShippingMethod {
  id: string;
  name: string;
  price: number;
  currency: string;
}

export interface OrderCartItem extends Product {
  quantity: number;
}

export interface OrderBody {
  orderId: string,
  orderDate: string;
  cartItems: OrderCartItem[];
  shippingForm: Address;
  billingForm: Address;
  shippingMethod: ShippingMethod;
  paymentMethodId: string;
}

// ----- Send Email -----

export async function sendEmail({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}) {
  try {
    console.log("📧 Attempting to send email to:", to);
    console.log("📧 From email:", process.env.RESEND_FROM_EMAIL);
    console.log("📧 Subject:", subject);
    console.log("📧 Resend API Key exists:", !!process.env.RESEND_API_KEY);
    
    const resend = new Resend(process.env.RESEND_API_KEY);

    const result = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to,
      subject,
      text,
    });

    console.log("✅ Email sent successfully to:", to, "ID:", result.data?.id);
    console.log("✅ Full result:", JSON.stringify(result, null, 2));
    return result;
  } catch (error) {
    console.error("❌ Failed to send email to:", to);
    console.error("❌ Error details:", JSON.stringify(error, null, 2));
    console.error("❌ Error message:", error instanceof Error ? error.message : 'Unknown error');
    throw error; // Re-throw error so calling functions know it failed
  }
}

// ----- Format Order Summary -----

export function formatOrderSummary(cartItems: OrderCartItem[]): {
  lines: string;
  subtotal: number;
} {
  const lines = cartItems
    .map(
      (item) =>
        `- ${item.Title} × ${item.quantity} = €${(
          parseFloat(item.SalePrice || item.RegularPrice) * item.quantity
        ).toFixed(2)}`
    )
    .join("\n");

  const subtotal = cartItems.reduce(
    (acc, item) =>
      acc + item.quantity * parseFloat(item.SalePrice || item.RegularPrice),
    0
  );

  return { lines, subtotal };
}

// ----- Admin Email -----

export function generateAdminEmail(
  body: OrderBody,
  summary: string,
  subtotal: number,
  shipping: number,
  total: number
): string {
  return `Nová objednávka

Číslo objednávky: ${body.orderId}
Dátum objednávky: ${body.orderDate}
Zákazník: ${body.shippingForm.firstName} ${body.shippingForm.lastName}
Email: ${body.shippingForm.email}
Telefón: ${body.shippingForm.phone}

Dodacia adresa:
${body.shippingForm.address1}
${body.shippingForm.address2}
${body.shippingForm.city}, ${body.shippingForm.state}, ${body.shippingForm.country} ${body.shippingForm.postalCode}

Spôsob doručenia: ${body.shippingMethod.name}
Spôsob platby: ${body.paymentMethodId.toUpperCase()}

Súhrn objednávky:
${summary}

Medzisúčet: €${subtotal.toFixed(2)}
Doprava: €${shipping.toFixed(2)}
Celkom: €${total.toFixed(2)}

Dátum: ${new Date().toLocaleString()}
`;
}

// ----- Customer Email -----

export function generateCustomerEmail(
  body: OrderBody,
  summary: string,
  total: number
): string {
  const { labels, siteName } = getLocalization();
  return `Dobrý deň ${body.shippingForm.firstName},

${labels.orderConfirmationMessage || "Vaša objednávka bola úspešne odoslaná. Oznámime vám, keď ju spracujeme."}

Číslo objednávky: ${body.orderId}
Dátum objednávky: ${body.orderDate}
Spôsob doručenia: ${body.shippingMethod.name}
Spôsob platby: ${body.paymentMethodId.toUpperCase()}

Dodacia adresa:
${body.shippingForm.address1}
${body.shippingForm.address2}
${body.shippingForm.city}, ${body.shippingForm.state}, ${body.shippingForm.country} ${body.shippingForm.postalCode}

Súhrn objednávky:
${summary}

Celkom: €${total.toFixed(2)}

Ďakujeme za nákup!
${siteName || "Vino Putec"}
`;
}

// ----- Send Admin Email -----

export async function sendAdminEmail(body: OrderBody) {
  const { lines, subtotal } = formatOrderSummary(body.cartItems);
  const shipping = body.shippingMethod?.price || 0;
  const total = subtotal + shipping;

  const text = generateAdminEmail(body, lines, subtotal, shipping, total);
  const subject = `🛒 Nová objednávka od ${body.shippingForm.firstName} ${body.shippingForm.lastName}`;

  await sendEmail({
    to: process.env.ADMIN_EMAIL!,
    subject,
    text,
  });
}

// ----- Send Customer Email -----

export async function sendCustomerEmail(body: OrderBody) {
  const { lines, subtotal } = formatOrderSummary(body.cartItems);
  const shipping = body.shippingMethod?.price || 0;
  const total = subtotal + shipping;

  const text = generateCustomerEmail(body, lines, total);
  const subject =
    getLocalization().labels.orderConfirmationTitle || "Potvrdenie objednávky";

  await sendEmail({
    to: body.shippingForm.email,
    subject,
    text,
  });
}
