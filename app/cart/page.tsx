"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Trash2, Plus, Minus, CreditCard, ArrowLeft, Wine as WineIcon, Facebook, Instagram, Twitter } from 'lucide-react';
import { useCart } from '../components/cart/CartProvider';
import { LuxuryWineryHeader } from '../components/ui/luxury-winery-header';
import { LuxuryWineryFooter } from '../components/ui/luxury-winery-footer';
import Link from 'next/link';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalItems, getTotalPrice } = useCart();
  const [mounted, setMounted] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Ensure hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
            year: item.year
          })),
          successUrl: `${window.location.origin}/checkout/success`,
          cancelUrl: `${window.location.origin}/checkout/cancel`,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Checkout failed');
      }

      const { sessionId } = await response.json();
      const stripe = await stripePromise;
      if (stripe) {
        await stripe.redirectToCheckout({ sessionId });
      } else {
        throw new Error('Stripe failed to load');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('There was a problem processing your checkout. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (!mounted) {
    return null; // Prevent hydration issues
  }

  return (
    <main className="min-h-screen bg-white">
      <LuxuryWineryHeader />
      
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-2">Your Cart</h1>
          <p className="text-gray-600">
            {getTotalItems() === 0
              ? "Your cart is empty"
              : `You have ${getTotalItems()} item${getTotalItems() !== 1 ? 's' : ''} in your cart`}
          </p>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <div className="flex justify-center mb-4">
              <ShoppingCart className="h-16 w-16 text-gray-300" />
            </div>
            <h2 className="text-2xl font-playfair font-semibold text-gray-800 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 max-w-md mx-auto mb-8">
              Looks like you haven't added any wines to your cart yet. Explore our collection to find the perfect wine for any occasion.
            </p>
            <Link 
              href="/wines" 
              className="inline-flex items-center px-6 py-3 bg-amber-700 text-white rounded-md hover:bg-amber-800 transition-colors"
            >
              <WineIcon className="h-5 w-5 mr-2" />
              Browse Our Wines
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-xl font-playfair font-semibold text-gray-900">Cart Items</h2>
                </div>
                
                <ul className="divide-y divide-gray-100">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.li
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="p-6"
                      >
                        <div className="flex flex-col sm:flex-row items-start">
                          {/* Product image */}
                          <div className="h-24 w-24 flex-shrink-0 rounded overflow-hidden bg-gray-100 mb-4 sm:mb-0">
                            <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                          </div>
                          
                          {/* Product details */}
                          <div className="sm:ml-6 flex-1">
                            <div className="flex flex-col sm:flex-row sm:justify-between">
                              <div>
                                <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                                <p className="text-sm text-gray-500">{item.year}</p>
                              </div>
                              <div className="mt-2 sm:mt-0 text-right">
                                <p className="text-lg font-medium text-gray-900">€{(item.price * item.quantity).toFixed(2)}</p>
                                <p className="text-sm text-gray-500">€{item.price.toFixed(2)} each</p>
                              </div>
                            </div>
                            
                            {/* Quantity controls */}
                            <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                              <div className="flex items-center border rounded max-w-[140px]">
                                <button 
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                                  disabled={item.quantity <= 1}
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="h-4 w-4" />
                                </button>
                                <span className="px-4 py-2 text-gray-700 flex-1 text-center">{item.quantity}</span>
                                <button 
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="p-2 text-gray-500 hover:text-gray-700"
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="h-4 w-4" />
                                </button>
                              </div>
                              
                              <button 
                                onClick={() => removeItem(item.id)}
                                className="text-red-500 hover:text-red-700 flex items-center"
                                aria-label="Remove item"
                              >
                                <Trash2 className="h-4 w-4 mr-1" />
                                <span className="text-sm">Remove</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
                
                <div className="p-6 border-t border-gray-100">
                  <Link 
                    href="/wines" 
                    className="inline-flex items-center text-amber-700 hover:text-amber-800"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 sticky top-24">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-xl font-playfair font-semibold text-gray-900">Order Summary</h2>
                </div>
                
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="text-gray-900 font-medium">€{getTotalPrice().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="text-gray-900 font-medium">Calculated at checkout</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span className="text-gray-900 font-medium">Calculated at checkout</span>
                    </div>
                    
                    <div className="border-t border-gray-100 pt-4 mt-4">
                      <div className="flex justify-between">
                        <span className="text-lg font-medium text-gray-900">Total</span>
                        <span className="text-xl font-bold text-amber-700">€{getTotalPrice().toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <button 
                      onClick={handleCheckout}
                      disabled={isCheckingOut || items.length === 0}
                      className="w-full flex items-center justify-center bg-amber-700 text-white py-3 px-4 rounded-md hover:bg-amber-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isCheckingOut ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          <CreditCard className="h-5 w-5 mr-2" />
                          Proceed to Checkout
                        </>
                      )}
                    </button>
                  </div>
                  
                  <div className="mt-6 text-center text-sm text-gray-500">
                    <p>We accept all major credit cards and PayPal</p>
                    <div className="flex justify-center mt-2 space-x-2">
                      <img src="/images/visa.svg" alt="Visa" className="h-6" />
                      <img src="/images/mastercard.svg" alt="Mastercard" className="h-6" />
                      <img src="/images/amex.svg" alt="American Express" className="h-6" />
                      <img src="/images/paypal.svg" alt="PayPal" className="h-6" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <LuxuryWineryFooter
        brandName="Putec"
        tagline="Crafting exceptional wines in Ribera del Duero since 1892"
        wineCollections={[
          {
            name: "Red Wines",
            links: [
              { href: "/wines/reserve-cabernet", label: "Reserve Cabernet" },
              { href: "/wines/grand-cru-tempranillo", label: "Grand Cru Tempranillo" },
              { href: "/wines/limited-merlot", label: "Limited Edition Merlot" },
              { href: "/wines/crianza", label: "Crianza" },
            ],
          },
          {
            name: "Limited Editions",
            links: [
              { href: "/wines/vintage-collection", label: "Vintage Collection" },
              { href: "/wines/estate-reserve", label: "Estate Reserve" },
              { href: "/wines/winemakers-selection", label: "Winemaker's Selection" },
              { href: "/wines/legacy-series", label: "Legacy Series" },
            ],
          },
        ]}
        contactInfo={{
          address: "Carretera N-122, km 311, 47350 Quintanilla de Onésimo, Valladolid, Spain",
          phone: "+34 983 680 314",
          email: "visitas@putec.com",
        }}
        socialLinks={[
          {
            icon: <Facebook className="h-5 w-5" />,
            href: "https://facebook.com/putecwinery",
            label: "Facebook",
          },
          {
            icon: <Instagram className="h-5 w-5" />,
            href: "https://instagram.com/putecwinery",
            label: "Instagram",
          },
          {
            icon: <Twitter className="h-5 w-5" />,
            href: "https://twitter.com/putecwinery",
            label: "Twitter",
          },
        ]}
        mainLinks={[
          { href: "/about", label: "Our Heritage" },
          { href: "/vineyard", label: "The Vineyard" },
          { href: "/experiences", label: "Wine Experiences" },
          { href: "/events", label: "Private Events" },
          { href: "/contact", label: "Contact" },
        ]}
        legalLinks={[
          { href: "/privacy", label: "Privacy Policy" },
          { href: "/terms", label: "Terms of Service" },
          { href: "/shipping", label: "Shipping Information" },
        ]}
        copyright={{
          text: "© 2024 Putec Winery",
          license: "All rights reserved",
        }}
      />
    </main>
  );
}
