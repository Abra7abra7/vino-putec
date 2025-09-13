import type { Metadata } from "next";
import Image from "next/image";
import { getLocalization } from "../utils/getLocalization";

export const metadata = ((): Metadata => {
  const { about, siteName } = getLocalization();
  return {
    title: `${about.title} - ${siteName}`,
    description: about.content.split("\n")[0], // Use first paragraph as description
  };
})();


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
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-wine-dark via-wine-red to-accent-brown text-background">
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
            {about.title}
          </h1>
          <p className="text-xl text-primary max-w-3xl mx-auto">
            Objavte našu rodinnú históriu a vášeň pre víno
          </p>
        </div>
      </section>

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
              <p className="text-lg text-wine-red whitespace-pre-line leading-relaxed">{about.content}</p>
            </div>
          </div>

          {/* Family Gallery */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Naša rodina</h2>
              <p className="text-lg text-wine-red max-w-2xl mx-auto">
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
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <h3 className="text-background font-semibold text-lg">{photo.title}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Values Section */}
          <div className="bg-primary-light rounded-xl p-8">
            <h2 className="text-3xl font-bold text-foreground text-center mb-8">Naše hodnoty</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-wine-red rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-background">🌱</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Tradícia</h3>
                <p className="text-wine-red">Dlhoročná rodinná tradícia vo vinohradníctve</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-wine-red rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-background">❤️</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Vášeň</h3>
                <p className="text-wine-red">Láska k vínu a starostlivý prístup k výrobe</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-wine-red rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-background">⭐</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Kvalita</h3>
                <p className="text-wine-red">Prémiová kvalita v každej fľaši vína</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
