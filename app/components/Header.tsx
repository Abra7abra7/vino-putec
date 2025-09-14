import Link from "next/link";
import Image from "next/image";
import MobileMenu from "./MobileMenu";
import DesktopNavigation from "./DesktopNavigation";
import { getLocalization } from "../utils/getLocalization";

export default function Header() {
  const content = getLocalization(); // Fetch localization data

  return (
    <>
      {/* MAIN HEADER */}
      <header className="sticky top-0 bg-background text-foreground py-4 px-4 flex items-center relative z-50 shadow-sm border-b border-gray-200">
        {/* Logo - Left */}
        <div className="flex items-center">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <div className="p-2 border-2 border-accent rounded-lg">
              <Image
                src="/putec-logo.jpg"
                alt="Pútec Logo"
                width={60}
                height={60}
                className="rounded-lg"
                priority
              />
            </div>
          </Link>
        </div>

        {/* Desktop Navigation - Center */}
        <DesktopNavigation menuItems={content.menu} />

        {/* Mobile Menu - Right */}
        <MobileMenu menuItems={content.menu} />
      </header>
    </>
  );
}
