import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['localhost', 'vino-putec-web.vercel.app', 'vinoputec.sk'],
  },
};

export default nextConfig;
