"use client";

import { useState, useEffect } from 'react';
import { LuxuryWineryHeader } from '../components/ui/luxury-winery-header';
import { LuxuryWineryFooter } from '../components/ui/luxury-winery-footer';
import { WineCollectionShowcase } from '../components/WineCollectionShowcase';
import { wines, Wine as WineType } from '../data/wines';
import { Facebook, Instagram, Twitter } from 'lucide-react';
export default function WinesPage() {
  const [mounted, setMounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string>('default');
  
  // Ensure hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Filter wines by category
  const filteredWines = selectedCategory
    ? wines.filter(wine => wine.category === selectedCategory)
    : wines;

  // Sort wines based on selected option
  const sortedWines = [...filteredWines].sort((a, b) => {
    switch (sortOption) {
      case 'price-asc':
        return a.numericPrice - b.numericPrice;
      case 'price-desc':
        return b.numericPrice - a.numericPrice;
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  // We no longer need this handler as the WineCard component now uses the cart context directly

  const categories = [
    { id: null, name: 'All Wines' },
    { id: 'red', name: 'Red Wines' },
    { id: 'limited', name: 'Limited Editions' },
    { id: 'white', name: 'White Wines' },
    { id: 'rose', name: 'Rosé Wines' }
  ];

  return (
      <main className="relative">
        <LuxuryWineryHeader />
        
        {/* Hero Section */}
        <section className="relative pt-32 pb-16 bg-[#1c1917] text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-playfair text-5xl mb-4">Our Wine Collection</h1>
            <p className="max-w-2xl mx-auto text-white/80">
              Discover our exceptional wines, each bottle a testament to our passion for winemaking and the unique terroir of Ribera del Duero.
            </p>
          </div>
        </section>
        
        {/* Filters Section */}
        <section className="py-8 bg-cream border-b border-stone-200">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category.id || 'all'}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-montserrat transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-[#1c1917] text-white'
                        : 'bg-white text-stone-800 hover:bg-stone-100'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
              
              {/* Sort Options */}
              <div className="flex items-center">
                <label className="text-sm font-montserrat text-stone-600 mr-2">Sort by:</label>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="px-3 py-2 bg-white border border-stone-200 rounded text-sm font-montserrat focus:outline-none focus:ring-2 focus:ring-[#bf9b30]"
                >
                  <option value="default">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                </select>
              </div>
            </div>
          </div>
        </section>
        
        {/* Wines Collection */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            {mounted && (
              <WineCollectionShowcase 
                wines={sortedWines}
                title={selectedCategory ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Wines` : "All Wines"}
                subtitle="Explore our collection of exceptional wines crafted with passion and expertise"
                showAddToCart={true}
              />
            )}
            
            {sortedWines.length === 0 && (
              <div className="text-center py-12">
                <p className="text-stone-500">No wines found in this category.</p>
              </div>
            )}
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
  );
}
