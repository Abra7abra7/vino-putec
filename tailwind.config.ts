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
        primary: {
          DEFAULT: "#f7dca7",
          dark: "#e6c896",
          light: "#f9e6c4",
        },
        wine: {
          red: "#722f37",
          dark: "#5a2429",
          light: "#8b3a42",
        },
        accent: {
          brown: "#8b4513",
          gold: "#f7dca7",
        },
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
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
