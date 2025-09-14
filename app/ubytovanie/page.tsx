import Image from "next/image";
import Hero from "../components/Hero";
import AccommodationGallery from "../components/ubytovanie/AccommodationGallery";
import type { Metadata } from "next";

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
    canonical: "https://vinoputec.sk/ubytovanie",
  },
};

export default function AccommodationPage() {

  return (
    <div className="min-h-screen bg-background">
      <Hero
        title="Ubytovanie v srdci vinohradníctva"
        subtitle="Komfortné izby a zážitky vo vinohradoch"
        backgroundImageUrl="/galeria/ubytovanie/vyhlad-na-vinohrad-x.jpg"
        primaryCta={{ label: "Rezervovať", href: "#rezervacia" }}
        secondaryCta={{ label: "Galéria", href: "/galeria/ubytovanie" }}
        heightClass="h-[55vh]"
      />

      {/* Accommodation Details */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-4 text-foreground">
                <div className="flex items-start space-x-3">
                  <span className="text-foreground font-bold">✓</span>
                  <p>Elegantné izby s vlastnou kúpeľňou</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-foreground font-bold">✓</span>
                  <p>WiFi pripojenie v celej budove</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-foreground font-bold">✓</span>
                  <p>Parkovanie pre hostí</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-foreground font-bold">✓</span>
                  <p>Spoločenské priestory pre relaxáciu</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-foreground font-bold">✓</span>
                  <p>Raňajky s miestnymi produktmi</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-foreground font-bold">✓</span>
                  <p>Degustačné miestnosti</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <Image
                src="/galeria/ubytovanie/izba-interier-x.jpg"
                alt="Interiér ubytovania"
                width={600}
                height={400}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Reservation Section */}
      <section id="rezervacia" className="py-16 bg-background">
        <div className="container mx-auto px-6">
          {/* Reservation Form */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-background rounded-lg shadow-lg p-8">
              
              {/* Reservation PLUS iframe */}
              <div className="reservation-container">
                <script 
                  type="text/javascript" 
                  src="https://booking.previo.app/iframe/"
                  async
                ></script>
                <iframe 
                  src="https://booking.previo.app/?hotId=782975" 
                  scrolling="no" 
                  frameBorder="0" 
                  width="100%" 
                  height="800" 
                  name="previo-booking-iframe" 
                  id="previo-booking-iframe" 
                  allowTransparency={true}
                  className="w-full border-0 rounded-lg"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      

    </div>
  );
}
