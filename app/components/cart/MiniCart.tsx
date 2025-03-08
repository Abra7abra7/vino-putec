"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, Trash2, Plus, Minus, CreditCard } from 'lucide-react';
import { useCart } from './CartProvider';

const MiniCart = () => {
  const { 
    items, 
    removeItem, 
    updateQuantity, 
    getTotalItems, 
    getTotalPrice,
    isCartOpen,
    setIsCartOpen
  } = useCart();

  if (!isCartOpen) return null;

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
          />
          
          {/* Cart panel */}
          <motion.div 
            className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-xl z-50 flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center">
                <ShoppingCart className="h-5 w-5 text-amber-700 mr-2" />
                <h2 className="text-lg font-medium text-gray-900">Your Cart ({getTotalItems()})</h2>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-gray-500 hover:text-gray-700"
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
                        <div className="h-16 w-16 flex-shrink-0 rounded overflow-hidden bg-gray-100">
                          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                        </div>
                        
                        {/* Product details */}
                        <div className="ml-4 flex-1">
                          <div className="flex justify-between">
                            <div>
                              <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                              <p className="text-xs text-gray-500">{item.year}</p>
                            </div>
                            <p className="text-sm font-medium text-gray-900">€{(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                          
                          {/* Quantity controls */}
                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center border rounded">
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1 text-gray-500 hover:text-gray-700"
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="px-2 text-sm">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 text-gray-500 hover:text-gray-700"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                            
                            <button 
                              onClick={() => removeItem(item.id)}
                              className="text-red-500 hover:text-red-700"
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
                  <span className="text-base font-medium text-gray-900">€{getTotalPrice().toFixed(2)}</span>
                </div>
                <p className="text-sm text-gray-500 mb-4">Shipping and taxes calculated at checkout</p>
                <div className="space-y-2">
                  <a 
                    href="/checkout"
                    className="w-full flex items-center justify-center bg-amber-700 text-white py-3 px-4 rounded-md hover:bg-amber-800 transition-colors"
                  >
                    <CreditCard className="h-5 w-5 mr-2" />
                    Checkout
                  </a>
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
