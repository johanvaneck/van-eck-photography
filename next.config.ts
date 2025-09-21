import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "van-eck-photography.s3.eu-north-1.amazonaws.com",
        port: "", // Usually empty for S3
        pathname: "**", // Adjust pathname as needed, use ** for wildcard
      },
    ],
  },
};

export default nextConfig;
