import Link from "next/link";
import Image from "next/image";

export default function DegustaciePreview() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Content */}
          <div className="flex flex-col justify-center">
            <div className="mb-6">
              <Image
                src="/putec-logo.jpg"
                alt="Pútec Logo"
                width={80}
                height={80}
                className="rounded-full shadow-xl border-4 border-accent mb-4"
              />
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Degustácie vína
              </h2>
              <p className="text-lg text-foreground mb-6">
                Objavte svet našich prémiových vín prostredníctvom nezabudnuteľných degustačných zážitkov. 
                Vyberte si z našich špeciálne pripravených balíkov pre rôzne veľkosti skupín.
              </p>
            </div>

            {/* Package Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                  <span className="text-lg text-foreground">🍇</span>
                </div>
                <div>
                  <span className="text-foreground font-semibold">Malá vínna chvíľka</span>
                  <p className="text-foreground text-sm">2-5 osôb • 119€</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                  <span className="text-lg text-foreground">🍷</span>
                </div>
                <div>
                  <span className="text-foreground font-semibold">Víno trochu inak</span>
                  <p className="text-foreground text-sm">6-9 osôb • 295,90€</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                  <span className="text-lg text-foreground">🍾</span>
                </div>
                <div>
                  <span className="text-foreground font-semibold">Víno trochu inak Vol.2</span>
                  <p className="text-foreground text-sm">10-15 osôb • 490€</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                  <span className="text-lg text-foreground">🧺</span>
                </div>
                <div>
                  <span className="text-foreground font-semibold">Romantika na deke</span>
                  <p className="text-foreground text-sm">2 osoby • 59,90€</p>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">Čo vás čaká:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <span className="text-foreground font-bold">✓</span>
                  <span className="text-foreground">Ochutnávka prémiových vín</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-foreground font-bold">✓</span>
                  <span className="text-foreground">Vedúci degustácie</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-foreground font-bold">✓</span>
                  <span className="text-foreground">Prehliadka vinárstva</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-foreground font-bold">✓</span>
                  <span className="text-foreground">Studená misa</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/degustacie"
                className="bg-accent hover:bg-accent-dark text-foreground px-6 py-3 rounded-lg font-semibold transition-colors text-center"
              >
                Rezervovať degustáciu
              </Link>
              <Link
                href="/degustacie"
                className="border-2 border-accent text-foreground hover:bg-accent hover:text-foreground px-6 py-3 rounded-lg font-semibold transition-colors text-center"
              >
                Zobraziť všetky balíky
              </Link>
            </div>
          </div>

          {/* Image Placeholder */}
          <div className="relative flex items-center">
            <div className="w-full h-96 bg-accent-light rounded-lg flex items-center justify-center shadow-lg">
              <div className="text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-foreground">🍷</span>
                </div>
                <p className="text-foreground text-lg font-semibold">Degustačná miestnosť</p>
                <p className="text-foreground text-sm">Elegantné prostredie pre ochutnávky</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
