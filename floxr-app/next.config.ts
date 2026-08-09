import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  typescript: {
    ignoreBuildErrors: true,
  },

  async redirects() {
    return [
      // The standalone audit page is retired; the offer now lives as a line on
      // /contact. Kept as a 308 so old links and existing SEO equity survive.
      { source: '/audit', destination: '/contact', permanent: true },
    ];
  },
};

export default nextConfig;
