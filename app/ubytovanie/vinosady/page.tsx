import type { Metadata } from "next";
import Hero from "../../components/Hero";
import Link from "next/link";
import Image from "next/image";
import RatingBadge from "../../components/RatingBadge";

export const metadata: Metadata = {
  title: "Ubytovanie Vinosady | Rodinné vinárstvo Putec | Pezinok",
  description: "Ubytovanie vo Vinosadoch pri Pezinku – komfortné izby, krásne výhľady a blízkosť viníc. Ideálne pre páry, priateľov aj firemné pobyty.",
  keywords: "ubytovanie Vinosady, ubytovanie Pezinok, vinohradnícke ubytovanie, vinárstvo Putec",
  openGraph: {
    title: "Ubytovanie Vinosady | Putec",
    description: "Komfortné ubytovanie v srdci vinohradov pri Pezinku.",
    type: "website",
    locale: "sk_SK",
    images: [{ url: "/galeria/ubytovanie/izba-interier-x.jpg", width: 1200, height: 630, alt: "Ubytovanie Vinosady" }],
  },
  alternates: { canonical: "https://vinoputec.sk/ubytovanie/vinosady" },
};

export default function UbytovanieVinosadyLanding() {
  return (
    <div className="min-h-screen bg-background">
      <Hero
        title="Ubytovanie vo Vinosadoch"
        subtitle="Komfortné izby priamo pri vinohradoch, ideálne pre páry, priateľov aj firemné pobyty"
        backgroundImageUrl="/galeria/ubytovanie/vyhlad-na-vinohrad-x.jpg"
        primaryCta={{ label: "Rezervovať ubytovanie", href: "/ubytovanie" }}
        secondaryCta={{ label: "Galéria", href: "/galeria/ubytovanie" }}
        heightClass="h-[60vh]"
      />

      <div className="container mx-auto px-6 -mt-10">
        <RatingBadge ratingValue={5} reviewCount={31} />
      </div>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Pohodlie a zážitok z vína</h2>
            <p className="text-lg text-foreground-muted mb-4">
              Ubytovanie v rodinnom vinárstve Putec ponúka tiché prostredie, krásne výhľady a blízkosť vinohradov.
              Vhodné pre víkendové pobyty, ochutnávky vín aj firemné akcie.
            </p>
            <ul className="space-y-2 text-foreground">
              <li>✓ Komfortné izby a čisté zázemie</li>
              <li>✓ Raňajky a občerstvenie na požiadanie</li>
              <li>✓ Možnosť degustácie vín priamo vo vinárstve</li>
              <li>✓ Výborná dostupnosť – pár minút od Pezinku</li>
            </ul>
            <div className="mt-6 flex gap-4">
              <Link href="/ubytovanie" className="bg-accent hover:bg-accent-dark text-foreground px-6 py-3 rounded-lg font-semibold">Termíny a informácie</Link>
              <Link href="/kontakt" className="border-2 border-accent text-accent hover:bg-accent hover:text-foreground px-6 py-3 rounded-lg font-semibold">Kontaktovať nás</Link>
            </div>
          </div>

          <div className="relative grid grid-cols-2 gap-4">
            <Image src="/galeria/ubytovanie/izba-interier-x.jpg" alt="Izba - ubytovanie Vinosady" width={600} height={400} className="rounded-2xl shadow-2xl" />
            <Image src="/galeria/ubytovanie/veranda-na-poschodi-x.jpg" alt="Veranda - ubytovanie Vinosady" width={600} height={400} className="rounded-2xl shadow-2xl" />
          </div>
        </div>
      </section>

      <section className="py-12 bg-background" id="faq">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-foreground mb-6">Často kladené otázky (FAQ)</h2>
          <div className="space-y-4">
            <details className="bg-background border border-gray-200 rounded-lg p-4">
              <summary className="font-semibold text-foreground">Koľko osôb môžeme ubytovať?</summary>
              <p className="text-foreground-muted mt-2">Závisí od obsadenosti – napíšte nám a preveríme dostupnosť.</p>
            </details>
            <details className="bg-background border border-gray-200 rounded-lg p-4">
              <summary className="font-semibold text-foreground">Sú k dispozícii raňajky?</summary>
              <p className="text-foreground-muted mt-2">Áno, po dohode vieme zabezpečiť raňajky aj občerstvenie.</p>
            </details>
            <details className="bg-background border border-gray-200 rounded-lg p-4">
              <summary className="font-semibold text-foreground">Je možné spojiť pobyt s degustáciou?</summary>
              <p className="text-foreground-muted mt-2">Samozrejme – odporúčame rezervovať degustáciu vopred.</p>
            </details>
          </div>
        </div>
      </section>
    </div>
  );
}


