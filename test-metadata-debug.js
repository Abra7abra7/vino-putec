// Test script pre debug metadát
require('dotenv').config({ path: '.env.local' });

async function testMetadataDebug() {
  console.log('🔍 Testing metadata transfer...');

  // Simulácia PaymentIntent s reálnymi metadátami
  const mockPaymentIntent = {
    id: 'pi_test_metadata_12345',
    currency: 'eur',
    metadata: {
      orderId: 'METADATA12345',
      item_1_id: 'palava-biele-polosuche-2024',
      item_1_title: 'Pálava biele polosuché 2024',
      item_1_qty: '1',
      item_1_price_cents: '1190',
      shippingMethod: 'Kurier (2-3 pracovné dni)',
      shippingPriceCents: '300',
      
      // Billing údaje
      billing_firstName: 'Branislava',
      billing_lastName: 'Putec',
      billing_address1: 'Viničné 123',
      billing_city: 'Bratislava',
      billing_postalCode: '900 23',
      billing_country: 'SK',
      billing_email: 'stancikmarian8@gmail.com',
      billing_phone: '+421 903465666',
      
      // Firemné údaje
      billing_is_company: '1',
      billing_company_name: 'Vino Putec s.r.o.',
      billing_company_ico: '12345678',
      billing_company_dic: 'SK1234567890',
      billing_company_icdph: 'SK1234567890',
      
      // Shipping údaje
      shipping_firstName: 'Branislava',
      shipping_lastName: 'Putec',
      shipping_address1: 'Viničné 123',
      shipping_city: 'Bratislava',
      shipping_postalCode: '900 23',
      shipping_country: 'SK',
      shipping_phone: '+421 903465666',
      shipping_email: 'stancikmarian8@gmail.com',
    },
  };

  console.log('📋 Mock PaymentIntent metadata:');
  console.log(JSON.stringify(mockPaymentIntent.metadata, null, 2));

  // Test mapovania
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

  console.log('\n📋 Mapped Client Data:');
  console.log(JSON.stringify(clientData, null, 2));

  console.log('\n📋 Shipping Data:');
  console.log({
    delivery_address: mockPaymentIntent.metadata.shipping_address1,
    delivery_city: mockPaymentIntent.metadata.shipping_city,
    delivery_zip: mockPaymentIntent.metadata.shipping_postalCode,
    delivery_country_id: getCountryId(mockPaymentIntent.metadata.shipping_country),
  });
}

testMetadataDebug();
