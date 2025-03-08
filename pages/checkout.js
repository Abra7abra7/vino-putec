import { loadStripe } from '@stripe/stripe-js';
import { useEffect } from 'react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Checkout() {
  useEffect(() => {
    const createCheckoutSession = async () => {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [
            { id: 'prod_123', quantity: 1 }, // Example item
          ],
        }),
      });

      const { sessionId } = await response.json();
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId });
    };

    createCheckoutSession();
  }, []);

  return <div>Redirecting to checkout...</div>;
}
