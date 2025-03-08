import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { useCart } from '../app/components/cart/CartProvider';
import Link from 'next/link';
import { ShoppingCart, ArrowLeft, CreditCard, CheckCircle, AlertCircle, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Make sure we have a string value for the key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

export default function Checkout() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { items, getTotalPrice } = useCart();
  const [stage, setStage] = useState('preparing'); // 'preparing', 'redirecting', 'error'

  useEffect(() => {
    // Don't proceed if there are no items in the cart
    if (!items || items.length === 0) {
      setError('Your cart is empty');
      setStage('error');
      setIsLoading(false);
      return;
    }

    const createCheckoutSession = async () => {
      try {
        setIsLoading(true);
        setStage('preparing');
        
        const response = await fetch('/api/create-checkout-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            items: items.map(item => ({
              id: item.id,
              name: item.displayName || item.name,
              price: item.price,
              quantity: item.quantity,
              image: item.image,
              description: item.description || `${item.name} - ${item.year || ''}`.trim(),
            })),
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        const { sessionId } = await response.json();
        const stripe = await stripePromise;
        
        if (!stripe) {
          throw new Error('Failed to load Stripe');
        }
        
        setStage('redirecting');
        
        const { error } = await stripe.redirectToCheckout({ sessionId });
        
        if (error) {
          throw new Error(error.message);
        }
      } catch (err) {
        console.error('Checkout error:', err);
        setError(err.message || 'An unexpected error occurred during checkout');
        setStage('error');
      } finally {
        setIsLoading(false);
      }
    };

    createCheckoutSession();
  }, [items]);

  // Helper function to format price
  const formatPrice = (price) => {
    return `€${price.toFixed(2)}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-playfair font-bold text-gray-900 mb-2">Checkout</h1>
          <div className="flex justify-center items-center space-x-2 text-sm text-gray-500">
            <Link href="/cart" className="text-gray-700">Cart</Link>
            <span>→</span>
            <span className={stage === 'error' ? 'text-red-500 font-medium' : 'text-amber-700 font-medium'}>
              Checkout
            </span>
            <span>→</span>
            <span className="text-gray-400">Confirmation</span>
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="flex flex-col items-center justify-center">
                <motion.div 
                  className="w-16 h-16 mb-6 relative"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                >
                  <div className="absolute inset-0 rounded-full border-t-2 border-amber-700"></div>
                </motion.div>
                
                <h2 className="text-xl font-medium text-gray-800 mb-2">
                  {stage === 'preparing' ? 'Preparing your order...' : 'Redirecting to secure checkout...'}
                </h2>
                <p className="text-gray-600 max-w-md mx-auto">
                  {stage === 'preparing' 
                    ? 'We\'re getting everything ready for your purchase.' 
                    : 'You\'ll be redirected to our secure payment provider in a moment.'}
                </p>
                
                {stage === 'redirecting' && (
                  <motion.div 
                    className="mt-6 flex items-center justify-center space-x-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <span className="w-2 h-2 bg-amber-700 rounded-full animate-pulse"></span>
                    <span className="w-2 h-2 bg-amber-700 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-2 h-2 bg-amber-700 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
                  </motion.div>
                )}
              </div>
            </div>
          ) : error ? (
            <div className="p-8">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                  <AlertCircle className="h-8 w-8 text-red-500" />
                </div>
                <h2 className="text-xl font-medium text-gray-800 mb-2">Checkout Error</h2>
                <p className="text-red-600 mb-6">{error}</p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link 
                  href="/cart" 
                  className="w-full sm:w-auto inline-flex items-center justify-center bg-amber-700 text-white px-6 py-3 rounded-md hover:bg-amber-800 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Return to Cart
                </Link>
                <Link 
                  href="/wines" 
                  className="w-full sm:w-auto inline-flex items-center justify-center bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50 transition-colors"
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Continue Shopping
                </Link>
              </div>
            </div>
          ) : (
            <div className="p-8">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
                <h2 className="text-xl font-medium text-gray-800 mb-2">Ready for Checkout</h2>
                <p className="text-gray-600 mb-6">If you are not redirected automatically, please click the button below.</p>
              </div>
              
              <div className="flex justify-center">
                <button 
                  onClick={() => window.location.href = '/checkout'}
                  className="inline-flex items-center bg-amber-700 text-white px-6 py-3 rounded-md hover:bg-amber-800 transition-colors"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Proceed to Payment
                </button>
              </div>
            </div>
          )}
          
          {/* Cart Summary */}
          {items && items.length > 0 && (
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                {items.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex items-center">
                    <div className="h-16 w-16 flex-shrink-0 rounded overflow-hidden bg-gray-100">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="ml-4 flex-1">
                      <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
                
                {items.length > 3 && (
                  <div className="text-sm text-gray-500 text-center">
                    +{items.length - 3} more items
                  </div>
                )}
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between">
                  <span className="text-base font-medium text-gray-900">Total</span>
                  <span className="text-base font-bold text-amber-700">{formatPrice(getTotalPrice())}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">Including VAT. Shipping calculated at the next step.</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Need help? <a href="/contact" className="text-amber-700 hover:text-amber-800">Contact our support team</a></p>
        </div>
      </div>
    </div>
  );
}
