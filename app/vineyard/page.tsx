"use client";

import Image from "next/image";
import { LuxuryWineryHeader } from "../components/ui/luxury-winery-header";
import { LuxuryWineryFooter } from "../components/ui/luxury-winery-footer";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { motion } from "framer-motion";

export default function Vineyard() {
  return (
    <main className="relative">
      <LuxuryWineryHeader />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/vineyard-aerial.jpg"
            alt="Putec Vineyard Aerial View"
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
            The Vineyard
          </motion.h1>
          <motion.p 
            className="text-xl text-white/90 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Where exceptional terroir meets meticulous cultivation
          </motion.p>
        </div>
      </section>

      {/* Terroir Section */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-2 md:order-1"
            >
              <h2 className="text-3xl md:text-4xl font-playfair text-stone-900 mb-6">
                Our Exceptional Terroir
              </h2>
              <p className="text-lg text-stone-700 mb-6">
                Nestled in the heart of Ribera del Duero, our 120-hectare estate benefits from the region's continental climate, characterized by hot summers and cold winters, creating the perfect conditions for growing exceptional grapes.
              </p>
              <p className="text-lg text-stone-700 mb-6">
                The vineyard's unique combination of clay-limestone soils imparts distinctive mineral qualities to our wines, while the altitude (800 meters above sea level) ensures optimal temperature variations that enhance the grapes' aromatic complexity.
              </p>
              <p className="text-lg text-stone-700">
                Each parcel of our vineyard has been meticulously mapped and planted according to its specific soil composition, exposure, and microclimate, allowing us to cultivate grapes that truly express the essence of our land.
              </p>
            </motion.div>
            <motion.div
              className="relative h-[500px] rounded-lg overflow-hidden order-1 md:order-2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Image
                src="/images/terroir-soil.jpg"
                alt="Putec Vineyard Soil"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Varieties Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-playfair text-stone-900 mb-6">
              Our Grape Varieties
            </h2>
            <p className="text-lg text-stone-700">
              We cultivate select grape varieties that thrive in our terroir, focusing primarily on Tempranillo, the signature grape of Ribera del Duero.
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
                  src="/images/tempranillo.jpg"
                  alt="Tempranillo Grapes"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl font-playfair text-wine mb-4">Tempranillo</h3>
              <p className="text-stone-700">
                The foundation of our wines, known for producing full-bodied reds with notes of dark berries, leather, and tobacco, with excellent aging potential.
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
                  src="/images/cabernet.jpg"
                  alt="Cabernet Sauvignon Grapes"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl font-playfair text-wine mb-4">Cabernet Sauvignon</h3>
              <p className="text-stone-700">
                Planted in select parcels that provide the ideal conditions for this noble variety, contributing structure, tannins, and aging potential to our premium blends.
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
                  src="/images/merlot.jpg"
                  alt="Merlot Grapes"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl font-playfair text-wine mb-4">Merlot</h3>
              <p className="text-stone-700">
                Cultivated in limited quantities to add complexity, supple texture, and rich fruit character to our carefully crafted blends.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sustainable Practices */}
      <section className="py-20 bg-stone-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-playfair text-white mb-6">
              Sustainable Viticulture
            </h2>
            <p className="text-lg text-white/80">
              Our commitment to preserving our land and crafting wines of exceptional quality
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              className="relative h-[500px] rounded-lg overflow-hidden"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Image
                src="/images/sustainable-vineyard.jpg"
                alt="Sustainable Vineyard Practices"
                fill
                className="object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-playfair text-gold mb-4">Organic Farming</h3>
                  <p className="text-white/80">
                    We've embraced organic farming practices, avoiding synthetic chemicals and focusing on natural soil health to produce grapes of exceptional quality and purity.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-playfair text-gold mb-4">Water Conservation</h3>
                  <p className="text-white/80">
                    Our advanced drip irrigation systems and moisture monitoring technology ensure optimal water usage, preserving this precious resource.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-playfair text-gold mb-4">Biodiversity</h3>
                  <p className="text-white/80">
                    We maintain cover crops, hedgerows, and natural habitats throughout our estate to promote biodiversity and create a balanced ecosystem that naturally regulates pests.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-playfair text-gold mb-4">Solar Power</h3>
                  <p className="text-white/80">
                    Our winery facilities are powered by renewable solar energy, reducing our carbon footprint and advancing our commitment to sustainable winemaking.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Visit CTA */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-playfair text-stone-900 mb-6">
            Experience Our Vineyard
          </h2>
          <p className="text-lg text-stone-700 max-w-3xl mx-auto mb-8">
            Join us for a guided tour through our vineyard and winery to experience firsthand the passion and craftsmanship behind our exceptional wines.
          </p>
          <button className="luxury-button-dark mx-2">Book a Tour</button>
          <button className="luxury-button-dark mx-2">Learn About Experiences</button>
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
