import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "@fontsource/playfair-display";
import "@fontsource/montserrat";
import "./globals.css";
import { CartProvider } from "./components/cart/CartProvider";
import MiniCart from "./components/cart/MiniCart";
import CartToggle from "./components/cart/CartToggle";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Putec Winery | Luxury Wines from Ribera del Duero",
  description: "Experience exceptional wines crafted in the heart of Ribera del Duero since 1892. Discover our premium collection and exclusive wine tasting experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable}`}>
      <body className="antialiased">
        <CartProvider>
          {/* Cart Toggle Button - Fixed position */}
          <div className="fixed top-24 right-6 z-40">
            <CartToggle />
          </div>
          
          {/* Mini Cart Component */}
          <MiniCart />
          
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
