import Hero from "../components/Hero";
import WineGrid from "../components/products/WineGrid";
import AgeVerification from "../components/AgeVerification";
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
    <>
      <AgeVerification />
      <Hero
        title="Naše vína"
        subtitle="Prémiové vína z rodinného vinárstva Putec"
        backgroundImageUrl="/vineyard-banner.webp"
        secondaryCta={{ label: "Zobraziť všetky", href: "#vsetky-vina" }}
        heightClass="h-[50vh]"
      />
      <section id="vsetky-vina" className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="mt-2">
            <ReduxProvider>
              <WineGrid />
            </ReduxProvider>
          </div>
        </div>
      </section>
    </>
  );
}
