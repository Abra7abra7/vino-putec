import Image from "next/image";
import WineGrid from "../components/products/WineGrid";
import { getLocalization } from "../utils/getLocalization";
import type { Metadata } from "next";
import { ReduxProvider } from "../providers";

// Fetch localization data
const localeData = getLocalization();

// Set page metadata
export const metadata: Metadata = {
  title: `${localeData.siteName} - Vína`,
  description: "Prémiové vína z rodinného vinárstva Putec vo Vinosadoch pri Pezinku. Biele, červené a ružové vína najvyššej kvality.",
};

export default function VinaPage() {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        {/* Logo Section */}
        <div className="text-center mb-12">
          <Image
            src="/putec-logo.jpg"
            alt="Pútec Logo"
            width={100}
            height={100}
            className="mx-auto rounded-full shadow-2xl border-4 border-accent mb-6"
          />
          <h2 className="text-4xl font-bold text-foreground">
            Naše vína
          </h2>
          <p className="text-lg text-foreground-muted mt-4">
            Prémiové vína z rodinného vinárstva Putec
          </p>
        </div>
        <div className="mt-2">
          <ReduxProvider>
            <WineGrid />
          </ReduxProvider>
        </div>
      </div>
    </section>
  );
}
