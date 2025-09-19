// Test script pre SuperFaktúra API
const axios = require('axios');

async function testSuperFaktura() {
  const email = process.env.SUPERFAKTURA_EMAIL;
  const apiKey = process.env.SUPERFAKTURA_API_KEY;
  
  console.log('🔍 Testing SuperFaktura API...');
  console.log('Email:', email ? '✅ Set' : '❌ Missing');
  console.log('API Key:', apiKey ? '✅ Set' : '❌ Missing');
  
  if (!email || !apiKey) {
    console.log('❌ SuperFaktura credentials not set in environment');
    return;
  }
  
  try {
    // Test API connection
    const response = await axios.get('https://moja.superfaktura.sk/invoices', {
      headers: {
        'Authorization': `SFAPI email=${email}&apikey=${apiKey}`,
        'Content-Type': 'application/json',
      },
    });
    
    console.log('✅ SuperFaktura API connection successful');
    console.log('Response status:', response.status);
  } catch (error) {
    console.log('❌ SuperFaktura API error:', error.response?.status, error.message);
  }
}

testSuperFaktura();
