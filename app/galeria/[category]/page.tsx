"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function GalleryCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const [photos, setPhotos] = useState<string[]>([]);
  const [category, setCategory] = useState<string>("");

  useEffect(() => {
    (async () => {
      const { category } = await params;
      setCategory(category);
      try {
        const res = await fetch(`/api/gallery/${category}`);
        const data = await res.json();
        setPhotos(data.photos || []);
      } catch (e) {
        console.error("Nepodarilo sa načítať galériu", e);
      }
    })();
  }, [params]);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-bold text-foreground mb-8">Galéria – {category}</h1>
        {photos.length === 0 ? (
          <p className="text-foreground-muted">Žiadne fotografie.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((src) => (
              <div key={src} className="relative aspect-[4/3] rounded-lg overflow-hidden border border-gray-200">
                <Image src={src} alt={category} fill className="object-cover" sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw" />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}


