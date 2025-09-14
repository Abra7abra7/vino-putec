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

    </div>
  );
}
