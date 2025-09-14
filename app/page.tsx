import type { Metadata } from "next";
import HomepageBanner from "./components/homepage/HomepageBanner";
import Achievements from "./components/homepage/Achievements";
import DegustaciePreview from "./components/homepage/DegustaciePreview";
import AccommodationPreview from "./components/homepage/AccommodationPreview";
import BrandStory from "./components/homepage/BrandStory";
import Testimonials from "./components/homepage/Testimonials";
import NewsletterSignup from "./components/homepage/NewsletterSignup";
import Brands from "./components/homepage/Brands";


// Set page metadata
export const metadata: Metadata = {
  title: "Vino Putec - Rodinné vinárstvo Pezinok | Ubytovanie Vinosady | Degustácie vína",
  description: "Prémiové vína z Vinosád, ubytovanie a degustácie vína v Pezinku. Rodinné vinárstvo s tradíciou pre Bratislavu, Senec, Trnavu a okolie. Rezervujte si ubytovanie a degustácie vína už dnes.",
  keywords: "víno, vinárstvo, Putec, Vinosady, Pezinok, Bratislava, Senec, Trnava, rodinné vinárstvo, prémiové vína, ubytovanie, degustácie vína",
  openGraph: {
    title: "Vino Putec - Rodinné vinárstvo Pezinok",
    description: "Prémiové vína z Vinosád, ubytovanie a degustácie vína v Pezinku",
    type: "website",
    locale: "sk_SK",
    images: [
      {
        url: "/o-nas/rodina2.jpg",
        width: 1200,
        height: 630,
        alt: "Rodinné vinárstvo Putec Vinosady",
      },
    ],
  },
  alternates: {
    canonical: "https://vinoputec.sk",
  },
};

export default function Home() {
  return (
    <main>
      <HomepageBanner />
      
      <DegustaciePreview />
      <AccommodationPreview />
      
      <BrandStory />
      <Testimonials />
      <NewsletterSignup />
      <Achievements />
      <Brands />
    </main>
  );
}
