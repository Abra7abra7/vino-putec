"use client";

import { useEffect, useState } from 'react';
import { useCart } from '../components/cart/CartProvider';
import { motion } from 'framer-motion';
import { CreditCard, ArrowLeft, Facebook, Instagram, Twitter, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { loadStripe } from '@stripe/stripe-js';
import { LuxuryWineryHeader } from '../components/ui/luxury-winery-header';
import { LuxuryWineryFooter } from '../components/ui/luxury-winery-footer';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

export default function CheckoutPage() {
  const { items, getTotalPrice } = useCart();
  const [mounted, setMounted] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

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

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50">
        <LuxuryWineryHeader />
        
        <div className="container mx-auto px-4 py-32 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md"
          >
            <div className="flex justify-center mb-6">
              <ShoppingCart className="h-16 w-16 text-gray-300" />
            </div>
            <h1 className="text-2xl font-playfair font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">Add some wines to your cart before proceeding to checkout.</p>
            <Link
              href="/wines"
              className="inline-flex items-center px-6 py-3 bg-amber-700 text-white rounded-md hover:bg-amber-800 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Browse Our Wines
            </Link>
          </motion.div>
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

  return (
    <main className="min-h-screen bg-gray-50">
      <LuxuryWineryHeader />
      
      <div className="max-w-7xl mx-auto pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white shadow sm:rounded-lg overflow-hidden"
          >
            <div className="px-4 py-5 sm:p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>
              
              {/* Order Summary */}
              <div className="mb-8">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-16 w-16 object-cover rounded"
                        />
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-500">{item.year}</p>
                          <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                        </div>
                      </div>
                      <div className="flex justify-between sm:block">
                        <p className="text-sm font-medium text-gray-500 sm:hidden">Price:</p>
                        <p className="text-sm font-medium text-gray-900">
                          €{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-base font-medium text-gray-900">Total</span>
                  <span className="text-xl font-bold text-gray-900">
                    €{getTotalPrice().toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Payment Button */}
              <div className="mt-8">
                <button
                  type="button"
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-amber-700 hover:bg-amber-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
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
                      Proceed to Payment
                    </>
                  )}
                </button>
              </div>

              {/* Return to Shopping */}
              <div className="mt-4 text-center">
                <Link
                  href="/"
                  className="inline-flex items-center text-sm text-amber-700 hover:text-amber-800 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Continue Shopping
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
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
