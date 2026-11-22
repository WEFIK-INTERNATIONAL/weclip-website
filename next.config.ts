import type { NextConfig } from "next";

// A static site (Render "Static Site": free, on a CDN, never sleeps). Download buttons read the latest release from
// GitHub in the visitor's browser, so a new WeClip version shows up without rebuilding the site.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true, // /download -> /download/index.html, which every static host serves
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
