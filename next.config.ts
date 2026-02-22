import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/friend-kemi",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
