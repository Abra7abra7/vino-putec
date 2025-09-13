import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Vino Putec brand colors
        primary: "#f7dca7",
        'primary-dark': "#e6c896", 
        'primary-light': "#f9e6c4",
        'wine-red': "#722f37",
        'wine-dark': "#5a2429",
        'wine-light': "#8b3a42",
        'accent-brown': "#8b4513",
        'accent-gold': "#f7dca7",
        background: "#ffffff",
        foreground: "#171717",
      },
      fontFamily: {
        heading: ["var(--font-poppins)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
