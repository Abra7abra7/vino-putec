import Image from "next/image";
import Hero from "../components/Hero";
import ProductGrid from "../components/products/ProductGrid";
import { getLocalization } from "../utils/getLocalization";
import type { Metadata } from "next";
import { ReduxProvider } from "../providers";

// Fetch localization data
const localeData = getLocalization();

// Set page metadata
export const metadata: Metadata = {
  title: `${localeData.siteName} - ${localeData.labels.products}`,
  description: localeData.siteTagline,
};

export default function ProductsPage() {
  return (
    <>
      <Hero
        title={localeData.labels.products}
        subtitle={localeData.siteTagline}
        backgroundImageUrl="/vineyard-banner.webp"
        secondaryCta={{ label: "Zobraziť všetko", href: "#produkty" }}
        heightClass="h-[50vh]"
      />
      <section id="produkty" className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="mt-2">
            <ReduxProvider>
              <ProductGrid />
            </ReduxProvider>
          </div>
        </div>
      </section>
    </>
  );
}
