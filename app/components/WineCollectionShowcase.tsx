"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Wine as WineType } from "../data/wines";
import { useCart } from "./cart/CartProvider";

// Using the Wine type from the data file to ensure compatibility
type WineProps = WineType;

interface WineCollectionShowcaseProps {
  wines: WineType[];
  title?: string;
  subtitle?: string;
  showAddToCart?: boolean;
  onAddToCart?: (wine: WineType) => void;
}

const WineCard = ({ 
  wine, 
  showAddToCart, 
  onAddToCart 
}: { 
  wine: WineType; 
  showAddToCart?: boolean; 
  onAddToCart?: (wine: WineType) => void 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <motion.div
      className="group relative bg-white rounded-lg overflow-hidden shadow-md transition-all duration-500"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isLoading ? 0.5 : 1, y: 0 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
        y: -2,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      style={{
        border: isHovered ? "1px solid rgba(191, 155, 48, 0.3)" : "1px solid transparent",
      }}
    >
      {/* Image Container */}
      <div className="relative h-[300px] overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{ 
            scale: isHovered ? 1.05 : 1,
            opacity: isHovered ? 0.9 : 1
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Image
            src={wine.image}
            alt={wine.name}
            fill
            className="object-cover"
          />
        </motion.div>
      </div>

      {/* Content */}
      <motion.div 
        className="p-4 bg-white"
        animate={{ 
          backgroundColor: isHovered ? "rgba(250, 250, 250, 1)" : "rgba(255, 255, 255, 1)" 
        }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="font-playfair text-lg text-gray-800 mb-1">{wine.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{wine.region}</p>
        <div className="flex items-center mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star 
              key={i} 
              className={`w-4 h-4 ${i < wine.rating ? 'text-yellow-500' : 'text-gray-300'}`} 
            />
          ))}
        </div>
        <p className="text-gray-600 mb-4 line-clamp-2">{wine.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-gray-800">{wine.price}</span>
          {showAddToCart && (
            <button 
              className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600 transition-colors"
              onClick={(e) => {
                // Prevent navigation when clicking the Add to Cart button
                e.stopPropagation();
                if (!mounted) return;
                
                if (onAddToCart) {
                  onAddToCart(wine);
                } else {
                  addItem({
                    id: wine.id,
                    name: wine.name,
                    price: wine.numericPrice,
                    image: wine.image,
                    year: wine.year,
                    displayName: `${wine.name} (${wine.year})`
                  });
                }
              }}
            >
              Add to Cart
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export function WineCollectionShowcase({
  wines,
  title = "Featured Wines",
  subtitle = "Discover our exceptional collection",
  showAddToCart = false,
  onAddToCart
}: WineCollectionShowcaseProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <motion.h2 
          className="font-playfair text-3xl text-gray-800 mb-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {title}
        </motion.h2>
        <motion.p 
          className="text-gray-600"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-3 text-center">
            <p>Loading...</p>
          </div>
        ) : (
          wines.map((wine) => (
            <Link 
              href={`/wines/${wine.id}`} 
              key={wine.id}
              className="block transition-transform hover:cursor-pointer"
            >
              <WineCard 
                wine={wine} 
                showAddToCart={showAddToCart}
                onAddToCart={onAddToCart}
              />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
