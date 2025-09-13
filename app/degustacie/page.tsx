"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Degustácie vína | Putec Vinosady | Ochutnávky vína Pezinok",
  description: "Degustácie vína v rodinnom vinárstve Putec vo Vinosadoch pri Pezinku. Ochutnávky prémiových vín pre Bratislavu, Senec, Trnavu. Rezervujte si degustáciu vína už dnes.",
  keywords: "degustácie vína, ochutnávky vína, Putec, Vinosady, Pezinok, Bratislava, Senec, Trnava, vinárstvo, degustácie",
  openGraph: {
    title: "Degustácie vína | Putec Vinosady",
    description: "Ochutnávky prémiových vín v rodinnom vinárstve Putec vo Vinosadoch",
    type: "website",
    locale: "sk_SK",
  },
  alternates: {
    canonical: "https://vinoputec.sk/degustacie-vina",
  },
};

export default function DegustaciePage() {
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);

  const packages = [
    {
      id: 1,
      emoji: "🍇",
      title: "Balík č. 1",
      subtitle: "Malá vínna chvíľka",
      capacity: "2-5 osôb",
      duration: "1-1,5 hodiny",
      description: "Ochutnávka 4 starostlivo vybraných vzoriek našich najobľúbenejších vín, doplnených o malú studenú misu. Ideálne pre tých, ktorí sa chcú zoznámiť s našou produkciou, alebo majú záujem o degustáciu vo dvojici.",
      price: 119,
      features: [
        "4 druhy vín",
        "Malá studená misa",
        "Vedúci degustácie",
        "Základné informácie o víne"
      ],
      additionalHour: 36.90
    },
    {
      id: 2,
      emoji: "🍷",
      title: "Balík č. 2",
      subtitle: "Víno trochu inak",
      capacity: "6-9 osôb",
      duration: "2,5-3 hodiny",
      description: "Degustácia 8 druhov starostlivo vybraných vín s majiteľom vinárstva, ktorý vás prevedie svetom našich vín a tajomstvami ich výroby. Príjemný zážitok je doplnený malou studenou misou.",
      price: 295.90,
      features: [
        "8 druhov vín",
        "Majiteľ vinárstva",
        "Prehliadka výrobnej časti",
        "Studená misa",
        "Podrobné vysvetlenie"
      ],
      additionalHour: 36.90
    },
    {
      id: 3,
      emoji: "🍾",
      title: "Balík č. 3",
      subtitle: "Víno trochu inak Vol.2",
      capacity: "10-15 osôb",
      duration: "2,5-3 hodiny",
      description: "Degustácia 8 druhov starostlivo vybraných vín, pre väčšie skupinky, s majiteľom vinárstva, ktorý vás prevedie svetom našich vín a tajomstvami ich výroby. Príjemný zážitok je doplnený malou studenou misou.",
      price: 490,
      features: [
        "8 druhov vín",
        "Majiteľ vinárstva",
        "Prehliadka výrobnej časti",
        "Studená misa",
        "Skupinová atmosféra"
      ],
      additionalHour: 36.90
    },
    {
      id: 4,
      emoji: "🧺",
      title: "Romantika na deke",
      subtitle: "Piknikový zážitok",
      capacity: "2 osoby",
      duration: "Podľa dohody",
      description: "Piknikový košík pre 2 osoby s bohato obloženými bagetami, sladkou pochúťkou, orieškami, minerálkou, fľašou vína podľa vlastného výberu a potrebnými drobnosťami.",
      price: 59.90,
      features: [
        "Piknikový košík",
        "Bohato obložené bagety",
        "Sladká pochúťka",
        "Oriešky a minerálka",
        "Fľaša vína na výber",
        "Pikniková deka"
      ],
      additionalHour: 0,
      deposit: 20
    }
  ];

  const handleBookNow = (packageId: number) => {
    setSelectedPackage(packageId);
    setShowBookingForm(true);
  };

  const handlePayment = (packageId: number) => {
    // Redirect to Stripe checkout or payment page
    const packageData = packages.find(p => p.id === packageId);
    if (packageData) {
      // Here you would integrate with Stripe or your payment system
      alert(`Presmerovanie na platbu za ${packageData.title} - ${packageData.price}€`);
    }
  };

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
            Degustácie vína
          </h1>
          <p className="text-xl text-primary max-w-3xl mx-auto">
            Objavte svet našich prémiových vín prostredníctvom nezabudnuteľných degustačných zážitkov
          </p>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-16 bg-primary-light">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Naše degustačné balíky
            </h2>
            <p className="text-wine-red text-lg max-w-2xl mx-auto">
              Vyberte si z našich špeciálne pripravených degustačných balíkov, 
              ktoré sú navrhnuté pre rôzne veľkosti skupín a príležitosti.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {packages.map((pkg) => (
              <div key={pkg.id} className="bg-background rounded-lg shadow-lg p-8 border border-primary flex flex-col h-full">
                {/* Package Header */}
                <div className="text-center mb-6">
                  <div className="text-4xl mb-4">{pkg.emoji}</div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">{pkg.title}</h3>
                  <h4 className="text-xl text-wine-red font-semibold mb-4">{pkg.subtitle}</h4>
                  <div className="flex justify-center space-x-6 text-sm text-wine-red">
                    <span>👥 {pkg.capacity}</span>
                    <span>⏱️ {pkg.duration}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-wine-red mb-6 leading-relaxed flex-grow">
                  {pkg.description}
                </p>

                {/* Features */}
                <div className="mb-6">
                  <h5 className="font-semibold text-foreground mb-3">Zahrnuté v balíku:</h5>
                  <ul className="space-y-2">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <span className="text-wine-red font-bold">✓</span>
                        <span className="text-wine-red">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price */}
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-foreground mb-2">
                    {pkg.price}€
                  </div>
                  {pkg.additionalHour > 0 && (
                    <p className="text-sm text-wine-red">
                      Každá ďalšia začatá hodina: {pkg.additionalHour}€ + fľaša vína
                    </p>
                  )}
                  {pkg.deposit && (
                    <p className="text-sm text-wine-red">
                      Vratná záloha: {pkg.deposit}€
                    </p>
                  )}
                </div>

                {/* Action Buttons - Fixed at bottom */}
                <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                  <button
                    onClick={() => handleBookNow(pkg.id)}
                    className="flex-1 bg-wine-red hover:bg-wine-dark text-background px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Rezervovať termín
                  </button>
                  <button
                    onClick={() => handlePayment(pkg.id)}
                    className="flex-1 border-2 border-wine-red text-wine-red hover:bg-wine-red hover:text-background px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Zaplatiť teraz
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form Modal */}
      {showBookingForm && selectedPackage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-xl shadow-2xl max-w-lg w-full border-2 border-wine-red">
            {/* Header */}
            <div className="p-4 border-b border-wine-red">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-bold text-foreground">
                  Rezervácia termínu
                </h3>
                <button
                  onClick={() => setShowBookingForm(false)}
                  className="text-wine-red hover:text-wine-dark text-xl font-bold bg-primary-light hover:bg-primary rounded-full w-7 h-7 flex items-center justify-center transition-colors"
                >
                  ×
                </button>
              </div>
              
              <div className="p-2 bg-primary-light rounded border border-wine-red">
                <p className="text-wine-red font-bold text-center text-sm">
                  {packages.find(p => p.id === selectedPackage)?.title} - {packages.find(p => p.id === selectedPackage)?.price}€
                </p>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-4">
              <form className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-foreground font-medium mb-1 text-sm">
                      Meno a priezvisko
                    </label>
                    <input
                      type="text"
                      className="w-full border-2 border-wine-red p-2 rounded focus:outline-none focus:ring-1 focus:ring-wine-red text-foreground bg-background text-sm"
                      placeholder="Vaše meno"
                    />
                  </div>

                  <div>
                    <label className="block text-foreground font-medium mb-1 text-sm">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full border-2 border-wine-red p-2 rounded focus:outline-none focus:ring-1 focus:ring-wine-red text-foreground bg-background text-sm"
                      placeholder="vas@email.sk"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-foreground font-medium mb-1 text-sm">
                      Telefón
                    </label>
                    <input
                      type="tel"
                      className="w-full border-2 border-wine-red p-2 rounded focus:outline-none focus:ring-1 focus:ring-wine-red text-foreground bg-background text-sm"
                      placeholder="+421 XXX XXX XXX"
                    />
                  </div>

                  <div>
                    <label className="block text-foreground font-medium mb-1 text-sm">
                      Preferovaný dátum
                    </label>
                    <input
                      type="date"
                      className="w-full border-2 border-wine-red p-2 rounded focus:outline-none focus:ring-1 focus:ring-wine-red text-foreground bg-background text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-foreground font-medium mb-1 text-sm">
                    Počet osôb
                  </label>
                  <select className="w-full border-2 border-wine-red p-2 rounded focus:outline-none focus:ring-1 focus:ring-wine-red text-foreground bg-background text-sm">
                    <option>Vyberte počet osôb</option>
                    <option>2 osôb</option>
                    <option>3 osôb</option>
                    <option>4 osôb</option>
                    <option>5 osôb</option>
                    <option>6 osôb</option>
                    <option>7 osôb</option>
                    <option>8 osôb</option>
                    <option>9 osôb</option>
                    <option>10 osôb</option>
                    <option>11 osôb</option>
                    <option>12 osôb</option>
                    <option>13 osôb</option>
                    <option>14 osôb</option>
                    <option>15 osôb</option>
                  </select>
                </div>

                <div>
                  <label className="block text-foreground font-medium mb-1 text-sm">
                    Poznámky
                  </label>
                  <textarea
                    rows={2}
                    className="w-full border-2 border-wine-red p-2 rounded focus:outline-none focus:ring-1 focus:ring-wine-red text-foreground bg-background resize-none text-sm"
                    placeholder="Špeciálne požiadavky, alergény, atď."
                  />
                </div>
              </form>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-wine-red">
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowBookingForm(false)}
                  className="flex-1 border-2 border-wine-red text-wine-red hover:bg-wine-red hover:text-background px-4 py-2 rounded font-semibold transition-colors text-sm"
                >
                  Zrušiť
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-wine-red hover:bg-wine-dark text-background px-4 py-2 rounded font-semibold transition-colors text-sm"
                >
                  Odoslať rezerváciu
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Info */}
      <section className="py-16 bg-wine-dark text-primary">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Kontakt pre degustácie</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-xl font-semibold mb-4">Rezervácie</h3>
              <p className="mb-2">📞 +421 XXX XXX XXX</p>
              <p className="mb-2">✉️ degustacie@vinoputec.sk</p>
              <p>🕒 9:00 - 18:00 (denne)</p>
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
