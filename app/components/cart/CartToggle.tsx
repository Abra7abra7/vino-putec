"use client";

import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from './CartProvider';

const CartToggle = () => {
  const { getTotalItems, isCartOpen, setIsCartOpen } = useCart();
  const [isMounted, setIsMounted] = useState(false);
  const [itemCount, setItemCount] = useState(0);
  const [hasItemsChanged, setHasItemsChanged] = useState(false);

  // Handle hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Update item count and track changes for animation
  useEffect(() => {
    if (isMounted) {
      const newCount = getTotalItems();
      if (newCount !== itemCount) {
        setHasItemsChanged(true);
        setTimeout(() => setHasItemsChanged(false), 300);
      }
      setItemCount(newCount);
    }
  }, [getTotalItems, isMounted, itemCount]);

  if (!isMounted) return null;

  return (
    <motion.button
      className="relative p-2 text-gray-700 hover:text-amber-700 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50 rounded-full"
      onClick={() => setIsCartOpen(!isCartOpen)}
      whileTap={{ scale: 0.95 }}
      aria-label={`${isCartOpen ? 'Close' : 'Open'} shopping cart with ${itemCount} items`}
      aria-expanded={isCartOpen}
      aria-controls="mini-cart"
    >
      <ShoppingCart className="h-6 w-6" />
      
      {itemCount > 0 && (
        <motion.div
          className="absolute -top-1 -right-1 bg-amber-700 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ 
            scale: hasItemsChanged ? [1, 1.2, 1] : 1, 
            opacity: 1 
          }}
          transition={{ 
            type: hasItemsChanged ? "keyframes" : "spring",
            stiffness: 500, 
            damping: 25 
          }}
        >
          {itemCount > 9 ? '9+' : itemCount}
        </motion.div>
      )}
    </motion.button>
  );
};

export default CartToggle;
