import type { Metadata } from "next";
import DegustationProducts from "./DegustationProducts";

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
    canonical: "https://vinoputec.sk/degustacie-vina",
  },
};

export default function DegustaciePage() {
  return <DegustationProducts />;
}
