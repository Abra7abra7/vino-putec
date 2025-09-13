"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLocalization } from "../../context/LocalizationContext";

export default function HomepageBanner() {
  const { homepage } = useLocalization(); // Get homepage data

  if (!homepage?.banner) {
    return null; // Prevent render if localization data is missing
  }

  const { title, subtitle, buttonText, ctaLink, imagePath } = homepage.banner;

  return (
    <section
      className="w-full py-40 md:py-60 lg:py-80 text-white flex justify-center items-center text-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${imagePath})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl mx-auto px-6 flex flex-col items-center"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-5xl font-extrabold mb-6 drop-shadow-lg"
        >
          {title}
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl mb-12 text-white max-w-2xl drop-shadow-lg"
        >
          {subtitle}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <Link
            href={ctaLink}
            className="bg-background text-wine-red hover:bg-primary hover:text-wine-dark px-8 py-4 rounded-full text-xl font-bold shadow-lg transition-all transform hover:scale-110"
          >
            {buttonText}
          </Link>
          
          <Link
            href="/accommodation"
            className="bg-wine-red text-background hover:bg-wine-dark hover:text-primary px-8 py-4 rounded-full text-xl font-bold shadow-lg transition-all transform hover:scale-110"
          >
            Ubytovanie
          </Link>
          
          <Link
            href="/degustacie"
            className="bg-primary text-wine-red hover:bg-primary-dark hover:text-wine-dark px-8 py-4 rounded-full text-xl font-bold shadow-lg transition-all transform hover:scale-110"
          >
            Degustácie
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
