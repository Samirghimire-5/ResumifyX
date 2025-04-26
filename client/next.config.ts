import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false, // Disable strict mode , double render, console
  images: {
    domains: ["localhost"],
  }
};

export default nextConfig;