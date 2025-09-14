"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function AccommodationGallery() {
  const [exterier, setExterier] = useState<string[]>([]);
  const [izby, setIzby] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/ubytovanie/gallery');
        const data = await res.json();
        setExterier(data.exterier || []);
        setIzby(data.izby || []);
      } catch (e) {
        console.error('Nepodarilo sa načítať galériu ubytovania', e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-foreground">Načítavam fotky ubytovania...</p>
        </div>
      </section>
    );
  }

  const Section = ({ title, photos }: { title: string; photos: string[] }) => (
    <div className="mb-12">
      <h3 className="text-2xl font-semibold text-foreground mb-4">{title}</h3>
      {photos.length === 0 ? (
        <p className="text-foreground-muted">Žiadne fotografie.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photos.slice(0, 9).map((src) => (
            <div key={src} className="relative aspect-[4/3] rounded-lg overflow-hidden shadow">
              <Image src={src} alt={title} fill className="object-cover" sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw" />
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-foreground mb-8">Fotogaléria ubytovania</h2>
        <Section title="Exteriér" photos={exterier} />
        <Section title="Izby" photos={izby} />
      </div>
    </section>
  );
}


