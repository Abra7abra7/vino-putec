import type { Metadata } from "next";
import Image from "next/image";
import Hero from "../components/Hero";
import { getLocalization } from "../utils/getLocalization";

export const metadata: Metadata = {
  title: "O nás | Rodinné vinárstvo Putec Vinosady | História vinárstva Pezinok",
  description: "Rodinné vinárstvo Putec vo Vinosadoch pri Pezinku. Dlhoročná tradícia výroby prémiových vín, ubytovanie a degustácie vína. História, hodnoty a tím rodinného vinárstva pre Bratislavu, Senec, Trnavu a okolie.",
  keywords: "o nás, Putec, Vinosady, Pezinok, rodinné vinárstvo, história vinárstva, tradícia, Bratislava, Senec, Trnava, ubytovanie, degustácie vína",
  openGraph: {
    title: "O nás | Rodinné vinárstvo Putec Vinosady",
    description: "Dlhoročná tradícia rodinného vinárstva Putec vo Vinosadoch pri Pezinku",
    type: "website",
    locale: "sk_SK",
    images: [
      {
        url: "/o-nas/rodina1.JPG",
        width: 1200,
        height: 630,
        alt: "Rodinné vinárstvo Putec Vinosady",
      },
    ],
  },
  alternates: {
    canonical: "https://vinoputec.sk/o-nas",
  },
};


export default function AboutPage() {
  const { about } = getLocalization();

  if (!about) return null;

  const familyPhotos = [
    {
      src: "/o-nas/rodina1.JPG",
      alt: "Rodina Pútec - tradícia a vášeň pre víno",
      title: "Naša rodina"
    },
    {
      src: "/o-nas/rodina2.jpg", 
      alt: "Rodina Pútec - dedičstvo a láska k vinohradníctvu",
      title: "Rodinná tradícia"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Hero
        title={about.title}
        subtitle="Objavte našu rodinnú históriu a vášeň pre víno"
        backgroundImageUrl="/o-nas/rodina2.jpg"
        secondaryCta={{ label: "Galéria rodiny", href: "/galeria/rodina" }}
        heightClass="h-[50vh]"
      />

      {/* Main Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Feature Image */}
            <div className="relative w-full h-64 md:h-96">
              <Image
                src={about.imagePath}
                alt={about.title}
                fill
                className="rounded-lg object-cover shadow-lg"
                priority
              />
            </div>

            {/* Text Content */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Naša história</h2>
              <p className="text-lg text-foreground whitespace-pre-line leading-relaxed">{about.content}</p>
            </div>
          </div>

          {/* Family Gallery */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Naša rodina</h2>
              <p className="text-lg text-foreground max-w-2xl mx-auto">
                Pozrite si fotky našej rodiny, ktorá už generácie buduje tradíciu vo vinohradníctve
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {familyPhotos.map((photo, index) => (
                <div key={index} className="group">
                  <div className="relative w-full h-80 rounded-lg overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      priority={index === 0}
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-background bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <h3 className="text-foreground font-semibold text-lg">{photo.title}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Values Section */}
          <div className="bg-background border border-gray-200 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-foreground text-center mb-8">Naše hodnoty</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-foreground">🌱</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Tradícia</h3>
                <p className="text-foreground">Dlhoročná rodinná tradícia vo vinohradníctve</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-foreground">❤️</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Vášeň</h3>
                <p className="text-foreground">Láska k vínu a starostlivý prístup k výrobe</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-foreground">⭐</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Kvalita</h3>
                <p className="text-foreground">Prémiová kvalita v každej fľaši vína</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
