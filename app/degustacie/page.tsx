import type { Metadata } from "next";
import DegustationProducts from "./DegustationProducts";
import Hero from "../components/Hero";
import DegustationGallery from "../components/degustacie/DegustationGallery";

export const metadata: Metadata = {
  title: "Degustácie vína | Putec Vinosady | Ochutnávky vína Pezinok",
  description: "Degustácie vína v rodinnom vinárstve Putec vo Vinosadoch pri Pezinku. Ochutnávky prémiových vín pre Bratislavu, Senec, Trnavu. Rezervujte si degustáciu vína už dnes.",
  keywords: "degustácie vína, ochutnávky vína, Putec, Vinosady, Pezinok, Bratislava, Senec, Trnava, vinárstvo, degustácie",
  openGraph: {
    title: "Degustácie vína | Putec Vinosady",
    description: "Ochutnávky prémiových vín v rodinnom vinárstve Putec vo Vinosadoch",
    type: "website",
    locale: "sk_SK",
  },
  alternates: {
    canonical: "https://vinoputec.sk/degustacie",
  },
};

export default function DegustaciePage() {
  return (
    <>
      <Hero
        title="Degustácie vína"
        subtitle="Nezabudnuteľné zážitky s našimi prémiovými vínami"
        backgroundImageUrl="/degustacie/degustacia-x.jpg"
        primaryCta={{ label: "Rezervovať", href: "/degustacie" }}
        secondaryCta={{ label: "Galéria", href: "/galeria/degustacie" }}
        heightClass="h-[55vh]"
      />
      <div id="baliky">
        <DegustationProducts />
      </div>
      
      {/* Gallery */}
      <DegustationGallery />
    </>
  );
}
