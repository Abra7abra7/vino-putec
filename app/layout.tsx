import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CookiesBanner from "./components/CookiesBanner";
import { LocalizationProvider } from "./context/LocalizationContext";
import type { Metadata } from "next";

// Load single font family for whole site (lighter payload)
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "Vino Putec - Rodinné vinárstvo vo Vinosadoch",
  description: "Prémiové vína z Vinosád, ubytovanie a degustácie vína v Pezinku",
  metadataBase: new URL("https://vino-putec-web.vercel.app"),
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
          ${inter.variable}
        `}
      >
        <LocalizationProvider>
          <Header />
          {children}
          <Footer />
          <CookiesBanner />
        </LocalizationProvider>
      </body>
    </html>
  );
}
