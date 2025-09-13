import Image from "next/image";
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
    <section className="py-12 bg-primary-light">
      <div className="container mx-auto px-4">
        {/* Logo Section */}
        <div className="text-center mb-12">
          <Image
            src="/putec-logo.jpg"
            alt="Pútec Logo"
            width={100}
            height={100}
            className="mx-auto rounded-full shadow-2xl border-4 border-primary mb-6"
          />
          <h2 className="text-4xl font-bold text-foreground">
            {localeData.labels.products}
          </h2>
        </div>
        <div className="mt-2">
          <ReduxProvider>
            <ProductGrid />
          </ReduxProvider>
        </div>
      </div>
    </section>
  );
}
