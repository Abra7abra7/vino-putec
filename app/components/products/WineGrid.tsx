"use client";

import { useState, useEffect } from "react";
import ProductCardWithProvider from "./ProductCardWithProvider";
import { Product } from "../../../types/Product";
import { useLocalization } from "../../context/LocalizationContext";

export default function WineGrid() {
  const [wines, setWines] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { labels } = useLocalization();

  useEffect(() => {
    const fetchWines = async () => {
      try {
        const response = await fetch('/api/wines');
        const data = await response.json();
        setWines(data.wines || []);
      } catch (error) {
        console.error('Chyba pri načítaní vín:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWines();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-foreground">{labels.loadingProducts || "Načítavanie vín..."}</p>
      </div>
    );
  }

  if (wines.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-foreground">{labels.noProductsFound || "Žiadne vína sa nenašli..."}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {wines.map((wine) => (
        <ProductCardWithProvider key={wine.ID} product={wine} />
      ))}
    </div>
  );
}
