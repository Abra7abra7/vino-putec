"use client";

import Image from "next/image";
import { LuxuryWineryHeader } from "../components/ui/luxury-winery-header";
import { LuxuryWineryFooter } from "../components/ui/luxury-winery-footer";
import { Facebook, Instagram, Twitter, Calendar, Clock, Users, Wine } from "lucide-react";
import { motion } from "framer-motion";

const experiences = [
  {
    id: "premium-tasting",
    title: "Premium Tasting",
    description: "Discover our finest wines in an intimate setting guided by our expert sommeliers.",
    duration: "90 minutes",
    price: "€75 per person",
    capacity: "2-8 guests",
    includes: ["Guided tasting of 5 premium wines", "Artisanal cheese pairing", "Souvenir Putec crystal wine glass"],
    image: "/images/premium-tasting.jpg"
  },
  {
    id: "vineyard-tour",
    title: "Vineyard & Cellar Tour",
    description: "Experience the journey from vine to bottle with a comprehensive tour of our estate.",
    duration: "2 hours",
    price: "€95 per person",
    capacity: "2-12 guests",
    includes: ["Guided vineyard tour", "Barrel cellar visit", "Tasting of 4 reserve wines", "Gourmet tapas"],
    image: "/images/vineyard-tour.jpg"
  },
  {
    id: "winemaker-experience",
    title: "Winemaker Experience",
    description: "Work alongside our head winemaker for a day, experiencing the art of winemaking firsthand.",
    duration: "6 hours",
    price: "€350 per person",
    capacity: "1-4 guests",
    includes: ["Hands-on winemaking activities", "Private cellar tour", "Barrel tasting session", "Gourmet lunch with wine pairings", "Custom blended bottle to take home"],
    image: "/images/winemaker-experience.jpg"
  },
  {
    id: "private-dinner",
    title: "Private Cellar Dinner",
    description: "Indulge in an exclusive dining experience in our historic underground cellar.",
    duration: "3 hours",
    price: "€250 per person",
    capacity: "2-10 guests",
    includes: ["Five-course gourmet meal", "Wine pairing with each course", "Private sommelier service", "Cellar tour", "Commemorative gift"],
    image: "/images/cellar-dinner.jpg"
  }
];

export default function Experiences() {
  return (
    <main className="relative">
      <LuxuryWineryHeader />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/experience.png"
            alt="Putec Wine Experiences"
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
            Wine Experiences
          </motion.h1>
          <motion.p 
            className="text-xl text-white/90 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Immerse yourself in the art of winemaking and tasting
          </motion.p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-playfair text-stone-900 mb-6">
            Discover Putec
          </h2>
          <p className="text-lg text-stone-700 max-w-3xl mx-auto">
            We invite you to experience the passion and craftsmanship behind our exceptional wines. 
            From vineyard tours to exclusive tastings, our experiences offer a glimpse into our rich heritage 
            and dedication to creating wines of exceptional character and quality.
          </p>
        </div>
      </section>

      {/* Experiences Listing */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {experiences.map((experience, index) => (
              <motion.div 
                key={experience.id}
                className="grid md:grid-cols-2 gap-12 items-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className={`relative h-[400px] rounded-lg overflow-hidden ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                  <Image
                    src={experience.image}
                    alt={experience.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                  <h3 className="text-3xl font-playfair text-stone-900 mb-4">
                    {experience.title}
                  </h3>
                  <p className="text-lg text-stone-700 mb-6">
                    {experience.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-wine mr-2" />
                      <span className="text-stone-700">{experience.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-wine mr-2" />
                      <span className="text-stone-700">{experience.capacity}</span>
                    </div>
                    <div className="flex items-center col-span-2">
                      <Wine className="h-5 w-5 text-wine mr-2" />
                      <span className="text-stone-700">{experience.price}</span>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-xl font-playfair text-stone-900 mb-3">Includes:</h4>
                    <ul className="space-y-2">
                      {experience.includes.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="inline-block h-2 w-2 rounded-full bg-wine mt-2 mr-2"></span>
                          <span className="text-stone-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <button className="luxury-button-dark flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Book This Experience
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Experiences */}
      <section className="py-20 bg-stone-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="relative h-[500px] rounded-lg overflow-hidden"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Image
                src="/images/experience2.png"
                alt="Custom Wine Experience"
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
              <h2 className="text-3xl md:text-4xl font-playfair text-white mb-6">
                Custom Experiences
              </h2>
              <p className="text-lg text-white/80 mb-6">
                Looking for something unique? Our team can craft a custom wine experience tailored to your preferences and interests.
              </p>
              <p className="text-lg text-white/80 mb-8">
                Whether you're celebrating a special occasion, hosting corporate clients, or seeking a personalized wine journey, we'll create an unforgettable experience that exceeds your expectations.
              </p>
              <button className="luxury-button-light">
                Inquire About Custom Experiences
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Booking Information */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-playfair text-stone-900 mb-6 text-center">
              Booking Information
            </h2>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-playfair text-stone-900 mb-2">Reservations</h3>
                  <p className="text-stone-700">
                    All experiences require advance booking. We recommend reserving at least 2 weeks in advance, especially during peak season (May-October).
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-playfair text-stone-900 mb-2">Cancellation Policy</h3>
                  <p className="text-stone-700">
                    Full refunds for cancellations made 72 hours or more before your scheduled experience. Cancellations within 72 hours are eligible for rescheduling or a credit for future use.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-playfair text-stone-900 mb-2">Private Groups</h3>
                  <p className="text-stone-700">
                    For groups larger than 12 people, please contact us directly to arrange a private experience tailored to your group's needs.
                  </p>
                </div>
                
                <div className="pt-4 border-t border-stone-200">
                  <p className="text-stone-700 flex items-center">
                    <span className="inline-block h-2 w-2 rounded-full bg-wine mt-0 mr-2"></span>
                    For any special requests or questions, please contact our hospitality team at:
                  </p>
                  <p className="text-wine font-medium mt-2">
                    visitas@putec.com | +34 983 680 314
                  </p>
                </div>
              </div>
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
