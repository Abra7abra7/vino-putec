import type { Metadata } from "next";
import { getLocalization } from "./utils/getLocalization";
import HomepageBanner from "./components/homepage/HomepageBanner";
import RecentProducts from "./components/homepage/RecentProducts";
import DegustaciePreview from "./components/homepage/DegustaciePreview";
import AccommodationPreview from "./components/homepage/AccommodationPreview";
import BrandStory from "./components/homepage/BrandStory";
import Testimonials from "./components/homepage/Testimonials";
import NewsletterSignup from "./components/homepage/NewsletterSignup";
import Brands from "./components/homepage/Brands";

const localeData = getLocalization();

// Set page metadata
export const metadata: Metadata = {
  title: `${localeData.siteName}`,
  description: localeData.siteTagline,
};

export default function Home() {
  return (
    <main>
      <HomepageBanner />
      <RecentProducts />
      
      {/* Services Section - Ubytovanie a Degustácie vedľa seba */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Naše služby</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Objavte naše prémiové služby - ubytovanie a degustácie vína
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <DegustaciePreview />
            <AccommodationPreview />
          </div>
        </div>
      </section>
      
      <BrandStory />
      <Testimonials />
      <NewsletterSignup />
      <Brands />
    </main>
  );
}
