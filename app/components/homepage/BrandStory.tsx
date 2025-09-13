import Link from "next/link";
import Image from "next/image";
import { getLocalization } from "../../utils/getLocalization";

export default async function BrandStory() {
  // Fetch localization data (Server-Side)
  const { homepage } = getLocalization();

  if (!homepage?.brandStory) {
    return null; // Prevent rendering if missing data
  }

  const { title, description, buttonText, ctaLink } = homepage.brandStory;

  return (
    <section className="relative w-full py-24 bg-gradient-to-r from-wine-dark via-wine-red to-accent-brown text-background">
      <div className="container mx-auto px-6 text-center">
        {/* Logo */}
        <div className="mb-8">
          <Image
            src="/putec-logo.jpg"
            alt="Pútec Logo"
            width={100}
            height={100}
            className="mx-auto rounded-full shadow-2xl border-4 border-primary"
          />
        </div>

        {/* Title */}
        <h2 className="text-4xl font-extrabold mb-6 tracking-wide">
          {title}
        </h2>

        {/* Description */}
        <p className="text-lg max-w-3xl mx-auto opacity-90">
          {description}
        </p>

        {/* Call to Action Button */}
        <Link
          href={ctaLink}
          className="mt-8 inline-block bg-background text-wine-red hover:bg-primary px-8 py-3 rounded-full text-lg font-semibold shadow-lg transition-all transform hover:scale-105"
        >
          {buttonText}
        </Link>
      </div>

      {/* Decorative Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-wine-red/30 to-transparent pointer-events-none"></div>
    </section>
  );
}
