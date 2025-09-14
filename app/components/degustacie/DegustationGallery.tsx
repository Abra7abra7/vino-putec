"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function DegustationGallery() {
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        const response = await fetch('/api/gallery/degustacie');
        const data = await response.json();
        setPhotos(data.photos || []);
      } catch (error) {
        console.error('Nepodarilo sa načítať galériu degustácií:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPhotos();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <p className="text-foreground">Načítavam galériu...</p>
          </div>
        </div>
      </section>
    );
  }

  if (photos.length === 0) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <p className="text-foreground">Žiadne fotografie.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {photos.map((photo, index) => (
            <div key={index} className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src={photo}
                alt={`Degustácia ${index + 1}`}
                width={400}
                height={300}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white bg-opacity-90 rounded-full p-2">
                    <svg className="w-6 h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
