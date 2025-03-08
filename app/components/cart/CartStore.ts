"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  year: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set: any, get: any) => ({
      items: [],
      
      addItem: (item: Omit<CartItem, 'quantity'>) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((i: CartItem) => i.id === item.id);
        
        if (existingItem) {
          set({
            items: currentItems.map((i: CartItem) => 
              i.id === item.id 
                ? { ...i, quantity: i.quantity + 1 } 
                : i
            ),
          });
        } else {
          set({ items: [...currentItems, { ...item, quantity: 1 }] });
        }
      },
      
      removeItem: (id: string) => {
        set({ items: get().items.filter((i: CartItem) => i.id !== id) });
      },
      
      updateQuantity: (id: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        
        set({
          items: get().items.map((i: CartItem) => 
            i.id === id ? { ...i, quantity } : i
          ),
        });
      },
      
      clearCart: () => {
        set({ items: [] });
      },
      
      getTotalItems: () => {
        return get().items.reduce((total: number, item: CartItem) => total + item.quantity, 0);
      },
      
      getTotalPrice: () => {
        return get().items.reduce(
          (total: number, item: CartItem) => total + item.price * item.quantity, 
          0
        );
      },
    }),
    {
      name: 'putec-cart',
    }
  )
);
