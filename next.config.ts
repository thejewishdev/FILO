import type { NextConfig } from "next";

/**
 * Static export: `npm run build` writes the finished site to /out as plain HTML, CSS and JS.
 * That folder runs on any static host (GitHub Pages, Netlify, Cloudflare Pages) or locally with
 * `python3 -m http.server 8000 --directory out`.
 *
 * Hosting under a sub-path such as username.github.io/sugo? Set NEXT_PUBLIC_BASE_PATH=/sugo when building.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  reactStrictMode: true,
  images: {
    // No server to resize images in a static export, so Unsplash's CDN does it (size + AVIF/WebP).
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    deviceSizes: [640, 828, 1080, 1440, 1920, 2560],
    imageSizes: [96, 160, 256, 384],
  },
};

export default nextConfig;
