import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Vína | Rodinné vinárstvo Putec Vinosady | Prémiové vína Pezinok",
  description: "Objavte prémiové vína z rodinného vinárstva Putec vo Vinosadoch pri Pezinku. Kvalitné vína pre Bratislavu, Senec, Trnavu a okolie. Tradičné vinárstvo s moderným prístupom.",
  keywords: "vína, vinárstvo, Putec, Vinosady, Pezinok, Bratislava, Senec, Trnava, rodinné vinárstvo, prémiové vína",
  openGraph: {
    title: "Vína | Rodinné vinárstvo Putec Vinosady",
    description: "Prémiové vína z rodinného vinárstva Putec vo Vinosadoch pri Pezinku",
    type: "website",
    locale: "sk_SK",
  },
};

export default function VinaPage() {
  redirect("/products");
}
