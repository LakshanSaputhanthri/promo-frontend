/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.hnb.lk",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
