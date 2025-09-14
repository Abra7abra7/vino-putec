"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import MiniCart from "./MiniCart";
import { ReduxProvider } from "../providers";

interface MenuItem {
  label: string;
  href: string;
}

interface DesktopNavigationProps {
  menuItems: MenuItem[];
}

const DesktopNavigation = ({ menuItems }: DesktopNavigationProps) => {
  const pathname = usePathname();
  const isCartOrCheckoutPage = pathname === "/kosik" || pathname === "/pokladna";

  return (
    <ReduxProvider>
      {/* Desktop Navigation - Centered */}
      <nav className="hidden md:flex items-center space-x-8 flex-1 justify-center">
        {menuItems.map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            className="text-sm font-medium text-foreground hover:text-foreground transition-colors"
          >
            {label}
          </Link>
        ))}
      </nav>

      {/* Desktop Cart Icon - Right side */}
      {!isCartOrCheckoutPage && (
        <div className="hidden md:flex">
          <MiniCart />
        </div>
      )}
    </ReduxProvider>
  );
};

export default DesktopNavigation;
