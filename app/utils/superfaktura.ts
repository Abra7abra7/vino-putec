// app/utils/superfaktura.ts
import axios from 'axios';
import Stripe from 'stripe';

// Definícia štruktúry pre SuperFaktúra faktúru
interface SFInvoice {
  id: string;
  invoice_no_formatted: string;
  total_amount: string;
  invoice_currency: string;
  due: string;
}

// Definícia štruktúry pre položku faktúry v SuperFaktúre
interface SFInvoiceItem {
  name: string;
  description: string;
  quantity: number;
  unit: string;
  unit_price: number;
  tax: number; // Sadzba DPH (napr. 20 pre 20%)
}

// Definícia štruktúry pre údaje klienta v SuperFaktúre
interface SFClientData {
  name: string;
  ico?: string;
  dic?: string;
  ic_dph?: string;
  address: string;
  city: string;
  zip: string;
  country_id: number; // ID krajiny (Slovensko = 189, Česko = 58)
  email: string;
  phone?: string;
}

// Hlavná funkcia na vytvorenie faktúry
export async function createSuperFakturaInvoice(pi: Stripe.PaymentIntent) {
  if (!process.env.SUPERFAKTURA_EMAIL || !process.env.SUPERFAKTURA_API_KEY) {
    console.warn("SuperFaktura credentials are not set. Skipping invoice creation.");
    return;
  }

  const metadata = pi.metadata as Record<string, string>;

  // Mapovanie krajiny na ID podľa SuperFaktúry
  const getCountryId = (countryCode: string) => {
    switch (countryCode) {
      case 'SK': return 189;
      case 'CZ': return 58;
      default: return 189; // Default na Slovensko
    }
  };

  // Príprava dát o klientovi z metadát PaymentIntent
  const clientData: SFClientData = {
    name: metadata.billing_company_name || `${metadata.billing_firstName} ${metadata.billing_lastName}`,
    ico: metadata.billing_company_ico || undefined,
    dic: metadata.billing_company_dic || undefined,
    ic_dph: metadata.billing_company_icdph || undefined,
    address: metadata.billing_address1 || '',
    city: metadata.billing_city || '',
    zip: metadata.billing_postalCode || '',
    country_id: getCountryId(metadata.billing_country),
    email: metadata.billing_email || '',
    phone: metadata.billing_phone || undefined,
  };

  // Príprava položiek faktúry - OPRAVA: používame price_cents namiesto price
  const invoiceItems: SFInvoiceItem[] = [];
  const indices = new Set<number>();
  Object.keys(metadata).forEach(k => {
    const m = k.match(/^item_(\d+)_/);
    if (m) indices.add(parseInt(m[1], 10));
  });

  indices.forEach(i => {
    // OPRAVA: čítame z price_cents a delíme 100 pre eurá
    const unitPriceCents = parseInt(metadata[`item_${i}_price_cents`] || '0', 10);
    const unitPrice = unitPriceCents / 100;
    
    invoiceItems.push({
      name: metadata[`item_${i}_title`] || `Položka ${i}`,
      description: `Produkt ID: ${metadata[`item_${i}_id`]}`,
      quantity: parseInt(metadata[`item_${i}_qty`] || '1', 10),
      unit: 'ks',
      unit_price: unitPrice,
      tax: 20, // Predpokladáme 20% DPH, upravte podľa potreby
    });
  });

  // Pridanie dopravy ako položky faktúry - OPRAVA: používame shippingPriceCents
  const shippingCostCents = parseInt(metadata.shippingPriceCents || '0', 10);
  const shippingCost = shippingCostCents / 100;
  
  if (shippingCost > 0) {
    invoiceItems.push({
      name: `Doprava: ${metadata.shippingMethod || ''}`.trim(),
      description: 'Poplatok za dopravu',
      quantity: 1,
      unit: 'ks',
      unit_price: shippingCost,
      tax: 20, // Predpokladáme 20% DPH
    });
  }
  
  // Príprava finálneho JSONu pre API
  const invoicePayload = {
    Invoice: {
      name: `Objednávka ${metadata.orderId}`,
      invoice_currency: pi.currency.toUpperCase(),
      payment_type: 'prevodom', // alebo 'card'
      vs: metadata.orderId.replace(/[^0-9]/g, '').slice(0, 10) || undefined, // Variabilný symbol z orderId
    },
    InvoiceItem: invoiceItems,
    Client: {
      ...clientData,
      delivery_address: metadata.shipping_address1,
      delivery_city: metadata.shipping_city,
      delivery_zip: metadata.shipping_postalCode,
      delivery_country_id: getCountryId(metadata.shipping_country),
    },
  };

  // Odoslanie požiadavky na SuperFaktúra API
  try {
    const response = await axios.post('https://sandbox.superfaktura.sk/invoices/create', invoicePayload, {
      headers: {
        'Authorization': `SFAPI email=${process.env.SUPERFAKTURA_EMAIL}&apikey=${process.env.SUPERFAKTURA_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.data.error === 0) {
      console.log(`✅ SuperFaktura invoice created successfully for order ${metadata.orderId}. Invoice ID: ${response.data.data.Invoice.id}`);
      
      // Odoslanie emailu s faktúrou zákazníkovi
      try {
        await sendInvoiceEmail(response.data.data.Invoice, clientData.email);
      } catch (emailError) {
        console.warn(`⚠️ Failed to send invoice email:`, emailError);
        // Pokračujeme aj keď email zlyhá
      }
    } else {
      console.error(`❌ SuperFaktura API Error for order ${metadata.orderId}:`, response.data.error_message);
    }
  } catch (error) {
    console.error(`❌ Failed to create SuperFaktura invoice for order ${metadata.orderId}:`, error);
  }
}

// Funkcia na odosielanie emailu s faktúrou zákazníkovi
async function sendInvoiceEmail(invoice: SFInvoice, customerEmail: string): Promise<void> {
  try {
    // Použijeme Resend API pre odosielanie emailu
    const resendResponse = await axios.post('https://api.resend.com/emails', {
      from: 'Vino Putec <faktury@vino-putec.sk>',
      to: [customerEmail],
      subject: `Faktúra ${invoice.invoice_no_formatted} - Vino Putec`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #8B4513;">🍷 Vino Putec - Faktúra</h2>
          
          <p>Dobrý deň,</p>
          
          <p>Ďakujeme za vašu objednávku! Priložená je faktúra č. <strong>${invoice.invoice_no_formatted}</strong>.</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #8B4513;">Detaily faktúry:</h3>
            <p><strong>Číslo faktúry:</strong> ${invoice.invoice_no_formatted}</p>
            <p><strong>Celková suma:</strong> ${invoice.total_amount} ${invoice.invoice_currency}</p>
            <p><strong>Splatnosť:</strong> ${invoice.due}</p>
          </div>
          
          <p>Faktúru si môžete stiahnuť a vytlačiť z vašeho SuperFaktúra účtu.</p>
          
          <p>S pozdravom,<br>
          <strong>Vino Putec</strong><br>
          <em>Rodinná vinárstvo</em></p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
          <p style="font-size: 12px; color: #666;">
            Tento email bol odoslaný automaticky po úspešnej platbe vašej objednávky.
          </p>
        </div>
      `,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    console.log(`📧 Invoice email sent successfully to ${customerEmail}. Email ID: ${resendResponse.data.id}`);
  } catch (error) {
    console.error(`❌ Failed to send invoice email to ${customerEmail}:`, error);
    throw error;
  }
}
