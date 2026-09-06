import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
        ],
      },
    ];
  },
  // Keep Turbopack inside this repository. The parent workspace also contains
  // other applications and an unrelated package-lock file.
  turbopack: {
    root: process.cwd(),
  },
  experimental: {
    // Keep local production builds within the available Windows memory budget.
    staticGenerationMaxConcurrency: 1,
    staticGenerationMinPagesPerWorker: 100,
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
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/media/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/media/**",
      },
    ],
  },
};

export default nextConfig;
