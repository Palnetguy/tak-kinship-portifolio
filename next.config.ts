import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /* TAK's own media lives on Cloudinary under the `palnet` cloud, which is
       where every image the backend returns points. Allowing exactly that host
       and path prefix, rather than a wildcard, keeps the optimizer from being
       usable as an open image proxy for arbitrary remote URLs. */
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/palnet/**",
      },
    ],
  },
};

export default nextConfig;
