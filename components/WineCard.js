import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const WineCard = ({ wine }) => {
  const handleBuyNow = async () => {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: [{ id: wine.id, quantity: 1 }],
      }),
    });

    const { sessionId } = await response.json();
    const stripe = await stripePromise;
    await stripe.redirectToCheckout({ sessionId });
  };

  const handleAddToCart = () => {
    // Logic to add the wine to the cart
    console.log('Add to cart:', wine.name);
  };

  return (
    <div className="wine-card p-4 bg-white rounded-lg shadow-md">
      <div className="wine-image-container mb-4">
        <img src={wine.image} alt={wine.name} className="wine-image w-full h-48 object-cover rounded-t-lg" />
      </div>
      <h3 className="text-lg font-bold mb-2">{wine.name}</h3>
      <p className="text-sm text-gray-600 mb-4">{wine.description}</p>
      <div className="flex justify-between">
        <button onClick={handleBuyNow} className="bg-blue-500 text-white py-2 px-4 rounded">Buy Now</button>
        <button onClick={handleAddToCart} className="bg-green-500 text-white py-2 px-4 rounded">Add to Cart</button>
      </div>
    </div>
  );
};

export default WineCard;
