import type { Metadata } from "next";
import Hero from "../../components/Hero";
import Link from "next/link";
import Image from "next/image";
import RatingBadge from "../../components/RatingBadge";

export const metadata: Metadata = {
  title: "Degustácie vína Pezinok | Vinosady | Firemné akcie a teambuilding | Vino Putec",
  description: "Degustácie vína v Pezinku a Vinosadoch – firemné akcie, teambuildingy a skupinové ochutnávky priamo vo vinárstve Putec. Rezervujte balíky už dnes.",
  keywords: "degustácie Pezinok, degustácie Vinosady, teambuilding víno, firemné akcie víno, ochutnávka vína Pezinok",
  openGraph: {
    title: "Degustácie vína Pezinok | Vinosady",
    description: "Ochutnávky prémiových vín, firemné akcie a teambuildingy v rodinnom vinárstve Putec.",
    type: "website",
    locale: "sk_SK",
    images: [{ url: "/galeria/degustacie/degustacia-skupina.jpg", width: 1200, height: 630, alt: "Degustácie vína Pezinok" }],
  },
  alternates: { canonical: "https://vinoputec.sk/degustacie/pezinok" },
};

export default function DegustaciePezinokLanding() {
  return (
    <div className="min-h-screen bg-background">
      <Hero
        title="Degustácie vína – Pezinok & Vinosady"
        subtitle="Firemné akcie, teambuildingy a skupinové ochutnávky priamo vo vinárstve"
        backgroundImageUrl="/galeria/degustacie/degustacia-skupina.jpg"
        primaryCta={{ label: "Rezervovať degustáciu", href: "#baliky" }}
        secondaryCta={{ label: "Galéria", href: "/galeria/degustacie" }}
        heightClass="h-[60vh]"
      />

      <div className="container mx-auto px-6 -mt-10">
        <RatingBadge ratingValue={5} reviewCount={31} />
      </div>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Degustácie vína pre firmy aj skupiny</h2>
            <p className="text-lg text-foreground-muted mb-4">
              V rodinnom vinárstve Putec vo Vinosadoch pri Pezinku organizujeme degustácie
              pre menšie aj väčšie skupiny. Ideálne pre teambuildingy, firemné akcie, či rodinné oslavy.
            </p>
            <ul className="space-y-2 text-foreground">
              <li>✓ Kapacita priestorov až 17 osôb</li>
              <li>✓ Profesionálny sprievodca degustáciou</li>
              <li>✓ Catering a občerstvenie na želanie</li>
              <li>✓ Prehliadka výrobnej časti vinárstva</li>
            </ul>
            <div className="mt-6 flex gap-4">
              <Link href="#baliky" className="bg-accent hover:bg-accent-dark text-foreground px-6 py-3 rounded-lg font-semibold">Pozrieť balíky</Link>
              <Link href="/kontakt" className="border-2 border-accent text-accent hover:bg-accent hover:text-foreground px-6 py-3 rounded-lg font-semibold">Napísať nám</Link>
            </div>
          </div>

          <div className="relative">
            <Image src="/galeria/degustacie/degustacia-brano-x.jpg" alt="Degustácie vína Pezinok" width={600} height={400} className="rounded-2xl shadow-2xl" />
          </div>
        </div>
      </section>

      <section className="py-12 bg-background" id="faq">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-foreground mb-6">Často kladené otázky (FAQ)</h2>
          <div className="space-y-4">
            <details className="bg-background border border-gray-200 rounded-lg p-4">
              <summary className="font-semibold text-foreground">Koľko ľudí môžeme priniesť?</summary>
              <p className="text-foreground-muted mt-2">Od 2 do približne 17 osôb podľa balíka a priestorov.</p>
            </details>
            <details className="bg-background border border-gray-200 rounded-lg p-4">
              <summary className="font-semibold text-foreground">Je možné zabezpečiť občerstvenie?</summary>
              <p className="text-foreground-muted mt-2">Áno, zabezpečíme studenú misu či catering podľa dohody.</p>
            </details>
            <details className="bg-background border border-gray-200 rounded-lg p-4">
              <summary className="font-semibold text-foreground">Kde sa nachádzame?</summary>
              <p className="text-foreground-muted mt-2">Pezinská 154, 902 01 Vinosady – pár minút od Pezinku.</p>
            </details>
          </div>
        </div>
      </section>

      <section className="py-4" id="baliky">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">Degustačné balíky</h2>
          <p className="text-foreground-muted mb-8">Vyberte si z našich pripravených balíkov degustácií alebo nám napíšte a pripravíme Vám ponuku na mieru.</p>
          <Link href="/degustacie" className="bg-accent hover:bg-accent-dark text-foreground px-8 py-4 rounded-lg font-semibold inline-block">Pozrieť balíky</Link>
        </div>
      </section>
    </div>
  );
}


