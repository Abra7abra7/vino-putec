"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface LuxuryHeroProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  ctaText?: string;
  secondaryCtaText?: string;
}

export function LuxuryHero({
  title,
  subtitle,
  backgroundImage,
  ctaText,
  secondaryCtaText,
}: LuxuryHeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 100, damping: 30, bounce: 0 };

  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.5], [1, 0]),
    springConfig
  );

  const scale = useSpring(
    useTransform(scrollYProgress, [0, 0.5], [1, 1.1]),
    springConfig
  );

  return (
    <div
      ref={ref}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Background Image with Parallax Effect */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ scale }}
      >
        <div className="absolute inset-0 bg-black/50 z-10" />
        <Image
          src={backgroundImage || "/images/hero.png"}
          alt="Vineyard at sunset"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Content Container */}
      <motion.div 
        className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4"
        style={{ opacity }}
      >
        {/* Gold decorative element */}
        <motion.div
          className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-1 bg-[#bf9b30]"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 96, opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        />
        <div className="max-w-4xl mx-auto">
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-playfair text-white mb-6 tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {title || "Experience the Art of Fine Wine"}
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-montserrat"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {subtitle || "Where tradition meets excellence in every bottle. Discover our handcrafted wines from sun-drenched vineyards."}
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Link href="/wines">
              <button className="px-8 py-3 bg-[#bf9b30] text-white font-montserrat text-sm uppercase tracking-wider transition-all hover:bg-[#d4af37] rounded">
                {ctaText || "Explore Our Wines"}
              </button>
            </Link>
            <button className="px-8 py-3 bg-transparent border border-white text-white font-montserrat text-sm uppercase tracking-wider transition-all hover:bg-white/10 rounded">
              {secondaryCtaText || "Book a Tasting"}
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        style={{ opacity }}
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
          <motion.div
            className="w-1 h-1 bg-white rounded-full"
            animate={{ y: [0, 16, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </div>
      </motion.div>
    </div>
  );
}
