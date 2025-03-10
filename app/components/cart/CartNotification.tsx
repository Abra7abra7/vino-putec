"use client";

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ShoppingCart, X, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface CartNotificationProps {
  isVisible: boolean;
  message: string;
  onClose: () => void;
  productName?: string;
  productImage?: string;
  quantity?: number;
  productId?: string;
}

const CartNotification = ({
  isVisible,
  message,
  onClose,
  productName,
  productImage,
  quantity = 1,
  productId
}: CartNotificationProps) => {
  const router = useRouter();
  // Auto-close notification after 4 seconds
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 right-6 z-50 max-w-sm w-full"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-amber-100">
            <div className="p-4">
              <div className="flex items-start">
                {/* Success icon */}
                <div className="flex-shrink-0 mr-3">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Added to Cart</h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent event bubbling
                        onClose();
                      }}
                      className="ml-4 inline-flex text-gray-400 hover:text-gray-500 hover:bg-gray-100 p-1 rounded-full focus:outline-none"
                      aria-label="Close notification"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <div className="mt-2 flex items-center">
                    {productImage && (
                      <div className="flex-shrink-0 h-12 w-12 mr-3 bg-gray-100 rounded overflow-hidden">
                        <img src={productImage} alt={productName || "Product"} className="h-full w-full object-cover" />
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-gray-600">{message}</p>
                      {quantity > 1 && (
                        <p className="text-xs text-gray-500 mt-1">Quantity: {quantity}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="mt-4 flex space-x-3">
                <button
                  onClick={onClose}
                  className="flex-1 py-2 px-4 rounded border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={() => {
                    onClose();
                    router.push('/cart');
                  }}
                  className="flex-1 flex justify-center items-center py-2 px-4 rounded bg-amber-700 text-sm font-medium text-white hover:bg-amber-800 focus:outline-none"
                >
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  View Cart
                </button>
              </div>
              
              {/* View product link */}
              {productId && (
                <div className="mt-3 text-center">
                  <Link
                    href={`/wines/${productId}`}
                    className="inline-flex items-center text-sm text-amber-700 hover:text-amber-800"
                    onClick={onClose}
                  >
                    View Product Details
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Link>
                </div>
              )}
            </div>
            
            {/* Progress bar */}
            <motion.div
              className="h-1 bg-amber-500"
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 4, ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartNotification;
