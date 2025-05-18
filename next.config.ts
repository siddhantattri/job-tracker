import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  output: 'export',

  // ignore ESLint errors during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  /* config options here */
};

export default nextConfig;
