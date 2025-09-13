import Link from "next/link";
import MobileMenu from "./MobileMenu";
import { getLocalization } from "../utils/getLocalization";

export default function Header() {
  const content = getLocalization(); // Fetch localization data

  return (
    <>
      {/* MAIN HEADER */}
      <header className="bg-background text-foreground py-4 px-4 flex justify-between items-center relative z-50">
        {/* Logo & Tagline */}
        <div>
          <h1 className="text-2xl font-bold">
            <Link href="/" className="text-foreground hover:text-wine-red transition-colors">
              {content.siteName}
            </Link>
          </h1>
          <strong className="text-wine-red">{content.siteTagline}</strong>
        </div>

        {/* Mobile Menu (Client Component) */}
        <MobileMenu menuItems={content.menu} />
      </header>
    </>
  );
}
