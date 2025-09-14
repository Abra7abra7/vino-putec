"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Achievements() {
  const [selectedCategory, setSelectedCategory] = useState<'diplomy' | 'ocenenia'>('diplomy');

  const diplomy = [
    {
      id: 1,
      title: "Linčanský džbánek 2024",
      subtitle: "Cabernet 2018",
      image: "/uspechy/diplomy/Linčanský džbánek 2024 Cabernet 2018_page-0001.jpg"
    },
    {
      id: 2,
      title: "Víno Inak 2018",
      subtitle: "Tramín",
      image: "/uspechy/diplomy/VI- 2018 Tramin_page-0001.jpg"
    },
    {
      id: 3,
      title: "Víno Inak 2017",
      subtitle: "Rizling Vlašský",
      image: "/uspechy/diplomy/VI-2017 Rizling Vlašský_page-0001.jpg"
    },
    {
      id: 4,
      title: "Víno Inak 2018",
      subtitle: "Müller",
      image: "/uspechy/diplomy/VI-2018 Muller_page-0001.jpg"
    },
    {
      id: 5,
      title: "Víno Inak 2020",
      subtitle: "Müller",
      image: "/uspechy/diplomy/VI-2020 Muller_page-0001.jpg"
    },
    {
      id: 6,
      title: "Víno Inak 2020",
      subtitle: "Rizling",
      image: "/uspechy/diplomy/VI-2020 rizling opravený_page-0001.jpg"
    },
    {
      id: 7,
      title: "Víno Inak 2024",
      subtitle: "Chardonnay",
      image: "/uspechy/diplomy/VI-2024 Chardonnay_page-0001.jpg"
    },
    {
      id: 8,
      title: "Víno Inak 2025",
      subtitle: "Cabernet Rosé",
      image: "/uspechy/diplomy/VI-2025 Cabernet Rosé_page-0001.jpg"
    }
  ];

  const ocenenia = [
    {
      id: 1,
      title: "Ocenenie 2020",
      subtitle: "Víno Inak",
      image: "/uspechy/ocenenia/VI-2020_page-0001.jpg"
    },
    {
      id: 2,
      title: "Ocenenie 2024",
      subtitle: "Víno Inak",
      image: "/uspechy/ocenenia/VI-2024_page-0001.jpg"
    },
    {
      id: 3,
      title: "Ocenenie 2025",
      subtitle: "Víno Inak",
      image: "/uspechy/ocenenia/VI-2025_page-0001.jpg"
    }
  ];

  const currentItems = selectedCategory === 'diplomy' ? diplomy : ocenenia;

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Naše úspechy a ocenenia
          </h2>
          <p className="text-lg text-foreground-muted max-w-3xl mx-auto">
            Pridajte sa k tisíckam spokojných zákazníkov, ktorí si vybrali naše prémiové vína
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setSelectedCategory('diplomy')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                selectedCategory === 'diplomy'
                  ? 'bg-accent text-foreground'
                  : 'text-foreground-muted hover:text-foreground'
              }`}
            >
              Diplomy
            </button>
            <button
              onClick={() => setSelectedCategory('ocenenia')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                selectedCategory === 'ocenenia'
                  ? 'bg-accent text-foreground'
                  : 'text-foreground-muted hover:text-foreground'
              }`}
            >
              Ocenenia
            </button>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentItems.map((item) => (
            <div
              key={item.id}
              className="bg-background rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={item.image}
                  alt={`${item.title} - ${item.subtitle}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-foreground text-lg mb-1">
                  {item.title}
                </h3>
                <p className="text-foreground-muted text-sm">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-foreground-muted mb-6">
            Chcete sa dozvedieť viac o našich vínoch?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/vina"
              className="bg-accent hover:bg-accent-dark text-foreground px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Pozrieť naše vína
            </Link>
            <Link
              href="/degustacie"
              className="border-2 border-accent text-accent hover:bg-accent hover:text-foreground px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Rezervovať degustáciu
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
