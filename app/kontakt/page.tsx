import ContactUsForm from "../components/ContactUsForm";
import GoogleMaps from "../components/GoogleMaps";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt | Putec Vinosady | Kontaktné údaje vinárstva",
  description: "Kontakt na rodinné vinárstvo Putec vo Vinosadoch pri Pezinku. Adresa, telefón, email. Kontaktujte nás pre vína, ubytovanie a degustácie. Bratislava, Senec, Trnava.",
  keywords: "kontakt, Putec, Vinosady, Pezinok, adresa, telefón, email, vinárstvo, Bratislava, Senec, Trnava",
  openGraph: {
    title: "Kontakt | Putec Vinosady",
    description: "Kontaktné údaje rodinného vinárstva Putec vo Vinosadoch",
    type: "website",
    locale: "sk_SK",
  },
  alternates: {
    canonical: "https://vinoputec.sk/kontakt",
  },
};

export default function ContactPage() {
    return (
      <main>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-screen">
          {/* Contact Form */}
          <div className="lg:order-1">
            <ContactUsForm />
          </div>
          
          {/* Google Maps */}
          <div className="lg:order-2">
            <GoogleMaps />
          </div>
        </div>
      </main>
    );
  }