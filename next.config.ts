import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "images.unsplash.com",
      "static.nike.com",
      "example.com",
      "s1.dswcdn.com",
      "www.tennisnuts.com",
      "external-content.duckduckgo.com",
      "fabrikbrands.com",
    ],
  },
};

export default nextConfig;
