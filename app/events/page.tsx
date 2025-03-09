"use client";

import Image from "next/image";
import { LuxuryWineryHeader } from "../components/ui/luxury-winery-header";
import { LuxuryWineryFooter } from "../components/ui/luxury-winery-footer";
import { Facebook, Instagram, Twitter, Calendar, Users, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const eventSpaces = [
  {
    id: "barrel-hall",
    title: "The Barrel Hall",
    description: "Our grand barrel hall provides a dramatic backdrop for elegant receptions and gala dinners, surrounded by rows of aging oak barrels.",
    capacity: "Up to 120 guests",
    bestFor: ["Gala dinners", "Corporate events", "Wine launch parties"],
    image: "/images/white1.png"
  },
  {
    id: "private-cellar",
    title: "The Private Cellar",
    description: "An intimate underground space with stone walls and vaulted ceilings dating back to the 19th century, perfect for exclusive gatherings.",
    capacity: "Up to 30 guests",
    bestFor: ["Private dinners", "Wine tastings", "Intimate celebrations"],
    image: "/images/wine.png"
  },
  {
    id: "vineyard-terrace",
    title: "The Vineyard Terrace",
    description: "An elegant outdoor space overlooking our vineyards, offering breathtaking views of the Ribera del Duero landscape.",
    capacity: "Up to 150 guests",
    bestFor: ["Wedding receptions", "Sunset cocktail events", "Summer parties"],
    image: "/images/wine4.png"
  },
  {
    id: "tasting-room",
    title: "The Tasting Room",
    description: "A sophisticated space with floor-to-ceiling windows offering panoramic views of the vineyards, ideal for daytime events.",
    capacity: "Up to 50 guests",
    bestFor: ["Business meetings", "Educational seminars", "Wine masterclasses"],
    image: "/images/botle2.png"
  }
];

export default function Events() {
  return (
    <main className="relative">
      <LuxuryWineryHeader />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/wine4.png"
            alt="Putec Winery Events"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.h1 
            className="text-5xl md:text-6xl font-playfair text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Private Events
          </motion.h1>
          <motion.p 
            className="text-xl text-white/90 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Create unforgettable moments in our stunning winery venues
          </motion.p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-playfair text-stone-900 mb-6">
            Exceptional Venues for Special Occasions
          </h2>
          <p className="text-lg text-stone-700 max-w-3xl mx-auto">
            From intimate gatherings to grand celebrations, Putec Winery offers a range of stunning 
            venues that combine historical charm with modern elegance. Our dedicated events team 
            will ensure every detail is perfect for your special occasion.
          </p>
        </div>
      </section>

      {/* Event Spaces */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {eventSpaces.map((space, index) => (
              <motion.div 
                key={space.id}
                className="grid md:grid-cols-2 gap-12 items-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className={`relative h-[400px] rounded-lg overflow-hidden ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                  <Image
                    src={space.image}
                    alt={space.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                  <h3 className="text-3xl font-playfair text-stone-900 mb-4">
                    {space.title}
                  </h3>
                  <p className="text-lg text-stone-700 mb-6">
                    {space.description}
                  </p>
                  
                  <div className="mb-6">
                    <div className="flex items-center mb-4">
                      <Users className="h-5 w-5 text-wine mr-2" />
                      <span className="text-stone-700 font-medium">{space.capacity}</span>
                    </div>
                    
                    <h4 className="text-xl font-playfair text-stone-900 mb-3">Best For:</h4>
                    <ul className="space-y-2">
                      {space.bestFor.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="inline-block h-2 w-2 rounded-full bg-wine mt-2 mr-2"></span>
                          <span className="text-stone-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <button className="luxury-button-dark flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Inquire About This Venue
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-stone-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-playfair text-white mb-6">
              Exceptional Event Services
            </h2>
            <p className="text-lg text-white/80">
              Our dedicated team ensures every detail of your event is perfect
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-stone-800 p-8 rounded-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-playfair text-gold mb-4">Catering</h3>
              <p className="text-white/80">
                Our executive chef creates tailored menus featuring seasonal local ingredients paired perfectly with our wines. From cocktail receptions to formal dinners, we offer exceptional culinary experiences.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-stone-800 p-8 rounded-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-playfair text-gold mb-4">Event Design</h3>
              <p className="text-white/80">
                Our event designers work with you to create the perfect ambiance for your occasion, from elegant floral arrangements to sophisticated lighting design and bespoke décor elements.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-stone-800 p-8 rounded-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-playfair text-gold mb-4">Wine Experiences</h3>
              <p className="text-white/80">
                Enhance your event with guided wine tastings, cellar tours, or custom wine education sessions led by our experienced sommeliers, adding a unique dimension to your gathering.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Special Events */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-playfair text-stone-900 mb-6">
              Special Occasions
            </h2>
            <p className="text-lg text-stone-700">
              From corporate retreats to dream weddings, Putec Winery provides the perfect setting
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div 
              className="relative overflow-hidden rounded-lg"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative h-[300px]">
                <Image
                  src="/images/wedding.jpg"
                  alt="Wedding at Putec Winery"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8 bg-white">
                <h3 className="text-2xl font-playfair text-stone-900 mb-3">Weddings</h3>
                <p className="text-stone-700 mb-6">
                  Say "I do" surrounded by the beauty of our vineyards. Our wedding packages include ceremony and reception venues, bespoke catering, wine service, and dedicated coordination.
                </p>
                <button className="luxury-button-dark text-sm">Learn More About Weddings</button>
              </div>
            </motion.div>

            <motion.div 
              className="relative overflow-hidden rounded-lg"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="relative h-[300px]">
                <Image
                  src="/images/corporate.jpg"
                  alt="Corporate Event at Putec Winery"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8 bg-white">
                <h3 className="text-2xl font-playfair text-stone-900 mb-3">Corporate Events</h3>
                <p className="text-stone-700 mb-6">
                  From executive retreats to client appreciation events, our venues provide sophisticated spaces for your business needs with state-of-the-art technology and premium service.
                </p>
                <button className="luxury-button-dark text-sm">Learn About Corporate Packages</button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-stone-900 text-white p-10 rounded-lg text-center">
            <h2 className="text-3xl font-playfair text-white mb-6">
              Plan Your Event
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Our events team is ready to help you create an unforgettable experience at Putec Winery.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="luxury-button-light flex items-center justify-center">
                <Calendar className="h-4 w-4 mr-2" />
                Request Information
              </button>
              <button className="luxury-button-light flex items-center justify-center">
                <MapPin className="h-4 w-4 mr-2" />
                Schedule a Site Visit
              </button>
            </div>
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
