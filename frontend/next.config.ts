import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com", // Allow images from img.clerk.com
        port: "", // Leave empty if no specific port is required
        pathname: "/**", // Allows all paths under img.clerk.com
      },
    ],
  },
  rewrites: async () => {
    return [
      // {
      // 	source: '/sign-in/:path*',
      // 	destination: '/sign-in/:path*',
      // },
      {
        source: "/api/:path*",
        destination: "http://localhost:5000/api/:path*",
      },
    ];
  },
};

export default nextConfig;
