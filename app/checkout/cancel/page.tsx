"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { XCircle, ArrowRight, ShoppingCart } from 'lucide-react';
import { LuxuryWineryHeader } from '../../components/ui/luxury-winery-header';
import { LuxuryWineryFooter } from '../../components/ui/luxury-winery-footer';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function CheckoutCancelPage() {
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
            <XCircle className="w-24 h-24 text-red-500" />
          </div>
          
          <h1 className="font-playfair text-4xl mb-6">Order Canceled</h1>
          
          <p className="text-lg text-stone-700 mb-8">
            Your order has been canceled and no payment has been processed.
            Your items are still in your cart if you wish to complete your purchase later.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/wines">
              <button className="py-3 px-8 bg-stone-200 text-stone-800 rounded font-montserrat text-sm uppercase tracking-wider hover:bg-stone-300 transition-colors flex items-center justify-center">
                Continue Shopping
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </Link>
            
            <button 
              onClick={() => {
                // Use client-side navigation to go back to the previous page
                window.history.back();
              }}
              className="py-3 px-8 bg-[#1c1917] text-white rounded font-montserrat text-sm uppercase tracking-wider hover:bg-[#2c2927] transition-colors flex items-center justify-center"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Return to Cart
            </button>
          </div>
          
          <div className="bg-stone-100 p-6 rounded-lg">
            <h2 className="font-playfair text-2xl mb-4">Need Assistance?</h2>
            <p className="mb-4">
              If you encountered any issues during the checkout process or have questions about our wines, 
              please don't hesitate to contact our customer service team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="text-center">
                <p className="font-semibold">Email</p>
                <a href="mailto:sales@putec.com" className="text-[#bf9b30] hover:underline">
                  sales@putec.com
                </a>
              </div>
              <div className="text-center">
                <p className="font-semibold">Phone</p>
                <a href="tel:+34983680314" className="text-[#bf9b30] hover:underline">
                  +34 983 680 314
                </a>
              </div>
            </div>
          </div>
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
