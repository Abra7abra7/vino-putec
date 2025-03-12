"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { XCircle, ArrowLeft, ShoppingCart } from 'lucide-react';
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
          
          <h1 className="font-playfair text-4xl mb-6">Checkout Cancelled</h1>
          
          <p className="text-lg text-stone-700 mb-8">
            Your checkout process has been cancelled. Your cart items are still saved, and you can continue shopping or try again whenever you&apos;re ready.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/wines">
              <button className="flex items-center justify-center py-3 px-8 border border-stone-300 text-stone-800 rounded font-montserrat text-sm uppercase tracking-wider hover:bg-stone-50 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continue Shopping
              </button>
            </Link>
            
            <Link href="/cart">
              <button className="flex items-center justify-center py-3 px-8 bg-amber-700 text-white rounded font-montserrat text-sm uppercase tracking-wider hover:bg-amber-800 transition-colors">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Return to Cart
              </button>
            </Link>
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
