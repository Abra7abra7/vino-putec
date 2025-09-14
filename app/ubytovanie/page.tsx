import Image from "next/image";
import Hero from "../components/Hero";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ubytovanie Vinosady | Penzión Malé Karpaty | Firemné akcie Teambuildingy | Víno Pútec",
  description: "Ubytovanie vo vinárstve Vinosady - 15 osôb, 6 izieb s vlastnou kúpeľňou. Firemné akcie, teambuildingy, ochutnávky vína v srdci Malých Karpát. Rezervácia ubytovania Pezinok, Bratislava.",
  keywords: "ubytovanie Vinosady, ubytovanie Malé Karpaty, penzión Vinosady, firemné akcie, teambuildingy, ochutnávky vína, ubytovanie Pezinok, ubytovanie Bratislava, ubytovanie vinárstvo, skupinové ubytovanie, catering Vinosady, degustácie vína, rodinné oslavy",
  openGraph: {
    title: "Ubytovanie vo vinárstve Vinosady | Firemné akcie a Teambuildingy",
    description: "Jedinečné ubytovanie priamo vo vinárstve - 15 osôb, firemné akcie, teambuildingy, ochutnávky vína v srdci Malých Karpát",
    type: "website",
    locale: "sk_SK",
    images: [
      {
        url: "/galeria/ubytovanie/vyhlad-na-vinohrad-x.jpg",
        width: 1200,
        height: 630,
        alt: "Ubytovanie vo vinárstve Vinosady - výhľad na vinohrady",
      },
    ],
  },
  alternates: {
    canonical: "https://vinoputec.sk/ubytovanie",
  },
};

export default function AccommodationPage() {
  return (
    <div className="min-h-screen bg-background">
      <Hero
        title="Ubytovanie vo vinárstve"
        subtitle="Jedinečné ubytovanie priamo vo vinárstve s neopakovateľnými vínnymi a gastronomickými zážitkami v srdci Malých Karpát"
        backgroundImageUrl="/galeria/ubytovanie/vyhlad-na-vinohrad-x.jpg"
        primaryCta={{ label: "Rezervovať ubytovanie", href: "#rezervacia" }}
        secondaryCta={{ label: "Galéria", href: "/galeria/ubytovanie" }}
        heightClass="h-[60vh]"
      />

      {/* Main Content */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          
          {/* Introduction */}
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
              Ubytovanie vo vinárstve Vinosady
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl text-foreground-muted leading-relaxed mb-6">
                Víno Pútec ponúka jedinečné ubytovanie priamo vo vinárstve, kde spájajú pohodlie s neopakovateľnými vínnymi a gastronomickými zážitkami v srdci Malých Karpát.
              </p>
              <p className="text-lg text-foreground-muted leading-relaxed">
                Ideálne pre firemné akcie, teambuildingy, rodinné oslavy a skupinové pobyty s možnosťou ochutnávok vína a catering služieb.
              </p>
            </div>
          </div>

          {/* Capacity and Rooms */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="relative">
              <Image
                src="/galeria/ubytovanie/izba-interier-x.jpg"
                alt="Interiér ubytovania vo vinárstve Vinosady"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
                priority
              />
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-accent rounded-full flex items-center justify-center">
                <span className="text-3xl">🏠</span>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-foreground mb-8">Kapacita a parametre ubytovania</h3>
              
              <div className="space-y-6">
                <div className="bg-accent/10 p-6 rounded-xl">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-bold text-lg">15</span>
                    </div>
                    <h4 className="text-xl font-semibold text-foreground">Celková kapacita</h4>
                  </div>
                  <p className="text-foreground-muted">Typ ubytovania: Rodinný dom priamo pri vinárstve</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-background border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center mb-3">
                      <span className="text-2xl mr-3">🛏️</span>
                      <h5 className="font-semibold text-foreground">3 izby s troma lôžkami</h5>
                    </div>
                    <p className="text-foreground-muted text-sm">Spolu 9 lôžok</p>
                  </div>
                  
                  <div className="bg-background border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center mb-3">
                      <span className="text-2xl mr-3">🛏️</span>
                      <h5 className="font-semibold text-foreground">3 izby s dvoma lôžkami</h5>
                    </div>
                    <p className="text-foreground-muted text-sm">Spolu 6 lôžok</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="text-accent mr-3">✓</span>
                    <span className="text-foreground">Každá izba disponuje vlastnou kúpeľňou</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-accent mr-3">✓</span>
                    <span className="text-foreground">Maximálny komfort a osobný priestor pre všetkých hostí</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Equipment and Facilities */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-foreground mb-6">Vybavenie a priestory</h3>
              <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
                Plne vybavené priestory pre pohodlný a bezstarostný pobyt
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl p-8">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mr-4">
                    <span className="text-2xl">🍳</span>
                  </div>
                  <h4 className="text-2xl font-semibold text-foreground">Kuchyňa</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="text-accent mr-3 mt-1">✓</span>
                    <span className="text-foreground-muted">Plne vybavená kuchyňa pripravená pre všetkých hostí</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-accent mr-3 mt-1">✓</span>
                    <span className="text-foreground-muted">Všetko potrebné pre pohodlný a bezstarostný pobyt</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-accent mr-3 mt-1">✓</span>
                    <span className="text-foreground-muted">Možnosť prípravy spoločného jedla</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-accent mr-3 mt-1">✓</span>
                    <span className="text-foreground-muted">Priestor na oddych pri šálke kávy</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl p-8">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mr-4">
                    <span className="text-2xl">📍</span>
                  </div>
                  <h4 className="text-2xl font-semibold text-foreground">Lokácia</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="text-accent mr-3 mt-1">📍</span>
                    <span className="text-foreground-muted">Adresa: Pezinská 154, 90201 Vinosady</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-accent mr-3 mt-1">🏔️</span>
                    <span className="text-foreground-muted">Poloha: Úpäti Malých Karpát</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-accent mr-3 mt-1">🍇</span>
                    <span className="text-foreground-muted">Prostredie: Krásne prostredie vinohradov</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-accent mr-3 mt-1">🏠</span>
                    <span className="text-foreground-muted">Charakter: Priamo v rodinnom dome pri vinárstve</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-foreground mb-6">Služby s ubytovaním</h3>
              <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
                Kompletné zabezpečenie pre firemné akcie, teambuildingy a rodinné oslavy
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Catering */}
              <div className="bg-background border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mr-4">
                    <span className="text-2xl">🍽️</span>
                  </div>
                  <h4 className="text-2xl font-semibold text-foreground">Catering a stravovanie</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="text-accent mr-3 mt-1">✓</span>
                    <span className="text-foreground-muted">Raňajky dostupné pre firemné akcie a skupiny</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-accent mr-3 mt-1">✓</span>
                    <span className="text-foreground-muted">Catering služby pre firemné akcie a teambuildingy</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-accent mr-3 mt-1">✓</span>
                    <span className="text-foreground-muted">Rodinné oslavy a špeciálne príležitosti</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-accent mr-3 mt-1">✓</span>
                    <span className="text-foreground-muted">Kompletné zabezpečenie stravovania</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-accent mr-3 mt-1">✓</span>
                    <span className="text-foreground-muted">Prispôsobenie podľa požiadaviek klientov</span>
                  </div>
                </div>
              </div>

              {/* Corporate Services */}
              <div className="bg-background border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mr-4">
                    <span className="text-2xl">🏢</span>
                  </div>
                  <h4 className="text-2xl font-semibold text-foreground">Firemné služby a teambuilding</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="text-accent mr-3 mt-1">✓</span>
                    <span className="text-foreground-muted">Priestor v srdci Malých Karpát</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-accent mr-3 mt-1">✓</span>
                    <span className="text-foreground-muted">Kapacita až 17 osôb pre degustácie</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-accent mr-3 mt-1">✓</span>
                    <span className="text-foreground-muted">Kombinácia vínovej kultúry s tímovou prácou</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-accent mr-3 mt-1">✓</span>
                    <span className="text-foreground-muted">Profesionálny prístup k organizácii</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-accent mr-3 mt-1">✓</span>
                    <span className="text-foreground-muted">Nezabudnuteľné zážitky v prírodnom prostredí</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-accent/10 to-accent/5 rounded-3xl p-12 text-center">
            <h3 className="text-3xl font-bold text-foreground mb-6">
              Rezervujte si ubytovanie vo vinárstve
            </h3>
            <p className="text-xl text-foreground-muted mb-8 max-w-2xl mx-auto">
              Ideálne pre firemné akcie, teambuildingy, rodinné oslavy a skupinové pobyty s ochutnávkami vína
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#rezervacia"
                className="bg-accent hover:bg-accent-dark text-foreground px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
              >
                Rezervovať ubytovanie
              </a>
              <Link
                href="/galeria/ubytovanie"
                className="border-2 border-accent text-accent hover:bg-accent hover:text-foreground px-8 py-4 rounded-lg font-semibold transition-all"
              >
                Pozrieť galériu
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Reservation Section */}
      <section id="rezervacia" className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">Rezervácia ubytovania</h2>
              <p className="text-lg text-foreground-muted">
                Vyplňte formulár nižšie pre rezerváciu ubytovania vo vinárstve
              </p>
            </div>
            
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
    </div>
  );
}
