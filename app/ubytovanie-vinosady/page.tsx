import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Ubytovanie Vinosady | Putec | Ubytovanie Pezinok | Rezervácia",
  description: "Ubytovanie vo Vinosadoch pri Pezinku v rodinnom vinárstve Putec. Komfortné ubytovanie s výhľadom na vinohrady. Rezervujte si ubytovanie pre Bratislavu, Senec, Trnavu.",
  keywords: "ubytovanie Vinosady, ubytovanie Pezinok, Putec, ubytovanie, Bratislava, Senec, Trnava, vinárstvo, rezervácia ubytovania",
  openGraph: {
    title: "Ubytovanie Vinosady | Putec",
    description: "Komfortné ubytovanie vo Vinosadoch pri Pezinku s výhľadom na vinohrady",
    type: "website",
    locale: "sk_SK",
  },
};

export default function UbytovanieVinosadyPage() {
  redirect("/accommodation");
}
