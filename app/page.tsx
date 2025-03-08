"use client";

import Image from "next/image";
import { LuxuryWineryHeader } from "./components/ui/luxury-winery-header";
import { LuxuryHero } from "./components/ui/luxury-hero";
import { WineCollectionShowcase } from "./components/WineCollectionShowcase";
import { LuxuryWineryFooter } from "./components/ui/luxury-winery-footer";
import { Facebook, Instagram, Twitter } from "lucide-react";

const featuredWines = [
  {
    id: "reserve-cabernet",
    name: "Putec Reserve Cabernet",
    year: "2019",
    region: "Ribera del Duero, Spain",
    description: "A masterpiece of complexity and elegance, featuring rich dark fruits, subtle oak, and a silky finish that lingers.",
    price: "€145",
    rating: 5,
    image: "/images/reserve-cabernet.jpg"
  },
  {
    id: "grand-cru",
    name: "Grand Cru Tempranillo",
    year: "2018",
    region: "Ribera del Duero, Spain",
    description: "Our flagship wine, expressing the pure essence of Spanish terroir with remarkable depth and character.",
    price: "€180",
    rating: 5,
    image: "/images/grand-cru.jpg"
  },
  {
    id: "limited-merlot",
    name: "Limited Edition Merlot",
    year: "2020",
    region: "Ribera del Duero, Spain",
    description: "A rare blend showcasing exceptional balance between fruit and structure, with only 1,000 bottles produced.",
    price: "€120",
    rating: 4,
    image: "/images/limited-merlot.jpg"
  }
];

export default function Home() {
  return (
    <main className="relative">
      <LuxuryWineryHeader />
      
      <LuxuryHero 
        title="Putec Winery"
        subtitle="Crafting exceptional wines in the heart of Ribera del Duero since 1892. Experience the perfect harmony of tradition and innovation."
        backgroundImage="/images/hero.png"
        ctaText="Explore Our Collection"
        secondaryCtaText="Book a Tasting"
      />

      {/* Featured Wines Section */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4">
          <WineCollectionShowcase 
            wines={featuredWines}
            title="Premium Collection"
            subtitle="Discover our most prestigious wines, each bottle a testament to our commitment to excellence"
          />
        </div>
      </section>

      {/* Experience Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/wine-cellar.jpg"
            alt="Putec Wine Cellar"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-playfair text-white mb-6">
              Experience Putec
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Immerse yourself in the art of winemaking with our exclusive tastings and private tours. 
              Let our expert sommeliers guide you through a journey of sensory discovery in our historic cellars.
            </p>
            <button className="luxury-button-light">
              Reserve Your Experience
            </button>
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
  );
}
