import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
