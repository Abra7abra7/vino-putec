"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Wine, Star, X } from "lucide-react";

interface WineProps {
  id: string;
  name: string;
  year: string;
  region: string;
  description: string;
  price: string;
  rating: number;
  image: string;
  detailsUrl?: string;
}

interface WineCollectionShowcaseProps {
  wines: WineProps[];
  title?: string;
  subtitle?: string;
}

const WineCard = ({ wine }: { wine: WineProps }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="group relative bg-white rounded-lg overflow-hidden transition-all duration-500"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isLoading ? 0.5 : 1, y: 0 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        boxShadow: "0 12px 24px rgba(0, 0, 0, 0.1)",
        y: -2,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      style={{
        border: isHovered ? "1px solid rgba(191, 155, 48, 0.3)" : "1px solid transparent",
      }}
      tabIndex={0} // Make focusable for keyboard navigation
      role="button" // Indicate interactive element
    >
      {/* Image Container */}
      <div className="relative h-[400px] overflow-hidden bg-gradient-to-b from-[#f8f5f0] to-[#e8e4e0]">
        <motion.div
          className="absolute inset-0 opacity-70"
          animate={{ 
            scale: isHovered ? 1.1 : 1,
            opacity: isHovered ? 0.6 : 0.7
          }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        >
          <Image
            src={wine.image}
            alt={wine.name}
            fill
            className="object-cover mix-blend-multiply"
          />
        </motion.div>
        
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-[#1c1917]/50 via-transparent to-transparent"
          animate={{ 
            opacity: isHovered ? 0.7 : 0.5 
          }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Wine Bottle Overlay - Improved */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <motion.div 
            className="relative w-[120px] h-[300px] mt-10"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              y: isHovered ? -5 : 0,
              scale: isHovered ? 1.05 : 1
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Image
              src="/images/botle1.png"
              alt="Wine Bottle"
              fill
              className="object-contain drop-shadow-2xl"
              style={{ filter: 'drop-shadow(0 10px 15px rgba(0, 0, 0, 0.4))' }}
            />
          </motion.div>
        </div>
        
        {/* Price Tag */}
        <motion.div 
          className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded"
          whileHover={{ 
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
          }}
          animate={{
            y: isHovered ? 0 : 5,
            opacity: isHovered ? 1 : 0.9
          }}
          transition={{ duration: 0.4 }}
        >
          <span className="font-playfair text-xl text-stone-900">{wine.price}</span>
        </motion.div>
        
        {/* Vintage Badge - New */}
        <motion.div
          className="absolute top-4 left-4 bg-[#bf9b30]/90 backdrop-blur-sm px-3 py-1 rounded text-white font-montserrat text-xs tracking-wider uppercase"
          initial={{ opacity: 0, x: -10 }}
          animate={{ 
            opacity: isHovered ? 1 : 0.8,
            x: isHovered ? 0 : -5
          }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {wine.year}
        </motion.div>
      </div>

      {/* Content */}
      <motion.div 
        className="relative p-6 bg-white"
        animate={{ 
          backgroundColor: isHovered ? "rgba(250, 250, 250, 1)" : "rgba(255, 255, 255, 1)" 
        }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-start justify-between mb-2">
          <motion.div
            animate={{ y: isHovered ? 0 : 5, opacity: isHovered ? 1 : 0.95 }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="font-playfair text-2xl text-stone-900 mb-1">{wine.name}</h3>
            <p className="text-stone-600 text-sm">{wine.region}</p>
          </motion.div>
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Star 
                  className={`w-4 h-4 ${i < wine.rating ? 'text-[#bf9b30] fill-current' : 'text-stone-300'}`} 
                />
              </motion.div>
            ))}
          </div>
        </div>

        <motion.p 
          className="text-stone-600 mb-5 line-clamp-2"
          animate={{ 
            opacity: isHovered ? 1 : 0.8,
            y: isHovered ? 0 : 3
          }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {wine.description}
        </motion.p>

        <motion.button
          className="w-full py-3 rounded font-montserrat text-sm tracking-wider uppercase overflow-hidden relative"
          initial={{ backgroundColor: "#1c1917", color: "#ffffff" }}
          whileHover={{ 
            backgroundColor: "#bf9b30",
            transition: { duration: 0.3 }
          }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            if (wine.detailsUrl) {
              window.open(wine.detailsUrl, '_blank');
            } else {
              setIsModalOpen(true);
            }
          }}
          aria-label={wine.detailsUrl ? `View details of ${wine.name}` : `Open modal for ${wine.name}`}
          disabled={isLoading} // Disable while loading
        >
          <motion.span
            className="relative z-10 inline-block"
            whileHover={{ 
              letterSpacing: "0.15em",
              transition: { duration: 0.4 }
            }}
          >
            {isLoading ? "Loading..." : "View Details"}
          </motion.span>
          <motion.div 
            className="absolute bottom-0 left-0 h-[2px] bg-[#bf9b30]"
            initial={{ width: "0%" }}
            whileHover={{ 
              width: "100%",
              transition: { duration: 0.2, delay: 0.05 }
            }}
            aria-hidden="true"
          />
        </motion.button>
      </motion.div>
      
      {/* Gold accent line */}
      <motion.div 
        className="absolute bottom-0 left-0 h-[2px] bg-[#bf9b30]"
        initial={{ width: "0%" }}
        animate={{ 
          width: isHovered ? "100%" : "0%"
        }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Wine Details Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div 
              className="bg-white max-w-2xl w-full rounded-lg overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-[300px]">
                <Image
                  src={wine.image}
                  alt={wine.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <button 
                  className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/40 transition-colors"
                  onClick={() => setIsModalOpen(false)}
                >
                  <X className="h-5 w-5 text-white" />
                </button>
                <div className="absolute bottom-0 left-0 p-6">
                  <h2 className="text-3xl font-playfair text-white">{wine.name}</h2>
                  <p className="text-white/80 font-montserrat">{wine.year} • {wine.region}</p>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${i < wine.rating ? 'text-[#bf9b30] fill-current' : 'text-stone-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="font-playfair text-2xl text-stone-900">{wine.price}</span>
                </div>
                
                <h3 className="font-playfair text-xl text-stone-900 mb-2">Tasting Notes</h3>
                <p className="text-stone-600 mb-6">{wine.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <h4 className="font-montserrat text-sm text-stone-500 uppercase tracking-wider mb-1">Grape Variety</h4>
                    <p className="font-playfair text-stone-900">Tempranillo, Cabernet</p>
                  </div>
                  <div>
                    <h4 className="font-montserrat text-sm text-stone-500 uppercase tracking-wider mb-1">Alcohol</h4>
                    <p className="font-playfair text-stone-900">14.5%</p>
                  </div>
                  <div>
                    <h4 className="font-montserrat text-sm text-stone-500 uppercase tracking-wider mb-1">Aging</h4>
                    <p className="font-playfair text-stone-900">24 months in oak</p>
                  </div>
                  <div>
                    <h4 className="font-montserrat text-sm text-stone-500 uppercase tracking-wider mb-1">Serving</h4>
                    <p className="font-playfair text-stone-900">16-18°C</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <button className="flex-1 py-3 bg-[#bf9b30] text-white font-montserrat text-sm uppercase tracking-wider hover:bg-[#d4af37] transition-colors rounded">
                    Add to Cart
                  </button>
                  <button className="px-4 py-3 border border-stone-300 text-stone-900 font-montserrat text-sm uppercase tracking-wider hover:bg-stone-100 transition-colors rounded">
                    <Wine className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export function WineCollectionShowcase({
  wines,
  title = "Featured Wines",
  subtitle = "Discover our exceptional collection"
}: WineCollectionShowcaseProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full">
      <div className="text-center mb-12">
        <motion.h2 
          className="font-playfair text-4xl text-stone-900 mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {title}
        </motion.h2>
        <motion.p 
          className="text-stone-600 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          <div className="col-span-3 text-center">
            <p>Loading...</p>
          </div>
        ) : (
          wines.map((wine) => (
            <WineCard key={wine.id} wine={wine} />
          ))
        )}
      </div>
    </div>
  );
}
