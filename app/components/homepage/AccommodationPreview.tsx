import Link from "next/link";
import Image from "next/image";

export default function AccommodationPreview() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Image Placeholder */}
          <div className="relative flex items-center">
            <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center shadow-lg">
              <div className="text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-foreground">🏨</span>
                </div>
                <p className="text-foreground text-lg font-semibold">Fotka ubytovania</p>
                <p className="text-foreground text-sm">Moderné izby s výhľadom na vinohrady</p>
              </div>
            </div>
          </div>

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
                Ubytovanie v srdci vinohradníctva
              </h2>
              <p className="text-lg text-foreground mb-6">
                Prežite nezabudnuteľné chvíle v našom ubytovaní obklopenom vinohradmi a prírodou. 
                Ideálne miesto pre relaxáciu a degustácie našich prémiových vín.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                  <span className="text-lg text-foreground">🏡</span>
                </div>
                <span className="text-foreground">Komfortné izby</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                  <span className="text-lg text-foreground">🍷</span>
                </div>
                <span className="text-foreground">Degustácie vína</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                  <span className="text-lg text-foreground">🌅</span>
                </div>
                <span className="text-foreground">Krásne výhľady</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                  <span className="text-lg text-foreground">🍽️</span>
                </div>
                <span className="text-foreground">Raňajky</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/ubytovanie"
                className="bg-accent hover:bg-accent-dark text-foreground px-6 py-3 rounded-lg font-semibold transition-colors text-center"
              >
                Rezervovať ubytovanie
              </Link>
              <Link
                href="/ubytovanie"
                className="border-2 border-accent text-foreground hover:bg-accent hover:text-foreground px-6 py-3 rounded-lg font-semibold transition-colors text-center"
              >
                Zobraziť detaily
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
