"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, Trash2, CreditCard } from 'lucide-react';
import { useCart } from './CartProvider';
import { useRouter } from 'next/navigation';
import { QuantitySelector } from '../ui/QuantitySelector';
import Link from 'next/link';
import Image from 'next/image';

const MiniCart = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const { 
    items, 
    removeItem, 
    updateQuantity, 
    getTotalItems, 
    getFormattedTotalPrice,
    isCartOpen,
    setIsCartOpen
  } = useCart();

  // Handle hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleCheckout = () => {
    setIsCartOpen(false);
    router.push('/cart');
  };

  if (!isMounted || !isCartOpen) return null;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            className="fixed inset-0 bg-black/30 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            aria-hidden="true"
          />
          
          {/* Cart panel */}
          <motion.div 
            className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-xl z-50 flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center">
                <ShoppingCart className="h-5 w-5 text-amber-700 mr-2" />
                <h2 className="text-lg font-medium text-gray-900">Your Cart ({getTotalItems()})</h2>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation(); // Prevent event bubbling
                  setIsCartOpen(false);
                }}
                className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-1.5 rounded-full z-50 relative"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Cart content */}
            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <ShoppingCart className="h-12 w-12 text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">Your cart is empty</h3>
                  <p className="text-gray-500 mb-6">Looks like you haven't added any wines to your cart yet.</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="bg-amber-700 text-white px-4 py-2 rounded-md hover:bg-amber-800 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {items.map((item) => (
                    <motion.li 
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="py-4"
                    >
                      <div className="flex items-start">
                        {/* Product image */}
                        <Link 
                          href={item.itemType === 'experience' 
                            ? `/experiences/${item.id.split('-')[0]}` 
                            : item.itemType === 'event'
                            ? `/events/${item.id.split('-')[0]}`
                            : `/wines/${item.id}`} 
                          className="h-16 w-16 flex-shrink-0 rounded overflow-hidden bg-gray-100"
                          onClick={() => setIsCartOpen(false)}
                        >
                          <Image 
                            src={item.image} 
                            alt={item.name} 
                            fill
                            sizes="64px"
                            className="object-cover" 
                          />
                        </Link>
                        
                        {/* Product details */}
                        <div className="ml-4 flex-1">
                          <div className="flex justify-between">
                            <div>
                              <Link 
                                href={item.itemType === 'experience' 
                                  ? `/experiences/${item.id.split('-')[0]}` 
                                  : item.itemType === 'event'
                                  ? `/events/${item.id.split('-')[0]}`
                                  : `/wines/${item.id}`}
                                className="text-sm font-medium text-gray-900 hover:text-amber-700"
                                onClick={() => setIsCartOpen(false)}
                              >
                                {item.name}
                              </Link>
                              
                              {item.year && <p className="text-xs text-gray-500">{item.year}</p>}
                              
                              {item.bookingInfo ? (
                                <div className="mt-1 space-y-1">
                                  <p className="text-xs text-gray-500">
                                    <span className="font-medium">Date:</span> {new Date(item.bookingInfo.date).toLocaleDateString()}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    <span className="font-medium">Time:</span> {item.bookingInfo.time}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    <span className="font-medium">Attendees:</span> {item.bookingInfo.attendees}
                                  </p>
                                </div>
                              ) : (
                                <p className="text-xs text-gray-500 mt-1">€{item.price.toFixed(2)} each</p>
                              )}
                            </div>
                            <p className="text-sm font-medium text-gray-900">€{(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                          
                          {/* Quantity controls */}
                          <div className="mt-2 flex items-center justify-between">
                            {item.bookingInfo ? (
                              <div className="text-xs text-amber-700 italic">
                                {item.itemType === 'experience' ? 'Experience' : 'Event'} Booking
                              </div>
                            ) : (
                              <QuantitySelector
                                quantity={item.quantity}
                                onQuantityChange={(newQuantity) => updateQuantity(item.id, newQuantity)}
                                compact={true}
                              />
                            )}
                            
                            <button 
                              onClick={() => removeItem(item.id)}
                              className="text-red-500 hover:text-red-700 p-1"
                              aria-label={`Remove ${item.name} from cart`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>
            
            {/* Footer with total and checkout */}
            {items.length > 0 && (
              <div className="border-t border-gray-200 p-4">
                <div className="flex justify-between mb-4">
                  <span className="text-base font-medium text-gray-900">Subtotal</span>
                  <span className="text-base font-medium text-gray-900">{getFormattedTotalPrice()}</span>
                </div>
                <p className="text-sm text-gray-500 mb-4">Shipping and taxes calculated at checkout</p>
                <div className="space-y-2">
                  <button 
                    onClick={handleCheckout}
                    className="w-full flex items-center justify-center bg-amber-700 text-white py-3 px-4 rounded-md hover:bg-amber-800 transition-colors"
                  >
                    <CreditCard className="h-5 w-5 mr-2" />
                    Checkout
                  </button>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="w-full py-3 px-4 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MiniCart;
