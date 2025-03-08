"use client";

import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from './CartProvider';

const CartToggle = () => {
  const { getTotalItems, isCartOpen, setIsCartOpen } = useCart();
  const itemCount = getTotalItems();

  return (
    <motion.button
      className="relative p-2 text-gray-700 hover:text-amber-700 transition-colors"
      onClick={() => setIsCartOpen(!isCartOpen)}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle cart"
    >
      <ShoppingCart className="h-6 w-6" />
      
      {itemCount > 0 && (
        <motion.div
          className="absolute -top-1 -right-1 bg-amber-700 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 25 }}
        >
          {itemCount > 9 ? '9+' : itemCount}
        </motion.div>
      )}
    </motion.button>
  );
};

export default CartToggle;
