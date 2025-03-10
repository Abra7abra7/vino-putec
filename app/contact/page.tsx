"use client";

import Image from "next/image";
import { LuxuryWineryHeader } from "../components/ui/luxury-winery-header";
import { LuxuryWineryFooter } from "../components/ui/luxury-winery-footer";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <main className="relative">
      <LuxuryWineryHeader />
      
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/contact_us.png"
            alt="Contact Putec Winery"
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
            Contact Us
          </motion.h1>
          <motion.p 
            className="text-xl text-white/90 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We'd love to hear from you
          </motion.p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-playfair text-stone-900 mb-6">
                Send Us a Message
              </h2>
              <p className="text-lg text-stone-700 mb-8">
                Whether you have questions about our wines, wish to book an experience, or are planning a special event, we're here to assist you.
              </p>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wine focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wine focus:border-transparent"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-stone-700 mb-1">
                    Subject
                  </label>
                  <select
                    id="subject"
                    className="w-full px-4 py-3 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wine focus:border-transparent"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="wines">Wine Collection</option>
                    <option value="visit">Visit & Experiences</option>
                    <option value="events">Private Events</option>
                    <option value="wholesale">Wholesale & Distribution</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    className="w-full px-4 py-3 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wine focus:border-transparent"
                    placeholder="Your message"
                  ></textarea>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="privacy"
                    type="checkbox"
                    className="h-4 w-4 text-wine focus:ring-wine border-stone-300 rounded"
                  />
                  <label htmlFor="privacy" className="ml-2 block text-sm text-stone-700">
                    I agree to the <a href="/privacy" className="text-wine hover:underline">privacy policy</a>
                  </label>
                </div>
                
                <div>
                  <button type="submit" className="luxury-button-dark w-full sm:w-auto">
                    Send Message
                  </button>
                </div>
              </form>
            </motion.div>
            
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-playfair text-stone-900 mb-6">
                Contact Information
              </h2>
              <p className="text-lg text-stone-700 mb-8">
                We look forward to welcoming you to Putec Winery. Here's how you can reach us.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-wine mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-playfair text-stone-900 mb-2">Address</h3>
                    <p className="text-stone-700">
                      Carretera N-122, km 311<br />
                      47350 Quintanilla de Onésimo<br />
                      Valladolid, Spain
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-wine mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-playfair text-stone-900 mb-2">Phone</h3>
                    <p className="text-stone-700">
                      Main Office: +34 983 680 314<br />
                      Wine Shop: +34 983 680 315<br />
                      Events: +34 983 680 316
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-wine mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-playfair text-stone-900 mb-2">Email</h3>
                    <p className="text-stone-700">
                      General Inquiries: info@putec.com<br />
                      Visits & Tastings: visitas@putec.com<br />
                      Events: eventos@putec.com
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-6 w-6 text-wine mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-playfair text-stone-900 mb-2">Opening Hours</h3>
                    <p className="text-stone-700">
                      Winery Tours & Tastings:<br />
                      Monday to Saturday: 10:00 - 18:00<br />
                      Sunday: 10:00 - 15:00<br /><br />
                      
                      Wine Shop:<br />
                      Monday to Saturday: 9:00 - 19:00<br />
                      Sunday: 10:00 - 16:00
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <h3 className="text-xl font-playfair text-stone-900 mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="https://facebook.com/putecwinery" className="p-2 bg-stone-800 text-white rounded-full hover:bg-wine transition-colors">
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a href="https://instagram.com/putecwinery" className="p-2 bg-stone-800 text-white rounded-full hover:bg-wine transition-colors">
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a href="https://twitter.com/putecwinery" className="p-2 bg-stone-800 text-white rounded-full hover:bg-wine transition-colors">
                    <Twitter className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="relative h-[500px]">
        <div className="absolute inset-0">
          <Image
            src="/images/event6.png"
            alt="Putec Winery Location Map"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute top-8 left-8 bg-white p-6 rounded-lg shadow-lg max-w-md">
          <h3 className="text-2xl font-playfair text-stone-900 mb-4">
            Getting Here
          </h3>
          <p className="text-stone-700 mb-4">
            Putec Winery is located in the heart of Ribera del Duero, approximately 40 km from Valladolid city.
          </p>
          <div className="space-y-2">
            <div className="flex items-start">
              <MapPin className="h-5 w-5 text-wine mt-1 mr-2 flex-shrink-0" />
              <p className="text-stone-700">
                From Valladolid: Take the N-122 towards Aranda de Duero. The winery is at km 311, just before Quintanilla de Onésimo.
              </p>
            </div>
            <div className="flex items-start">
              <MapPin className="h-5 w-5 text-wine mt-1 mr-2 flex-shrink-0" />
              <p className="text-stone-700">
                From Madrid: Take the A-1 towards Burgos, then exit at Aranda de Duero and follow the N-122 towards Valladolid for 35 km.
              </p>
            </div>
          </div>
          <button className="luxury-button-dark mt-4">
            Get Directions
          </button>
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
