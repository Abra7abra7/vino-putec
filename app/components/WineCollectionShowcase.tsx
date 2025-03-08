"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
      className="group relative bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-500"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative h-[400px] overflow-hidden">
        <Image
          src={wine.image}
          alt={wine.name}
          fill
          className={`object-cover transition-transform duration-700 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Price Tag */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded">
          <span className="font-playfair text-xl text-stone-900">{wine.price}</span>
        </div>
      </div>

      {/* Content */}
      <div className="relative p-6 bg-white">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-playfair text-2xl text-stone-900 mb-1">{wine.name}</h3>
            <p className="text-stone-600 text-sm">{wine.year} • {wine.region}</p>
          </div>
          <div className="flex">
            {Array.from({ length: wine.rating }).map((_, i) => (
              <Star key={i} className="w-4 h-4 text-[#bf9b30] fill-current" />
            ))}
          </div>
        </div>

        <p className="text-stone-600 mb-4 line-clamp-2">{wine.description}</p>

        <motion.button
          className="w-full bg-stone-900 text-white py-3 rounded transition-colors hover:bg-stone-800 font-montserrat text-sm tracking-wider uppercase"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          View Details
        </motion.button>
      </div>
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
