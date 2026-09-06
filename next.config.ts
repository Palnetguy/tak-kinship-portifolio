import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
        ],
      },
    ];
  },
  images: {
    /* Live TAK media now comes from the S3 bucket the backend returns, while
       older/static assets still point at Cloudinary. Allow only those exact
       hosts instead of a wildcard so the optimizer cannot proxy arbitrary
       third-party URLs. */
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tak-kinship-bkt.s3.us-west-2.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/palnet/**",
      },
    ],
  },
};

export default nextConfig;
