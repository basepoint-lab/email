import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  transpilePackages: [
    "@basepoint-lab/tokens",
    "@basepoint-lab/ui",
    "@basepoint-lab/layout",
  ],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
