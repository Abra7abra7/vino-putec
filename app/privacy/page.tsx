"use client";

import { LuxuryWineryHeader } from "../components/ui/luxury-winery-header";
import { LuxuryWineryFooter } from "../components/ui/luxury-winery-footer";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Privacy() {
  return (
    <main className="relative">
      <LuxuryWineryHeader />
      
      {/* Content Section */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-playfair text-stone-900 mb-8">
              Privacy Policy
            </h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="lead text-lg text-stone-700 mb-8">
                At Putec Winery, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or interact with our services.
              </p>
              
              <div className="mb-8">
                <h2 className="text-2xl font-playfair text-stone-900 mb-4">Information We Collect</h2>
                <p className="mb-4">We may collect personal information that you voluntarily provide to us when you:</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Register on our website</li>
                  <li>Place an order for our products</li>
                  <li>Subscribe to our newsletter</li>
                  <li>Book a winery experience</li>
                  <li>Complete forms or surveys</li>
                  <li>Contact us via email, phone, or any contact form</li>
                </ul>
                <p>The types of information we may collect include:</p>
                <ul className="list-disc pl-6">
                  <li>Name, email address, postal address, and phone number</li>
                  <li>Billing information and payment details</li>
                  <li>Date of birth to verify legal drinking age</li>
                  <li>Preferences and interests related to our wines and services</li>
                  <li>Any other information you choose to provide</li>
                </ul>
              </div>
              
              <div className="mb-8">
                <h2 className="text-2xl font-playfair text-stone-900 mb-4">How We Use Your Information</h2>
                <p className="mb-4">We may use the information we collect for various purposes, including to:</p>
                <ul className="list-disc pl-6">
                  <li>Process and fulfill your orders</li>
                  <li>Send you promotional offers, updates, and newsletters (if you've opted in)</li>
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Improve our website, products, and services</li>
                  <li>Personalize your experience and deliver content relevant to your interests</li>
                  <li>Administer contests, promotions, surveys, or other website features</li>
                  <li>Protect against fraud and unauthorized transactions</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>
              
              <div className="mb-8">
                <h2 className="text-2xl font-playfair text-stone-900 mb-4">Cookies and Tracking Technologies</h2>
                <p className="mb-4">We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with small amount of data which may include an anonymous unique identifier.</p>
                <p>These technologies help us analyze traffic patterns, determine the popularity of certain content, and better understand your online activity. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</p>
              </div>
              
              <div className="mb-8">
                <h2 className="text-2xl font-playfair text-stone-900 mb-4">Third-Party Disclosure</h2>
                <p className="mb-4">We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties except in the following cases:</p>
                <ul className="list-disc pl-6">
                  <li>To trusted third parties who assist us in operating our website, conducting our business, or servicing you</li>
                  <li>To comply with legal requirements, enforce our policies, or protect our or others' rights, property, or safety</li>
                  <li>To a buyer or other successor in the event of a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of our assets</li>
                </ul>
              </div>
              
              <div className="mb-8">
                <h2 className="text-2xl font-playfair text-stone-900 mb-4">Data Security</h2>
                <p>We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>
              </div>
              
              <div className="mb-8">
                <h2 className="text-2xl font-playfair text-stone-900 mb-4">Your Rights</h2>
                <p className="mb-4">Depending on your location, you may have certain rights regarding your personal information, including:</p>
                <ul className="list-disc pl-6">
                  <li>The right to access and receive a copy of your personal information</li>
                  <li>The right to rectify or update your personal information</li>
                  <li>The right to delete your personal information</li>
                  <li>The right to restrict processing of your personal information</li>
                  <li>The right to object to processing of your personal information</li>
                  <li>The right to data portability</li>
                </ul>
              </div>
              
              <div className="mb-8">
                <h2 className="text-2xl font-playfair text-stone-900 mb-4">Changes to This Privacy Policy</h2>
                <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.</p>
              </div>
              
              <div className="mb-8">
                <h2 className="text-2xl font-playfair text-stone-900 mb-4">Contact Us</h2>
                <p>If you have any questions about this Privacy Policy, please contact us at:</p>
                <address className="not-italic mt-2">
                  <p>Putec Winery</p>
                  <p>Carretera N-122, km 311</p>
                  <p>47350 Quintanilla de Onésimo</p>
                  <p>Valladolid, Spain</p>
                  <p>Email: privacy@putec.com</p>
                  <p>Phone: +34 983 680 314</p>
                </address>
              </div>
              
              <p className="text-sm text-stone-500 italic">Last Updated: March 8, 2025</p>
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
