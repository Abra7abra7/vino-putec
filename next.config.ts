import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  // Add experimental options to help with hydration mismatches
  experimental: {
    // This helps with some hydration issues
    optimizeCss: true,
    // Increase tolerance for hydration mismatches
    strictNextHead: false,
  },
  
  // Add image configuration to optimize image loading
  images: {
    formats: ['image/avif', 'image/webp'],
    // Ensure images are properly optimized
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
