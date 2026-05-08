import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["165.101.250.39"],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
