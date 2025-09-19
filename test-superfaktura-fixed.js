// Test script pre opravenú SuperFaktúra integráciu
require('dotenv').config({ path: '.env.local' });
const axios = require('axios');

async function testSuperFakturaFixed() {
  console.log('🔍 Testing fixed SuperFaktura integration...');

  const SUPERFAKTURA_EMAIL = process.env.SUPERFAKTURA_EMAIL;
  const SUPERFAKTURA_API_KEY = process.env.SUPERFAKTURA_API_KEY;

  console.log('Email:', SUPERFAKTURA_EMAIL ? '✅ Set' : '❌ Missing');
  console.log('API Key:', SUPERFAKTURA_API_KEY ? '✅ Set' : '❌ Missing');

  if (!SUPERFAKTURA_EMAIL || !SUPERFAKTURA_API_KEY) {
    console.error("❌ SuperFaktura credentials not set in environment");
    return;
  }

  // Simulácia PaymentIntent metadát s reálnymi údajmi
  const mockPaymentIntent = {
    id: 'pi_test_fixed_12345',
    currency: 'eur',
    metadata: {
      orderId: 'FIXEDORDER12345',
      item_1_id: 'palava-biele-polosuche-2024',
      item_1_title: 'Pálava biele polosuché 2024',
      item_1_qty: '2',
      item_1_price_cents: '1190', // 11.90 EUR
      shippingMethod: 'Kurier (2-3 pracovné dni)',
      shippingPriceCents: '300', // 3.00 EUR
      billing_firstName: 'Branislava',
      billing_lastName: 'Putec',
      billing_address1: 'Viničné 123',
      billing_city: 'Bratislava',
      billing_postalCode: '900 23',
      billing_country: 'SK',
      billing_email: 'stancikmarian8@gmail.com',
      billing_company_name: 'Vino Putec s.r.o.',
      billing_company_ico: '12345678',
      billing_company_dic: 'SK1234567890',
      billing_company_icdph: 'SK1234567890',
    },
  };

  // Priamy test SuperFaktúra API s opravenými údajmi
  const getCountryId = (countryCode) => {
    switch (countryCode) {
      case 'SK': return 189;
      case 'CZ': return 58;
      default: return 189;
    }
  };

  const clientData = {
    name: mockPaymentIntent.metadata.billing_company_name || `${mockPaymentIntent.metadata.billing_firstName} ${mockPaymentIntent.metadata.billing_lastName}`,
    ico: mockPaymentIntent.metadata.billing_company_ico || undefined,
    dic: mockPaymentIntent.metadata.billing_company_dic || undefined,
    ic_dph: mockPaymentIntent.metadata.billing_company_icdph || undefined,
    address: mockPaymentIntent.metadata.billing_address1 || '',
    city: mockPaymentIntent.metadata.billing_city || '',
    zip: mockPaymentIntent.metadata.billing_postalCode || '',
    country_id: getCountryId(mockPaymentIntent.metadata.billing_country),
    email: mockPaymentIntent.metadata.billing_email || '',
    phone: mockPaymentIntent.metadata.billing_phone || undefined,
  };

  console.log('📋 Client Data:', JSON.stringify(clientData, null, 2));

  const invoiceItems = [];
  const indices = new Set();
  Object.keys(mockPaymentIntent.metadata).forEach(k => {
    const m = k.match(/^item_(\d+)_/);
    if (m) indices.add(parseInt(m[1], 10));
  });

  indices.forEach(i => {
    const unitPriceCents = parseInt(mockPaymentIntent.metadata[`item_${i}_price_cents`] || '0', 10);
    const unitPrice = unitPriceCents / 100;
    invoiceItems.push({
      name: mockPaymentIntent.metadata[`item_${i}_title`] || `Položka ${i}`,
      description: `Produkt ID: ${mockPaymentIntent.metadata[`item_${i}_id`]}`,
      quantity: parseInt(mockPaymentIntent.metadata[`item_${i}_qty`] || '1', 10),
      unit: 'ks',
      unit_price: unitPrice,
      tax: 20,
    });
  });

  const shippingCost = parseInt(mockPaymentIntent.metadata.shippingPriceCents || '0', 10) / 100;
  if (shippingCost > 0) {
    invoiceItems.push({
      name: `Doprava: ${mockPaymentIntent.metadata.shippingMethod || ''}`.trim(),
      description: 'Poplatok za dopravu',
      quantity: 1,
      unit: 'ks',
      unit_price: shippingCost,
      tax: 20,
    });
  }

  const invoicePayload = {
    Invoice: {
      name: `Test Objednávka ${mockPaymentIntent.metadata.orderId}`,
      invoice_currency: mockPaymentIntent.currency.toUpperCase(),
      payment_type: 'prevodom',
      vs: mockPaymentIntent.metadata.orderId.replace(/[^0-9]/g, '').slice(0, 10) || undefined,
    },
    InvoiceItem: invoiceItems,
    Client: {
      ...clientData,
      delivery_address: mockPaymentIntent.metadata.shipping_address1,
      delivery_city: mockPaymentIntent.metadata.shipping_city,
      delivery_zip: mockPaymentIntent.metadata.shipping_postalCode,
      delivery_country_id: getCountryId(mockPaymentIntent.metadata.shipping_country),
    },
  };

  try {
    console.log('📤 Sending request to SuperFaktura...');
    const response = await axios.post('https://sandbox.superfaktura.sk/invoices/create', invoicePayload, {
      headers: {
        'Authorization': `SFAPI email=${SUPERFAKTURA_EMAIL}&apikey=${SUPERFAKTURA_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('✅ SuperFaktura API response:');
    console.log('Status:', response.status);
    
    if (response.data.error === 0) {
      console.log(`🎉 SUCCESS! Invoice created in SuperFaktura`);
      console.log(`Invoice ID: ${response.data.data.Invoice.id}`);
      console.log(`Invoice Number: ${response.data.data.Invoice.invoice_no_formatted}`);
      console.log(`Total Amount: ${response.data.data.Invoice.total_amount} ${response.data.data.Invoice.invoice_currency}`);
      console.log(`Client Name: ${response.data.data.Client.name}`);
      console.log(`Client Email: ${response.data.data.Client.email}`);
    } else {
      console.error(`❌ SuperFaktura API Error:`, response.data.error_message);
    }
  } catch (error) {
    console.error(`❌ Failed to create SuperFaktura invoice:`, error);
  }
}

testSuperFakturaFixed();