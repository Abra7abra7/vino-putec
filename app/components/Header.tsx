import Link from "next/link";
import Image from "next/image";
import MobileMenu from "./MobileMenu";
import { getLocalization } from "../utils/getLocalization";

export default function Header() {
  const content = getLocalization(); // Fetch localization data

  return (
    <>
      {/* MAIN HEADER */}
      <header className="bg-background text-foreground py-4 px-4 flex justify-between items-center relative z-50">
        {/* Logo & Tagline */}
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <Image
              src="/putec-logo.jpg"
              alt="Pútec Logo"
              width={60}
              height={60}
              className="rounded-lg"
              priority
            />
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {content.siteName}
              </h1>
              <strong className="text-wine-red">{content.siteTagline}</strong>
            </div>
          </Link>
        </div>

        {/* Mobile Menu (Client Component) */}
        <MobileMenu menuItems={content.menu} />
      </header>
    </>
  );
}
