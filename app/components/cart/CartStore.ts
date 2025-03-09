"use client";

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  year?: string;
  itemType?: 'wine' | 'experience' | 'event';
  bookingInfo?: {
    date: string;
    time: string;
    attendees: number;
    specialRequests?: string;
    dateId: string;
  };
}

interface CartState {
  items: CartItem[];
  lastUpdated: number;
}

interface CartActions {
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  addBookingItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateBookingAttendees: (id: string, attendees: number) => void;
  updateBookingSpecialRequests: (id: string, specialRequests: string) => void;
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
        const existingItem = currentItems.find((i) => i.id === item.id && !i.bookingInfo);
        
        if (existingItem) {
          set({
            items: currentItems.map((i) => 
              i.id === item.id && !i.bookingInfo
                ? { ...i, quantity: i.quantity + quantity } 
                : i
            ),
            lastUpdated: Date.now(),
          });
        } else {
          set({ 
            items: [...currentItems, { ...item, quantity, itemType: 'wine' }],
            lastUpdated: Date.now(),
          });
        }
      },
      
      addBookingItem: (item: Omit<CartItem, 'quantity'>) => {
        const currentItems = get().items;
        // Create a unique ID for the booking item to prevent merging with other bookings
        const bookingId = `${item.id}-${item.bookingInfo?.dateId}`;
        
        // For bookings, we always add as a new item with a unique ID
        set({ 
          items: [...currentItems, { ...item, id: bookingId, quantity: 1 }],
          lastUpdated: Date.now(),
        });
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
      
      updateBookingAttendees: (id: string, attendees: number) => {
        if (attendees <= 0) {
          get().removeItem(id);
          return;
        }
        
        set({
          items: get().items.map((i) => 
            i.id === id && i.bookingInfo 
              ? { 
                  ...i, 
                  bookingInfo: { ...i.bookingInfo, attendees },
                  // Update quantity to match attendees for booking items
                  quantity: attendees
                } 
              : i
          ),
          lastUpdated: Date.now(),
        });
      },
      
      updateBookingSpecialRequests: (id: string, specialRequests: string) => {
        set({
          items: get().items.map((i) => 
            i.id === id && i.bookingInfo 
              ? { 
                  ...i, 
                  bookingInfo: { ...i.bookingInfo, specialRequests }
                } 
              : i
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
