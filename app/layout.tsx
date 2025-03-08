import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "@fontsource/playfair-display";
import "@fontsource/montserrat";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
