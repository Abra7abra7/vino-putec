import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galéria | Putec",
  description: "Fotogalérie vinárstva Pútec",
};

const categories = [
  { slug: "degustacie", title: "Degustácie" },
  { slug: "ubytovanie", title: "Ubytovanie" },
  { slug: "rodina", title: "Rodina" },
  { slug: "sklepy", title: "Sklepy" },
  { slug: "vinohrady", title: "Vinohrady" },
  { slug: "vyroba", title: "Výroba" },
];

export default function GalleryIndexPage() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-foreground mb-8">Galéria</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((c) => (
            <Link key={c.slug} href={`/galeria/${c.slug}`} className="block border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
              <h2 className="text-xl font-semibold text-foreground">{c.title}</h2>
              <p className="text-foreground-muted text-sm">Zobraziť fotky</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}


