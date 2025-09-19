// Test script pre produkčnú SuperFaktúra
require('dotenv').config({ path: '.env.local' });
const axios = require('axios');

async function testProductionSuperFaktura() {
  console.log('🔍 Testing production SuperFaktura...');

  const SUPERFAKTURA_EMAIL = process.env.SUPERFAKTURA_EMAIL;
  const SUPERFAKTURA_API_KEY = process.env.SUPERFAKTURA_API_KEY;

  console.log('Email:', SUPERFAKTURA_EMAIL ? '✅ Set' : '❌ Missing');
  console.log('API Key:', SUPERFAKTURA_API_KEY ? '✅ Set' : '❌ Missing');

  if (!SUPERFAKTURA_EMAIL || !SUPERFAKTURA_API_KEY) {
    console.error("❌ SuperFaktura credentials not set in environment");
    console.error("Please set SUPERFAKTURA_EMAIL and SUPERFAKTURA_API_KEY in .env.local");
    return;
  }

  // Testovacie údaje s reálnymi informáciami
  const testData = {
    Invoice: {
      name: "Test Objednávka PROD12345",
      invoice_currency: "EUR",
      payment_type: "prevodom",
      vs: "PROD12345",
    },
    InvoiceItem: [
      {
        name: "Pálava biele polosuché 2024",
        description: "Produkt ID: palava-biele-polosuche-2024",
        quantity: 1,
        unit: "ks",
        unit_price: 11.90,
        tax: 20,
      },
      {
        name: "Doprava: Kurier (2-3 pracovné dni)",
        description: "Poplatok za dopravu",
        quantity: 1,
        unit: "ks",
        unit_price: 3.00,
        tax: 20,
      }
    ],
    Client: {
      name: "Vino Putec s.r.o.",
      ico: "12345678",
      dic: "SK1234567890",
      ic_dph: "SK1234567890",
      address: "Viničné 123",
      city: "Bratislava",
      zip: "900 23",
      country_id: 189, // Slovensko
      email: "stancikmarian8@gmail.com",
    },
  };

  try {
    console.log('📤 Sending request to production SuperFaktura...');
    
    const response = await axios.post('https://moja.superfaktura.sk/invoices/create', testData, {
      headers: {
        'Authorization': `SFAPI email=${SUPERFAKTURA_EMAIL}&apikey=${SUPERFAKTURA_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('✅ SuperFaktura API response:');
    console.log('Status:', response.status);
    
    if (response.data.error === 0) {
      console.log(`🎉 SUCCESS! Invoice created in production SuperFaktura`);
      console.log(`Invoice ID: ${response.data.data.Invoice.id}`);
      console.log(`Invoice Number: ${response.data.data.Invoice.invoice_no_formatted}`);
      console.log(`Total Amount: ${response.data.data.Invoice.total_amount} ${response.data.data.Invoice.invoice_currency}`);
    } else {
      console.error(`❌ SuperFaktura API Error:`, response.data.error_message);
    }
  } catch (error) {
    console.error(`❌ Failed to create SuperFaktura invoice:`, error);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

testProductionSuperFaktura();
