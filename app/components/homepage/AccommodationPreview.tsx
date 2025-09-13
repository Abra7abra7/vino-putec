import Link from "next/link";
import Image from "next/image";

export default function AccommodationPreview() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Image Placeholder */}
          <div className="relative flex items-center">
            <div className="w-full h-96 bg-primary-light rounded-lg flex items-center justify-center shadow-lg">
              <div className="text-center">
                <div className="w-16 h-16 bg-wine-red rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-background">🏨</span>
                </div>
                <p className="text-wine-red text-lg font-semibold">Fotka ubytovania</p>
                <p className="text-wine-red text-sm">Moderné izby s výhľadom na vinohrady</p>
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
                className="rounded-full shadow-xl border-4 border-primary mb-4"
              />
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Ubytovanie v srdci vinohradníctva
              </h2>
              <p className="text-lg text-wine-red mb-6">
                Prežite nezabudnuteľné chvíle v našom ubytovaní obklopenom vinohradmi a prírodou. 
                Ideálne miesto pre relaxáciu a degustácie našich prémiových vín.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-wine-red rounded-full flex items-center justify-center">
                  <span className="text-lg text-background">🏡</span>
                </div>
                <span className="text-wine-red">Komfortné izby</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-wine-red rounded-full flex items-center justify-center">
                  <span className="text-lg text-background">🍷</span>
                </div>
                <span className="text-wine-red">Degustácie vína</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-wine-red rounded-full flex items-center justify-center">
                  <span className="text-lg text-background">🌅</span>
                </div>
                <span className="text-wine-red">Krásne výhľady</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-wine-red rounded-full flex items-center justify-center">
                  <span className="text-lg text-background">🍽️</span>
                </div>
                <span className="text-wine-red">Raňajky</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/accommodation"
                className="bg-wine-red hover:bg-wine-dark text-background px-6 py-3 rounded-lg font-semibold transition-colors text-center"
              >
                Rezervovať ubytovanie
              </Link>
              <Link
                href="/accommodation"
                className="border-2 border-wine-red text-wine-red hover:bg-wine-red hover:text-background px-6 py-3 rounded-lg font-semibold transition-colors text-center"
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
