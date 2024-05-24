/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "gamepress.gg", protocol: "https" }],
  },
};

export default nextConfig;
