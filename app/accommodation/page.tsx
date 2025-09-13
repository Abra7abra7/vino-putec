import Image from "next/image";
import type { Metadata } from "next";
import { getLocalization } from "../utils/getLocalization";

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
  alternates: {
    canonical: "https://vinoputec.sk/ubytovanie-vinosady",
  },
};

export default function AccommodationPage() {
  const { siteName } = getLocalization();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-wine-dark via-wine-red to-accent-brown text-background">
        <div className="container mx-auto px-6 text-center">
          {/* Logo */}
          <div className="mb-8">
            <Image
              src="/putec-logo.jpg"
              alt="Pútec Logo"
              width={120}
              height={120}
              className="mx-auto rounded-full shadow-2xl border-4 border-primary"
            />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Ubytovanie v srdci vinohradníctva
          </h1>
          <p className="text-xl text-primary max-w-3xl mx-auto">
            Prežite nezabudnuteľné chvíle v našom ubytovaní obklopenom vinohradmi a prírodou
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-primary-light">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-wine-red rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-background">🏡</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Komfortné ubytovanie</h3>
              <p className="text-wine-red">Moderné izby s všetkým potrebným vybavením</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-wine-red rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-background">🍷</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Degustácie vína</h3>
              <p className="text-wine-red">Ochutnajte naše prémiové vína priamo na mieste</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-wine-red rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-background">🌅</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Krásne výhľady</h3>
              <p className="text-wine-red">Pohľad na vinohrady a okolitú prírodu</p>
            </div>
          </div>
        </div>
      </section>

      {/* Accommodation Details */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Naše ubytovanie
              </h2>
              <div className="space-y-4 text-wine-red">
                <div className="flex items-start space-x-3">
                  <span className="text-wine-red font-bold">✓</span>
                  <p>Elegantné izby s vlastnou kúpeľňou</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-wine-red font-bold">✓</span>
                  <p>WiFi pripojenie v celej budove</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-wine-red font-bold">✓</span>
                  <p>Parkovanie pre hostí</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-wine-red font-bold">✓</span>
                  <p>Spoločenské priestory pre relaxáciu</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-wine-red font-bold">✓</span>
                  <p>Raňajky s miestnymi produktmi</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-wine-red font-bold">✓</span>
                  <p>Degustačné miestnosti</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="w-full h-96 bg-primary-light rounded-lg flex items-center justify-center">
                <p className="text-wine-red text-lg">Fotka ubytovania</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reservation Section */}
      <section className="py-16 bg-primary-light">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Rezervácia ubytovania
            </h2>
            <p className="text-wine-red text-lg max-w-2xl mx-auto">
              Vyplňte formulár nižšie pre rezerváciu vášho pobytu. 
              Môžete si vybrať dátumy, počet osôb a špeciálne požiadavky.
            </p>
          </div>

          {/* Reservation Form */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-background rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-semibold text-foreground mb-6 text-center">
                Rezervačný formulár
              </h3>
              
              {/* Reservation PLUS iframe */}
              <div className="reservation-container">
                <script 
                  type="text/javascript" 
                  src="https://booking.previo.app/iframe/"
                ></script>
                <iframe 
                  src="https://booking.previo.app/?hotId=782975" 
                  scrolling="no" 
                  frameBorder="0" 
                  width="100%" 
                  height="800" 
                  name="previo-booking-iframe" 
                  id="previo-booking-iframe" 
                  allowtransparency="true"
                  className="w-full border-0 rounded-lg"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-wine-dark text-primary">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Kontakt pre ubytovanie</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-xl font-semibold mb-4">Rezervácie</h3>
              <p className="mb-2">📞 +421 XXX XXX XXX</p>
              <p className="mb-2">✉️ ubytovanie@vinoputec.sk</p>
              <p>🕒 8:00 - 20:00 (denne)</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Adresa</h3>
              <p className="mb-2">Vino Pútec</p>
              <p className="mb-2">Vinohradnícka 123</p>
              <p>123 45 Slovensko</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
