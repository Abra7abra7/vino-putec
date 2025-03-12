"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { LuxuryWineryHeader } from '../../components/ui/luxury-winery-header';
import { LuxuryWineryFooter } from '../../components/ui/luxury-winery-footer';
import { useCartStore } from '../../components/cart/CartStore';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function CheckoutSuccessPage() {
  // Clear the cart after successful checkout
  useEffect(() => {
    const cartStore = useCartStore.getState();
    cartStore.clearCart();
  }, []);

  return (
    <main className="relative min-h-screen">
      <LuxuryWineryHeader />
      
      <div className="container mx-auto px-4 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <div className="flex justify-center mb-8">
            <CheckCircle className="w-24 h-24 text-green-600" />
          </div>
          
          <h1 className="font-playfair text-4xl mb-6">Order Confirmed</h1>
          
          <p className="text-lg text-stone-700 mb-8">
            Thank you for your purchase! Your order has been successfully placed and is being processed.
            You will receive a confirmation email shortly with your order details.
          </p>
          
          <div className="bg-stone-100 p-6 rounded-lg mb-8">
            <h2 className="font-playfair text-2xl mb-4">What&apos;s Next?</h2>
            <ul className="text-left space-y-4">
              <li className="flex items-start">
                <span className="bg-[#bf9b30] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">1</span>
                <p>You will receive an order confirmation email with details of your purchase.</p>
              </li>
              <li className="flex items-start">
                <span className="bg-[#bf9b30] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">2</span>
                <p>Our team will carefully prepare your wines for shipment.</p>
              </li>
              <li className="flex items-start">
                <span className="bg-[#bf9b30] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">3</span>
                <p>You will receive a shipping confirmation email once your order is on its way.</p>
              </li>
              <li className="flex items-start">
                <span className="bg-[#bf9b30] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">4</span>
                <p>Enjoy your exquisite Putec wines!</p>
              </li>
            </ul>
          </div>
          
          <Link href="/wines">
            <button className="flex items-center justify-center mx-auto py-3 px-8 bg-[#1c1917] text-white rounded font-montserrat text-sm uppercase tracking-wider hover:bg-[#2c2927] transition-colors">
              Continue Shopping
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
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
              { href: "/wines/winemakers-selection", label: "Winemaker&apos;s Selection" },
              { href: "/wines/legacy-series", label: "Legacy Series" },
            ],
          },
        ]}
        contactInfo={{
          address: "Carretera N-122, km 311, 47350 Quintanilla de On&eacute;simo, Valladolid, Spain",
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
