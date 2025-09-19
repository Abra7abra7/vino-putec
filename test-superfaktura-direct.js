// Test script pre SuperFaktúra API - priamy test
require('dotenv').config({ path: '.env.local' });
const axios = require('axios');

async function testSuperFakturaDirect() {
  console.log('🔍 Testing SuperFaktura API directly...');
  
  // Test údaje (simulácia objednávky)
  const testData = {
    Invoice: {
      name: "Test Objednávka 12345",
      invoice_currency: "EUR",
      payment_type: "prevodom",
      vs: "12345"
    },
    InvoiceItem: [
      {
        name: "Pálava biele polosuché 2024",
        description: "Produkt ID: palava-biele-polosuche-2024",
        quantity: 1,
        unit: "ks",
        unit_price: 11.90,
        tax: 20
      },
      {
        name: "Doprava: Kurier (2-3 pracovné dni)",
        description: "Poplatok za dopravu",
        quantity: 1,
        unit: "ks",
        unit_price: 3.00,
        tax: 20
      }
    ],
    Client: {
      name: "Test User",
      address: "Test Address 123",
      city: "Bratislava",
      zip: "900 23",
      country_id: 189, // Slovensko
      email: "test@example.com"
    }
  };

  const email = process.env.SUPERFAKTURA_EMAIL;
  const apiKey = process.env.SUPERFAKTURA_API_KEY;
  
  console.log('Email:', email ? '✅ Set' : '❌ Missing');
  console.log('API Key:', apiKey ? '✅ Set' : '❌ Missing');
  
  if (!email || !apiKey) {
    console.log('❌ SuperFaktura credentials not set in environment');
    console.log('Please set SUPERFAKTURA_EMAIL and SUPERFAKTURA_API_KEY in .env.local');
    return;
  }
  
  try {
    console.log('📤 Sending request to SuperFaktura...');
    
    const response = await axios.post('https://sandbox.superfaktura.sk/invoices/create', testData, {
      headers: {
        'Authorization': `SFAPI email=${email}&apikey=${apiKey}`,
        'Content-Type': 'application/json',
      },
    });
    
    console.log('✅ SuperFaktura API response:');
    console.log('Status:', response.status);
    console.log('Data:', JSON.stringify(response.data, null, 2));
    
    if (response.data.error === 0) {
      console.log('🎉 SUCCESS! Invoice created in SuperFaktura');
      console.log('Invoice ID:', response.data.data?.Invoice?.id);
    } else {
      console.log('❌ SuperFaktura API Error:', response.data.error_message);
    }
    
  } catch (error) {
    console.log('❌ SuperFaktura API error:');
    console.log('Status:', error.response?.status);
    console.log('Message:', error.message);
    if (error.response?.data) {
      console.log('Response:', JSON.stringify(error.response.data, null, 2));
    }
  }
}

testSuperFakturaDirect();
