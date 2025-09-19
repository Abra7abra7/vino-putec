// Test script pre Stripe webhook
const axios = require('axios');

async function testWebhook() {
  const webhookUrl = 'https://vino-putec-web.vercel.app/api/stripe/webhook';
  
  console.log('🔍 Testing Stripe webhook...');
  console.log('URL:', webhookUrl);
  
  try {
    // Test webhook endpoint
    const response = await axios.get(webhookUrl);
    console.log('✅ Webhook endpoint accessible');
    console.log('Status:', response.status);
  } catch (error) {
    console.log('❌ Webhook error:', error.response?.status, error.message);
    
    if (error.response?.status === 405) {
      console.log('ℹ️  GET method not allowed (expected for webhook)');
    }
  }
}

testWebhook();
