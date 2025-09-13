import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "O nás | Rodinné vinárstvo Putec Vinosady | História vinárstva",
  description: "Rodinné vinárstvo Putec vo Vinosadoch pri Pezinku. Dlhoročná tradícia výroby prémiových vín. História, hodnoty a tím rodinného vinárstva pre Bratislavu, Senec, Trnavu.",
  keywords: "o nás, Putec, Vinosady, Pezinok, rodinné vinárstvo, história vinárstva, tradícia, Bratislava, Senec, Trnava",
  openGraph: {
    title: "O nás | Rodinné vinárstvo Putec Vinosady",
    description: "Dlhoročná tradícia rodinného vinárstva Putec vo Vinosadoch",
    type: "website",
    locale: "sk_SK",
  },
};

export default function ONasPage() {
  redirect("/about");
}
