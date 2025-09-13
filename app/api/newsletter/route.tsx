import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email je povinný" }, { status: 400 });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Neplatný email formát" }, { status: 400 });
    }

    // Setup Resend
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Send notification email to admin about new subscription
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: process.env.ADMIN_EMAIL!,
      subject: "Nové prihlásenie do newsletteru",
      html: `
        <h2>Nové prihlásenie do newsletteru</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Dátum:</strong> ${new Date().toLocaleString('sk-SK')}</p>
      `,
    });

    // Send welcome email to subscriber
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: email,
      subject: "Vitajte v našom newsletteri!",
      html: `
        <h2>Ďakujeme za prihlásenie!</h2>
        <p>Vitajte v našom newsletteri. Budeme vás informovať o novinkách a špeciálnych ponukách.</p>
        <p>S pozdravom,<br/>Tím Vino Pútec</p>
      `,
    });

    return NextResponse.json({ success: true, message: "Úspešne prihlásený do newsletteru" });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json({ error: "Chyba servera" }, { status: 500 });
  }
}
