"use client";

import Image from "next/image";
import { LuxuryWineryHeader } from "../components/ui/luxury-winery-header";
import { LuxuryWineryFooter } from "../components/ui/luxury-winery-footer";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <main className="relative">
      <LuxuryWineryHeader />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/wine.png"
            alt="Putec Winery Heritage"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.h1 
            className="text-5xl md:text-6xl font-playfair text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Heritage
          </motion.h1>
          <motion.p 
            className="text-xl text-white/90 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            A story of passion, tradition, and innovation that spans over a century
          </motion.p>
        </div>
      </section>

      {/* History Section */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-playfair text-stone-900 mb-6">
                Established in 1892
              </h2>
              <p className="text-lg text-stone-700 mb-6">
                Putec Winery was founded by Antonio Putec, a visionary who recognized the exceptional terroir of Ribera del Duero. His commitment to quality and passion for winemaking laid the foundation for what would become one of Spain's most prestigious wineries.
              </p>
              <p className="text-lg text-stone-700 mb-6">
                Through generations, the Putec family has maintained their founder's unwavering commitment to excellence, combining traditional methods with innovative techniques to create wines that reflect the unique character of our land.
              </p>
              <p className="text-lg text-stone-700">
                Today, Putec Winery stands as a testament to the family's dedication, producing wines that are celebrated by connoisseurs around the world for their complexity, elegance, and authentic expression of the Ribera del Duero region.
              </p>
            </motion.div>
            <motion.div
              className="relative h-[500px] rounded-lg overflow-hidden"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Image
                src="/images/botle2.png"
                alt="Putec Winery Historical Photo"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-playfair text-stone-900 mb-6">
              Our Philosophy
            </h2>
            <p className="text-lg text-stone-700">
              At Putec, we believe that exceptional wine is born in the vineyard. Our approach combines respect for tradition with a commitment to innovation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-cream p-8 rounded-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-playfair text-stone-900 mb-4">Respect for Terroir</h3>
              <p className="text-stone-700">
                We recognize that our wines are a reflection of our unique terroir. We work in harmony with nature, allowing each vintage to express the distinct character of our land.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-cream p-8 rounded-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-playfair text-stone-900 mb-4">Artisanal Approach</h3>
              <p className="text-stone-700">
                Each bottle of Putec wine is crafted with meticulous attention to detail. We favor traditional, hands-on winemaking methods that allow us to create wines of exceptional quality and character.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-cream p-8 rounded-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-playfair text-stone-900 mb-4">Sustainable Practices</h3>
              <p className="text-stone-700">
                We are dedicated to sustainable viticulture and winemaking practices that preserve our land for future generations, ensuring the continued legacy of Putec Winery.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-stone-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-playfair text-white mb-6">
              Meet Our Team
            </h2>
            <p className="text-lg text-white/80">
              The passionate individuals behind Putec's exceptional wines
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="relative h-80 mb-6 rounded-lg overflow-hidden">
                <Image
                  src="/images/ceo.png"
                  alt="Elena Putec - Head Winemaker"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl font-playfair text-white mb-2">Elena Putec</h3>
              <p className="text-gold mb-4">Head Winemaker</p>
              <p className="text-white/80">
                Fifth-generation vintner carrying on the family's winemaking legacy with a modern approach.
              </p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="relative h-80 mb-6 rounded-lg overflow-hidden">
                <Image
                  src="/images/ceo1.png"
                  alt="Marco Fernández - Head Viticulturist"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl font-playfair text-white mb-2">Marco Fernández</h3>
              <p className="text-gold mb-4">Head Viticulturist</p>
              <p className="text-white/80">
                Expert in sustainable vineyard management with over 20 years of experience in Ribera del Duero.
              </p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="relative h-80 mb-6 rounded-lg overflow-hidden">
                <Image
                  src="/images/ceo3.png"
                  alt="Isabella Torres - Master Sommelier"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl font-playfair text-white mb-2">Isabella Torres</h3>
              <p className="text-gold mb-4">Master Sommelier</p>
              <p className="text-white/80">
                International wine expert who leads our tasting experiences and educational programs.
              </p>
            </motion.div>
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
