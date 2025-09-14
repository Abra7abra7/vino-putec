"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "../../types/Product";

export default function DegustationProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/degustacie');
        const data = await response.json();
        setProducts(data.degustacie || []);
      } catch (error) {
        console.error('Chyba pri načítaní degustačných produktov:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-foreground">Načítavam degustácie...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-background text-foreground">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-8">
            <Image
              src="/putec-logo.jpg"
              alt="Pútec Logo"
              width={120}
              height={120}
              className="mx-auto rounded-full shadow-2xl border-4 border-accent"
            />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Degustácie vína
          </h1>
          <p className="text-xl text-foreground max-w-3xl mx-auto">
            Objavte svet našich prémiových vín prostredníctvom nezabudnuteľných degustačných zážitkov
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Naše degustačné balíky
            </h2>
            <p className="text-foreground-muted text-lg max-w-2xl mx-auto">
              Vyberte si z našich špeciálne pripravených degustačných balíkov, 
              ktoré sú navrhnuté pre rôzne veľkosti skupín a príležitosti.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {products.map((product) => (
              <div key={product.ID} className="rounded-lg shadow-lg overflow-hidden border border-gray-200 flex flex-col h-full">
                {/* Image background header */}
                <div className="relative h-48 w-full">
                  <Image
                    src={product.FeatureImageURL || '/placeholder.png'}
                    alt={product.Title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-2xl font-bold drop-shadow" style={{ color: '#ffffff' }}>{product.Title}</h3>
                    <div className="flex gap-4 text-sm text-gray-100">
                      <span>👥 {product.Capacity}</span>
                      <span>⏱️ {product.Duration}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-background p-8 flex flex-col flex-1">

                {/* Description */}
                <p className="text-foreground-muted mb-6 leading-relaxed flex-grow">
                  {product.ShortDescription}
                </p>

                {/* Features */}
                {product.Features && (
                  <div className="mb-6">
                    <h5 className="font-semibold text-foreground mb-3">Zahrnuté v balíku:</h5>
                    <ul className="space-y-2">
                      {product.Features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <span className="text-accent font-bold">✓</span>
                          <span className="text-foreground-muted">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Price */}
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-foreground mb-2">
                    {product.SalePrice}€
                  </div>
                  {product.Deposit && (
                    <p className="text-sm text-foreground-muted">
                      Vratná záloha: {product.Deposit}€
                    </p>
                  )}
                </div>

                {/* Action Button */}
                <div className="mt-auto">
                  <Link
                    href={`/degustacie/${product.Slug}`}
                    className="w-full bg-accent hover:bg-accent-dark text-foreground px-6 py-3 rounded-lg font-semibold transition-colors text-center block"
                  >
                    Rezervovať degustáciu
                  </Link>
                </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-background text-foreground">
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
