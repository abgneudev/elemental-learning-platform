import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    /**
     * Allow legacy Elemental media from the Webflow CDN. Per
     * `Elemental_Asset_Manifest.md` §7, reuse rights are pending — when
     * we migrate to `/public/legacy/`, this entry can be removed.
     */
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.prod.website-files.com",
        pathname: "/608992c15f8d261420ca9608/**",
      },
    ],
  },
};

export default nextConfig;