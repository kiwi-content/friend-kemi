import type { NextConfig } from "next";

const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const normalizedBasePath =
  configuredBasePath && configuredBasePath !== "/"
    ? configuredBasePath.replace(/\/+$/, "")
    : "";
const basePath = process.env.VERCEL === "1" ? "" : normalizedBasePath;

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
