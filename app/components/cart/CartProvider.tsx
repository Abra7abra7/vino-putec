"use client";

import React, { createContext, useContext, ReactNode, useState } from 'react';
import { useCartStore, CartItem } from './CartStore';
import CartNotification from './CartNotification';

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'> & { displayName?: string }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  // Get cart state from Zustand store
  const cartStore = useCartStore();
  
  // Local state for UI elements
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notification, setNotification] = useState({
    isVisible: false,
    message: '',
    productName: '',
    productImage: ''
  });

  // Enhanced addItem function that shows notification
  const addItemWithNotification = (item: Omit<CartItem, 'quantity'> & { displayName?: string }) => {
    // Call the original addItem function from the store
    cartStore.addItem(item);
    
    // Show notification
    setNotification({
      isVisible: true,
      message: `${item.displayName || item.name} has been added to your cart`,
      productName: item.name,
      productImage: item.image
    });
  };

  // Close notification
  const closeNotification = () => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  };
  
  const value = {
    items: cartStore.items,
    addItem: addItemWithNotification,
    removeItem: cartStore.removeItem,
    updateQuantity: cartStore.updateQuantity,
    clearCart: cartStore.clearCart,
    getTotalItems: cartStore.getTotalItems,
    getTotalPrice: cartStore.getTotalPrice,
    isCartOpen,
    setIsCartOpen
  };

  return (
    <CartContext.Provider value={value}>
      {children}
      <CartNotification 
        isVisible={notification.isVisible}
        message={notification.message}
        productName={notification.productName}
        productImage={notification.productImage}
        onClose={closeNotification}
      />
    </CartContext.Provider>
  );
}
