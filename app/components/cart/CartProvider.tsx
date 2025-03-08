"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, Plus, Minus, Trash2, Loader2 } from 'lucide-react';
import { useCartStore, CartItem } from './CartStore';
import Image from 'next/image';
import Link from 'next/link';
import { loadStripe } from '@stripe/stripe-js';

// Create context for cart visibility
const CartContext = createContext<{
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}>({
  isCartOpen: false,
  openCart: () => {},
  closeCart: () => {},
  toggleCart: () => {},
});

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  } = useCartStore();

  // Ensure hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  // Format price to EUR
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };

  // Loading state for checkout
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');

  // Initialize Stripe - make sure to set this in your .env.local file
  // The key should start with pk_test_ or pk_live_
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_TYooMQauvdEDq54NiTphI7jx');

  // Checkout handler
  const handleCheckout = async () => {
    try {
      // Check if cart is empty
      if (items.length === 0) {
        setCheckoutError('Your cart is empty. Please add items before checkout.');
        return;
      }

      setIsCheckingOut(true);
      setCheckoutError('');
      
      // Get the current origin for success and cancel URLs
      const origin = window.location.origin;
      
      // Create checkout session
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items,
          successUrl: `${origin}/checkout/success`,
          cancelUrl: `${origin}/checkout/cancel`,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.text();
        setCheckoutError(`API error: ${response.status} - ${errorData || 'Unknown error'}`);
        setIsCheckingOut(false);
        return;
      }
      
      const data = await response.json();
      
      if (data.error) {
        setCheckoutError(data.error);
        setIsCheckingOut(false);
        return;
      }
      
      if (!data.sessionId) {
        setCheckoutError('Failed to create checkout session. No session ID returned.');
        setIsCheckingOut(false);
        return;
      }
      
      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      if (!stripe) {
        setCheckoutError('Stripe could not be initialized. Please check your configuration.');
        setIsCheckingOut(false);
        return;
      }
      
      const { error } = await stripe.redirectToCheckout({ sessionId: data.sessionId });
      
      if (error) {
        setCheckoutError(error.message || 'An error occurred during checkout.');
        setIsCheckingOut(false);
      }
    } catch (error) {
      setCheckoutError(`An unexpected error occurred: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setIsCheckingOut(false);
    }
  };

  return (
    <CartContext.Provider value={{ isCartOpen, openCart, closeCart, toggleCart }}>
      {children}
      
      {/* Cart Icon with Counter */}
      {isMounted && (
        <div className="fixed bottom-6 right-6 z-40">
          <motion.button
            className="flex items-center justify-center w-14 h-14 bg-[#bf9b30] rounded-full shadow-lg text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleCart}
          >
            <ShoppingCart size={24} />
            {getTotalItems() > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-[#8b0000] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
              >
                {getTotalItems()}
              </motion.div>
            )}
          </motion.button>
        </div>
      )}

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && isMounted && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={closeCart}
            />

            {/* Cart Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-xl z-50 overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-[#1c1917] text-white">
                <h2 className="font-playfair text-xl">Your Cart</h2>
                <button onClick={closeCart} className="p-1 rounded-full hover:bg-white/10">
                  <X size={20} />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-4">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6">
                    <ShoppingCart size={48} className="text-gray-300 mb-4" />
                    <p className="text-gray-500 mb-6">Your cart is empty</p>
                    <Link href="/wines">
                      <button 
                        className="bg-[#bf9b30] text-white py-2 px-4 rounded font-montserrat text-sm uppercase tracking-wider"
                        onClick={closeCart}
                      >
                        Browse Wines
                      </button>
                    </Link>
                  </div>
                ) : (
                  <ul className="space-y-4">
                    {items.map((item) => (
                      <CartItemComponent 
                        key={item.id} 
                        item={item} 
                        updateQuantity={updateQuantity}
                        removeItem={removeItem}
                        formatPrice={formatPrice}
                      />
                    ))}
                  </ul>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="border-t border-gray-200 p-4 bg-gray-50">
                  <div className="flex justify-between mb-4">
                    <span className="font-montserrat">Total</span>
                    <span className="font-playfair text-lg">{formatPrice(getTotalPrice())}</span>
                  </div>
                  
                  <button
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full py-3 bg-[#1c1917] text-white rounded font-montserrat text-sm uppercase tracking-wider hover:bg-[#2c2927] transition-colors flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isCheckingOut ? (
                      <>
                        <Loader2 size={18} className="animate-spin mr-2" />
                        Processing...
                      </>
                    ) : (
                      'Proceed to Checkout'
                    )}
                  </button>
                  
                  {checkoutError && (
                    <div className="mt-2 text-red-600 text-sm text-center">
                      {checkoutError}
                    </div>
                  )}
                  
                  <button
                    onClick={clearCart}
                    className="w-full mt-2 py-2 text-[#8b0000] font-montserrat text-sm flex items-center justify-center hover:underline"
                  >
                    <Trash2 size={16} className="mr-2" />
                    Clear Cart
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </CartContext.Provider>
  );
}

// Cart Item Component
function CartItemComponent({ 
  item, 
  updateQuantity, 
  removeItem,
  formatPrice
}: { 
  item: CartItem;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  formatPrice: (price: number) => string;
}) {
  return (
    <li className="flex border border-gray-100 rounded-lg overflow-hidden shadow-sm">
      {/* Image */}
      <div className="w-24 h-24 relative bg-gray-50 flex-shrink-0">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-contain p-2"
        />
      </div>
      
      {/* Content */}
      <div className="flex-1 flex flex-col p-3">
        <div className="flex justify-between">
          <div>
            <h3 className="font-playfair text-sm text-gray-900">{item.name}</h3>
            <p className="text-xs text-gray-500">{item.year}</p>
          </div>
          <p className="font-playfair text-sm">{formatPrice(item.price)}</p>
        </div>
        
        {/* Quantity Controls */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center border border-gray-200 rounded">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700"
            >
              <Minus size={14} />
            </button>
            <span className="w-8 text-center text-sm">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700"
            >
              <Plus size={14} />
            </button>
          </div>
          
          <button
            onClick={() => removeItem(item.id)}
            className="text-[#8b0000] hover:text-red-700"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </li>
  );
}
