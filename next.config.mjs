/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
    ],
  },
  // async headers() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       headers: [{ key: "Content-Encoding", value: "gzip" }],
  //     },
  //   ];
  // },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.minimize = true;
    }
    return config;
  },
};

export default nextConfig;
