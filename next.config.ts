import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /*
     * Every next/image with a px-based `sizes` lists every configured width in
     * its srcset, and each entry repeats the full encoded Amazon URL. With the
     * default 16 widths that was ~2.5 KB of markup per cover, ~230 covers on
     * the home page (audit B7). Covers are at most 500 px at source and render
     * at 120-240 CSS px, so 128/256/384 plus 640 cover them at 1x-3x; the
     * larger device sizes are only for the full-bleed hero (2880 px source).
     */
    imageSizes: [128, 256, 384],
    deviceSizes: [640, 828, 1200, 1920, 2880],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "covers.openlibrary.org",
      },
      {
        protocol: "https",
        hostname: "books.google.com",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
