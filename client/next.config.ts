import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false, // Disable strict mode , double render, console
  images: {
    domains: ["lh3.googleusercontent.com"],
  }
};

export default nextConfig;