import Link from "next/link";
import MobileMenu from "./MobileMenu";
import { getLocalization } from "../utils/getLocalization";

export default function Header() {
  const content = getLocalization(); // Fetch localization data

  return (
    <>
      {/* MAIN HEADER */}
      <header className="bg-white text-gray-900 py-4 px-4 flex justify-between items-center relative z-50">
        {/* Logo & Tagline */}
        <div>
          <h1 className="text-2xl font-bold">
            <Link href="/" className="text-gray-900 hover:text-gray-700">
              {content.siteName}
            </Link>
          </h1>
          <strong className="text-gray-700">{content.siteTagline}</strong>
        </div>

        {/* Mobile Menu (Client Component) */}
        <MobileMenu menuItems={content.menu} />
      </header>
    </>
  );
}
