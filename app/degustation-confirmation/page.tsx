import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Potvrdenie rezervácie | Vino Pútec",
  description: "Potvrdenie rezervácie degustácie vína",
  robots: "noindex, nofollow",
};

export default function DegustationConfirmationPage() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <Image
            src="/putec-logo.jpg"
            alt="Pútec Logo"
            width={100}
            height={100}
            className="mx-auto rounded-full shadow-2xl border-4 border-accent mb-6"
          />
          <h1 className="text-4xl font-bold text-foreground mb-4">
            ✅ Rezervácia potvrdená!
          </h1>
          <p className="text-xl text-foreground-muted">
            Ďakujeme za rezerváciu degustácie vína
          </p>
        </div>

        {/* Confirmation Content */}
        <div className="bg-background border border-gray-200 rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">
            Detaily rezervácie
          </h2>
          
          <div className="space-y-4 text-foreground">
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="font-medium">Produkt:</span>
              <span id="product-title">Načítavam...</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="font-medium">Dátum:</span>
              <span id="reservation-date">Načítavam...</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="font-medium">Čas:</span>
              <span id="reservation-time">Načítavam...</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="font-medium">Počet osôb:</span>
              <span id="reservation-guests">Načítavam...</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="font-medium">Cena:</span>
              <span id="reservation-price">Načítavam...</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="font-medium">Email:</span>
              <span id="reservation-email">Načítavam...</span>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-foreground mb-2">Čo ďalej?</h3>
            <ul className="text-sm text-foreground-muted space-y-1">
              <li>• Dostali ste potvrdzovací email s detailmi rezervácie</li>
              <li>• Kontaktujeme vás v prípade potreby</li>
              <li>• V prípade zmeny nás kontaktujte na {process.env.ADMIN_EMAIL || "info@vinoputec.sk"}</li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/degustacie"
            className="bg-accent hover:bg-accent-dark text-foreground px-6 py-3 rounded-lg font-semibold transition-colors text-center"
          >
            Späť na degustácie
          </Link>
          <Link
            href="/"
            className="border-2 border-accent text-foreground hover:bg-accent hover:text-foreground px-6 py-3 rounded-lg font-semibold transition-colors text-center"
          >
            Domov
          </Link>
        </div>
      </div>

      {/* JavaScript to populate data from localStorage */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('DOMContentLoaded', function() {
              const reservationData = localStorage.getItem('degustationReservation');
              if (reservationData) {
                const data = JSON.parse(reservationData);
                document.getElementById('product-title').textContent = data.productTitle || 'N/A';
                document.getElementById('reservation-date').textContent = data.date ? new Date(data.date).toLocaleDateString('sk-SK') : 'N/A';
                document.getElementById('reservation-time').textContent = data.time || 'N/A';
                document.getElementById('reservation-guests').textContent = data.guests ? data.guests + ' osôb' : 'N/A';
                document.getElementById('reservation-price').textContent = data.productPrice || 'N/A';
                document.getElementById('reservation-email').textContent = data.email || 'N/A';
              } else {
                // If no data, redirect to degustacie page
                window.location.href = '/degustacie';
              }
            });
          `,
        }}
      />
    </div>
  );
}

