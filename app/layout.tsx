import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { LocalizationProvider } from "./context/LocalizationContext";
import type { Metadata } from "next";

// Load two fonts: one for headings, one for body
const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["400", "700"], // normal + bold, for headings
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "700"], // typical body range
});

export const metadata: Metadata = {
  title: "Vino Putec - Rodinné vinárstvo vo Vinosadoch",
  description: "Prémiové vína z Vinosád, ubytovanie a degustácie vína v Pezinku",
  icons: {
    icon: [
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon-32.png",
    apple: "/favicon-192.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sk">
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
            body { 
              margin: 0; 
              font-family: ${inter.style.fontFamily}, system-ui, sans-serif;
              background-color: #ffffff;
              color: #000000;
            }
            * { box-sizing: border-box; }
          `
        }} />
      </head>
      <body
        className={`
          antialiased
          ${poppins.variable}
          ${inter.variable}
        `}
      >
        <LocalizationProvider>
          <Header />
          {children}
          <Footer />
        </LocalizationProvider>
      </body>
    </html>
  );
}
