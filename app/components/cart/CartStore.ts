"use client";

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  year: string;
}

interface CartState {
  items: CartItem[];
  lastUpdated: number;
}

interface CartActions {
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getFormattedTotalPrice: () => string;
  getItemCount: (id: string) => number;
  isItemInCart: (id: string) => boolean;
}

type CartStore = CartState & CartActions;

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      lastUpdated: Date.now(),
      
      addItem: (item: Omit<CartItem, 'quantity'>, quantity = 1) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((i) => i.id === item.id);
        
        if (existingItem) {
          set({
            items: currentItems.map((i) => 
              i.id === item.id 
                ? { ...i, quantity: i.quantity + quantity } 
                : i
            ),
            lastUpdated: Date.now(),
          });
        } else {
          set({ 
            items: [...currentItems, { ...item, quantity }],
            lastUpdated: Date.now(),
          });
        }
      },
      
      removeItem: (id: string) => {
        set({ 
          items: get().items.filter((i) => i.id !== id),
          lastUpdated: Date.now(),
        });
      },
      
      updateQuantity: (id: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        
        set({
          items: get().items.map((i) => 
            i.id === id ? { ...i, quantity } : i
          ),
          lastUpdated: Date.now(),
        });
      },
      
      clearCart: () => {
        set({ 
          items: [],
          lastUpdated: Date.now(),
        });
      },
      
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity, 
          0
        );
      },
      
      getFormattedTotalPrice: () => {
        return `€${get().getTotalPrice().toFixed(2)}`;
      },
      
      getItemCount: (id: string) => {
        const item = get().items.find(i => i.id === id);
        return item ? item.quantity : 0;
      },
      
      isItemInCart: (id: string) => {
        return get().items.some(item => item.id === id);
      },
    }),
    {
      name: 'putec-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
);
