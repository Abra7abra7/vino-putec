const Stripe = require('stripe');

// Make sure we have a valid secret key
const secretKey = process.env.STRIPE_SECRET_KEY || '';

// Check if we have a valid key before initializing Stripe
if (!secretKey) {
  console.error('Missing Stripe secret key. Please set STRIPE_SECRET_KEY in your environment variables.');
}

const stripe = new Stripe(secretKey, {
  apiVersion: '2023-10-16', // Use a specific API version
});

module.exports = stripe;
