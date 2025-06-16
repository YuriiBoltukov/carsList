import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/cars",
        destination: "https://testing-api.ru-rating.ru/cars",
      },
    ];
  },
};

export default nextConfig;
