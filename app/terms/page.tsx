"use client";

import { LuxuryWineryHeader } from "../components/ui/luxury-winery-header";
import { LuxuryWineryFooter } from "../components/ui/luxury-winery-footer";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Terms() {
  return (
    <main className="relative">
      <LuxuryWineryHeader />
      
      {/* Content Section */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-playfair text-stone-900 mb-8">
              Terms of Service
            </h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="lead text-lg text-stone-700 mb-8">
                Welcome to Putec Winery. These Terms of Service govern your use of our website and the purchase of our products and services. By accessing our website or purchasing our products, you agree to be bound by these Terms.
              </p>
              
              <div className="mb-8">
                <h2 className="text-2xl font-playfair text-stone-900 mb-4">1. Acceptance of Terms</h2>
                <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. Additionally, when using this website's particular services, you shall be subject to any posted guidelines or rules applicable to such services.</p>
              </div>
              
              <div className="mb-8">
                <h2 className="text-2xl font-playfair text-stone-900 mb-4">2. Age Verification</h2>
                <p>Due to the nature of our products, access to our website and the purchase of our wines is restricted to individuals who are of legal drinking age in their respective jurisdiction. By using our website, you confirm that you are of legal drinking age in the jurisdiction from which you are accessing the site.</p>
              </div>
              
              <div className="mb-8">
                <h2 className="text-2xl font-playfair text-stone-900 mb-4">3. Products and Pricing</h2>
                <p className="mb-4">All prices shown on our website are in euros (€) and include applicable taxes unless stated otherwise. We reserve the right to modify prices at any time without prior notice.</p>
                <p>Product descriptions and images are for illustrative purposes only. We make every effort to accurately display the characteristics of our products, including colors and vintages, but we cannot guarantee that your computer's display of colors accurately reflects the actual product.</p>
              </div>
              
              <div className="mb-8">
                <h2 className="text-2xl font-playfair text-stone-900 mb-4">4. Orders and Payment</h2>
                <p className="mb-4">All orders are subject to acceptance and availability. We reserve the right to refuse any order for any reason.</p>
                <p className="mb-4">Payment can be made by credit card (Visa, MasterCard, American Express), PayPal, or bank transfer. All payments are processed securely. We do not store your payment information.</p>
                <p>Orders will be processed once payment has been confirmed.</p>
              </div>
              
              <div className="mb-8">
                <h2 className="text-2xl font-playfair text-stone-900 mb-4">5. Shipping and Delivery</h2>
                <p className="mb-4">We ship our products to select countries. Shipping costs and delivery times vary depending on the destination and are calculated at checkout.</p>
                <p className="mb-4">We are not responsible for delays in delivery caused by customs clearance procedures or other circumstances beyond our control.</p>
                <p>It is the responsibility of the customer to ensure that someone of legal drinking age is available to receive the delivery.</p>
              </div>
              
              <div className="mb-8">
                <h2 className="text-2xl font-playfair text-stone-900 mb-4">6. Cancellations and Returns</h2>
                <p className="mb-4">Orders may be cancelled within 24 hours of placement by contacting our customer service team.</p>
                <p className="mb-4">Returns are accepted within 14 days of delivery for products in their original, unopened packaging. Please contact our customer service team to initiate a return.</p>
                <p>Refunds will be issued to the original form of payment within 14 days of receiving the returned products.</p>
              </div>
              
              <div className="mb-8">
                <h2 className="text-2xl font-playfair text-stone-900 mb-4">7. Winery Visits and Experiences</h2>
                <p className="mb-4">Reservations for winery visits and experiences are subject to availability. We recommend booking in advance to secure your preferred date and time.</p>
                <p className="mb-4">Cancellations made 72 hours or more before the scheduled visit will receive a full refund. Cancellations made within 72 hours are eligible for rescheduling or a credit for future use.</p>
                <p>We reserve the right to modify or cancel tours due to unforeseen circumstances or insufficient participants. In such cases, a full refund or alternative date will be offered.</p>
              </div>
              
              <div className="mb-8">
                <h2 className="text-2xl font-playfair text-stone-900 mb-4">8. Intellectual Property</h2>
                <p className="mb-4">All content on this website, including but not limited to text, images, graphics, logos, icons, and software, is the property of Putec Winery and is protected by copyright and other intellectual property laws.</p>
                <p>You may not reproduce, distribute, modify, or create derivative works from any content on our website without our express written consent.</p>
              </div>
              
              <div className="mb-8">
                <h2 className="text-2xl font-playfair text-stone-900 mb-4">9. Limitation of Liability</h2>
                <p className="mb-4">Putec Winery shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of your access to or use of our website or products.</p>
                <p>We do not guarantee that our website will be uninterrupted, timely, secure, or error-free.</p>
              </div>
              
              <div className="mb-8">
                <h2 className="text-2xl font-playfair text-stone-900 mb-4">10. Governing Law</h2>
                <p>These Terms shall be governed by and construed in accordance with the laws of Spain, without regard to its conflict of law provisions.</p>
              </div>
              
              <div className="mb-8">
                <h2 className="text-2xl font-playfair text-stone-900 mb-4">11. Changes to Terms</h2>
                <p>We reserve the right to modify these Terms at any time without prior notice. Changes will be effective immediately upon posting on the website. Your continued use of the website following any changes constitutes acceptance of the revised Terms.</p>
              </div>
              
              <div className="mb-8">
                <h2 className="text-2xl font-playfair text-stone-900 mb-4">12. Contact Information</h2>
                <p>If you have any questions about these Terms, please contact us at:</p>
                <address className="not-italic mt-2">
                  <p>Putec Winery</p>
                  <p>Carretera N-122, km 311</p>
                  <p>47350 Quintanilla de Onésimo</p>
                  <p>Valladolid, Spain</p>
                  <p>Email: legal@putec.com</p>
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
