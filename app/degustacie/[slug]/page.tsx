import { notFound } from "next/navigation";
import { getProductBySlug } from "../../utils/getProducts";
import type { Metadata } from "next";
import Image from "next/image";
import ReservationForm from "../../components/degustacie/ReservationForm";
import { getCurrencySymbol } from "../../utils/getCurrencySymbol";

// Generate metadata for each degustation
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product || product.ProductType !== 'degustation') {
    return {
      title: "Degustácia nenájdená | Putec Vinosady",
      description: "Požadovaná degustácia nebola nájdená.",
    };
  }

  return {
    title: `${product.Title} | Putec Vinosady | Degustácie vína`,
    description: product.ShortDescription,
    keywords: "degustácie vína, ochutnávky vína, Putec, Vinosady, Pezinok, Bratislava, Senec, Trnava",
    openGraph: {
      title: `${product.Title} | Putec Vinosady`,
      description: product.ShortDescription,
      type: "website",
      locale: "sk_SK",
    },
    alternates: {
      canonical: `https://vinoputec.sk/degustacie/${product.Slug}`,
    },
  };
}

export default async function DegustationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product || product.ProductType !== 'degustation') {
    notFound();
  }

  const currencySymbol = getCurrencySymbol(product.Currency);
  const hasDiscount = parseFloat(product.SalePrice) < parseFloat(product.RegularPrice);

  const priceBlock = (
    <div className="text-2xl font-bold text-foreground">
      {hasDiscount ? (
        <div className="flex items-center gap-2">
          <span className="text-red-600">
            {currencySymbol}
            {product.SalePrice}
          </span>
          <span className="text-foreground-muted line-through text-lg">
            {currencySymbol}
            {product.RegularPrice}
          </span>
        </div>
      ) : (
        <span>
          {currencySymbol}
          {product.RegularPrice}
        </span>
      )}
    </div>
  );

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-foreground mb-8">{product.Title}</h1>
        
        <div className="grid mt-2 grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* LEFT COLUMN: IMAGES */}
          <div className="space-y-4">
            <div className="relative">
              <Image
                src={product.FeatureImageURL}
                alt={product.Title}
                width={500}
                height={600}
                className="w-full h-auto object-cover rounded-lg shadow-lg"
                priority
              />
            </div>
            {product.ProductImageGallery && product.ProductImageGallery.length > 0 && (
              <div className="grid grid-cols-2 gap-2">
                {product.ProductImageGallery.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt={`${product.Title} - obrázok ${index + 1}`}
                    width={200}
                    height={200}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                ))}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: DETAILS */}
          <div className="space-y-6">
            <p className="text-lg text-foreground-muted">{product.ShortDescription}</p>
            
            {/* Degustation specific info */}
            <div className="p-4 bg-accent-subtle rounded-lg">
              <h3 className="text-lg font-semibold text-foreground mb-3">Informácie o degustácii</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-foreground-muted">Kapacita:</span>
                  <span className="text-foreground font-medium">{product.Capacity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground-muted">Trvanie:</span>
                  <span className="text-foreground font-medium">{product.Duration}</span>
                </div>
                {product.Deposit && (
                  <div className="flex justify-between">
                    <span className="text-foreground-muted">Vratná záloha:</span>
                    <span className="text-foreground font-medium">{currencySymbol}{product.Deposit}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              {priceBlock}
              <div className="text-center">
                <p className="text-foreground-muted text-sm">
                  Pre rezerváciu vyplňte formulár nižšie
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features for degustations */}
        {product.Features && (
          <div className="mt-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Zahrnuté v balíku</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.Features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-accent-subtle rounded-lg">
                  <span className="text-accent font-bold text-lg">✓</span>
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LONG DESCRIPTION */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-foreground mb-4">O degustácii</h2>
          <p className="text-foreground-muted leading-relaxed">{product.LongDescription}</p>
        </div>

        {/* Reservation Form */}
        <ReservationForm product={product} />

        {/* Contact Info */}
        <div className="mt-10 p-6 bg-background border border-accent rounded-lg">
          <h3 className="text-xl font-semibold text-foreground mb-4">Kontaktné informácie</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Rezervácie</h4>
              <p className="text-foreground-muted">📞 +421 903 465 666</p>
              <p className="text-foreground-muted">✉️ info@vinoputec.sk</p>
              <p className="text-foreground-muted">🕒 9:00 - 18:00 (denne)</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Adresa</h4>
              <p className="text-foreground-muted">Pezinská 154</p>
              <p className="text-foreground-muted">902 01 Vinosady, Slovensko</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
