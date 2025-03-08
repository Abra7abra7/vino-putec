"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, ArrowLeft, ShoppingCart, Award } from 'lucide-react';
import { LuxuryWineryHeader } from '../../components/ui/luxury-winery-header';
import { LuxuryWineryFooter } from '../../components/ui/luxury-winery-footer';
import { CartProvider } from '../../components/cart/CartProvider';
import { useCartStore } from '../../components/cart/CartStore';
import { wines } from '../../data/wines';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function WineDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [wine, setWine] = useState(wines.find(w => w.id === id));
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Ensure hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle quantity change
  const handleQuantityChange = (value: number) => {
    if (value < 1) return;
    if (wine && value > wine.stock) return;
    setQuantity(value);
  };

  // Add to cart handler
  const handleAddToCart = () => {
    if (!mounted || !wine) return;
    
    setIsAddingToCart(true);
    
    const cartStore = useCartStore.getState();
    
    // Add item to cart multiple times based on quantity
    for (let i = 0; i < quantity; i++) {
      cartStore.addItem({
        id: wine.id,
        name: wine.name,
        price: wine.numericPrice,
        image: wine.image,
        year: wine.year
      });
    }
    
    // Reset quantity and show success message
    setTimeout(() => {
      setIsAddingToCart(false);
      setQuantity(1);
    }, 1000);
  };

  // If wine not found
  if (!wine) {
    return (
      <CartProvider>
        <main className="relative min-h-screen">
          <LuxuryWineryHeader />
          
          <div className="container mx-auto px-4 py-32 text-center">
            <h1 className="font-playfair text-3xl mb-6">Wine Not Found</h1>
            <p className="mb-8">The wine you are looking for does not exist in our collection.</p>
            <Link href="/wines">
              <button className="luxury-button-dark">
                Return to Collection
              </button>
            </Link>
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
      </CartProvider>
    );
  }

  return (
    <CartProvider>
      <main className="relative">
        <LuxuryWineryHeader />
        
        {/* Back Button */}
        <div className="container mx-auto px-4 pt-32 pb-6">
          <Link href="/wines">
            <button className="flex items-center text-stone-600 hover:text-stone-900 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="font-montserrat text-sm">Back to Collection</span>
            </button>
          </Link>
        </div>
        
        {/* Wine Details */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Wine Image */}
              <div className="relative bg-cream rounded-lg overflow-hidden h-[500px] lg:h-[600px]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative w-[200px] h-[500px]"
                  >
                    <Image
                      src="/images/botle1.png"
                      alt={wine.name}
                      fill
                      className="object-contain drop-shadow-2xl"
                      style={{ filter: 'drop-shadow(0 20px 30px rgba(0, 0, 0, 0.4))' }}
                    />
                  </motion.div>
                </div>
                
                {/* Vintage Badge */}
                <div className="absolute top-6 left-6 bg-[#bf9b30] px-4 py-2 rounded text-white font-montserrat text-sm tracking-wider uppercase">
                  {wine.year}
                </div>
              </div>
              
              {/* Wine Info */}
              <div className="flex flex-col">
                <div className="mb-8">
                  <div className="flex items-start justify-between">
                    <div>
                      <h1 className="font-playfair text-4xl text-stone-900 mb-2">{wine.name}</h1>
                      <p className="text-stone-600 mb-4">{wine.region}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-playfair text-3xl text-stone-900 mb-2">{wine.price}</p>
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i}
                            className={`w-4 h-4 ${i < wine.rating ? 'text-[#bf9b30] fill-current' : 'text-stone-300'}`} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <p className="text-stone-700 leading-relaxed mb-6">
                      {wine.longDescription || wine.description}
                    </p>
                    
                    {/* Stock Status */}
                    <div className="mb-6">
                      <p className="text-sm font-montserrat">
                        Availability: 
                        <span className={`ml-2 ${wine.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {wine.stock > 0 ? `In Stock (${wine.stock} bottles available)` : 'Out of Stock'}
                        </span>
                      </p>
                    </div>
                    
                    {/* Add to Cart Section */}
                    {wine.stock > 0 && mounted && (
                      <div className="flex flex-col sm:flex-row gap-4 mt-8">
                        <div className="flex items-center border border-stone-200 rounded">
                          <button
                            onClick={() => handleQuantityChange(quantity - 1)}
                            className="w-12 h-12 flex items-center justify-center text-stone-500 hover:text-stone-700"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            min="1"
                            max={wine.stock}
                            value={quantity}
                            onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                            className="w-16 h-12 text-center border-x border-stone-200 focus:outline-none"
                          />
                          <button
                            onClick={() => handleQuantityChange(quantity + 1)}
                            className="w-12 h-12 flex items-center justify-center text-stone-500 hover:text-stone-700"
                          >
                            +
                          </button>
                        </div>
                        
                        <button
                          onClick={handleAddToCart}
                          disabled={isAddingToCart}
                          className="flex-1 py-3 px-6 bg-[#1c1917] text-white rounded font-montserrat text-sm uppercase tracking-wider hover:bg-[#2c2927] transition-colors flex items-center justify-center"
                        >
                          {isAddingToCart ? (
                            "Added to Cart!"
                          ) : (
                            <>
                              <ShoppingCart className="w-5 h-5 mr-2" />
                              Add to Cart
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Tasting Notes */}
                {wine.tasting && (
                  <div className="mt-8 border-t border-stone-200 pt-8">
                    <h2 className="font-playfair text-2xl mb-4">Tasting Notes</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {wine.tasting.appearance && (
                        <div>
                          <h3 className="font-montserrat text-sm uppercase tracking-wider text-stone-600 mb-1">Appearance</h3>
                          <p className="text-stone-900">{wine.tasting.appearance}</p>
                        </div>
                      )}
                      {wine.tasting.aroma && (
                        <div>
                          <h3 className="font-montserrat text-sm uppercase tracking-wider text-stone-600 mb-1">Aroma</h3>
                          <p className="text-stone-900">{wine.tasting.aroma}</p>
                        </div>
                      )}
                      {wine.tasting.flavor && (
                        <div>
                          <h3 className="font-montserrat text-sm uppercase tracking-wider text-stone-600 mb-1">Flavor</h3>
                          <p className="text-stone-900">{wine.tasting.flavor}</p>
                        </div>
                      )}
                      {wine.tasting.finish && (
                        <div>
                          <h3 className="font-montserrat text-sm uppercase tracking-wider text-stone-600 mb-1">Finish</h3>
                          <p className="text-stone-900">{wine.tasting.finish}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Food Pairings */}
                {wine.pairings && wine.pairings.length > 0 && (
                  <div className="mt-8 border-t border-stone-200 pt-8">
                    <h2 className="font-playfair text-2xl mb-4">Perfect Pairings</h2>
                    <ul className="list-disc list-inside space-y-1">
                      {wine.pairings.map((pairing, index) => (
                        <li key={index} className="text-stone-700">{pairing}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Awards */}
                {wine.awards && wine.awards.length > 0 && (
                  <div className="mt-8 border-t border-stone-200 pt-8">
                    <h2 className="font-playfair text-2xl mb-4">Awards & Recognition</h2>
                    <div className="space-y-4">
                      {wine.awards.map((award, index) => (
                        <div key={index} className="flex items-start">
                          <Award className="w-5 h-5 text-[#bf9b30] mr-3 mt-1 flex-shrink-0" />
                          <div>
                            <p className="text-stone-900">{award.award}</p>
                            <p className="text-stone-500 text-sm">{award.year}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        
        {/* Footer */}
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
    </CartProvider>
  );
}
