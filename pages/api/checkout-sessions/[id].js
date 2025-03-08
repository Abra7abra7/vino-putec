import stripe from '../../../lib/stripe';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const session = await stripe.checkout.sessions.retrieve(id);
      
      res.status(200).json({
        id: session.id,
        payment_status: session.payment_status,
        customer_email: session.customer_details?.email,
        amount_total: session.amount_total / 100, // Convert from cents to euros
        currency: session.currency,
        created: new Date(session.created * 1000).toISOString(),
      });
    } catch (err) {
      console.error('Error retrieving checkout session:', err);
      res.status(500).json({ error: err.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
