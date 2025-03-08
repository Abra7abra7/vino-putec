import stripe from '../../lib/stripe';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Validate the request body
      if (!req.body.items || !Array.isArray(req.body.items)) {
        return res.status(400).json({ error: 'Invalid request: items array is required' });
      }

      // Format line items for Stripe
      const lineItems = req.body.items.map(item => ({
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.name || `Product ID: ${item.id}`,
            images: item.image ? [item.image] : undefined,
            description: item.description,
          },
          unit_amount: Math.round((item.price || 0) * 100), // Convert to cents
        },
        quantity: item.quantity || 1,
      }));

      // Create the checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/cart`,
        shipping_address_collection: {
          allowed_countries: ['ES', 'FR', 'GB', 'DE', 'IT', 'PT', 'US'],
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: {
                amount: 500, // €5.00
                currency: 'eur',
              },
              display_name: 'Standard Shipping',
              delivery_estimate: {
                minimum: {
                  unit: 'business_day',
                  value: 3,
                },
                maximum: {
                  unit: 'business_day',
                  value: 5,
                },
              },
            },
          },
        ],
      });

      res.status(200).json({ sessionId: session.id });
    } catch (err) {
      console.error('Stripe error:', err);
      res.status(500).json({ error: err.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
