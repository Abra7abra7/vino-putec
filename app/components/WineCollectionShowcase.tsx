"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Wine, Star } from "lucide-react";

interface WineProps {
  id: string;
  name: string;
  year: string;
  region: string;
  description: string;
  price: string;
  rating: number;
  image: string;
}

interface WineCollectionShowcaseProps {
  wines: WineProps[];
  title?: string;
  subtitle?: string;
}

const WineCard = ({ wine }: { wine: WineProps }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group relative bg-white rounded-lg overflow-hidden transition-all duration-500"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        boxShadow: "0 22px 40px rgba(0, 0, 0, 0.15)",
        y: -5,
        transition: { duration: 0.4, ease: "easeOut" }
      }}
      style={{
        border: isHovered ? "1px solid rgba(191, 155, 48, 0.3)" : "1px solid transparent",
      }}
    >
      {/* Image Container */}
      <div className="relative h-[400px] overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{ 
            scale: isHovered ? 1.1 : 1 
          }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        >
          <Image
            src={wine.image}
            alt={wine.name}
            fill
            className="object-cover"
          />
        </motion.div>
        
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"
          animate={{ 
            opacity: isHovered ? 0.9 : 0.6 
          }}
          transition={{ duration: 0.5 }}
        />
        
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
            transition: { duration: 0.4 }
          }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.span
            className="relative z-10 inline-block"
            whileHover={{ 
              letterSpacing: "0.15em",
              transition: { duration: 0.4 }
            }}
          >
            View Details
          </motion.span>
          <motion.div 
            className="absolute bottom-0 left-0 h-[2px] bg-[#bf9b30]"
            initial={{ width: "0%" }}
            whileHover={{ 
              width: "100%",
              transition: { duration: 0.3, delay: 0.1 }
            }}
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
    </motion.div>
  );
};

export function WineCollectionShowcase({
  wines,
  title = "Featured Wines",
  subtitle = "Discover our exceptional collection"
}: WineCollectionShowcaseProps) {
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
        {wines.map((wine) => (
          <WineCard key={wine.id} wine={wine} />
        ))}
      </div>
    </div>
  );
}
