// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "storage.googleapis.com",
//       },
//       {
//         protocol: "https",
//         hostname: "gateway.pinata.cloud",
//       },
//     ],
//     // domains: ["gateway.pinata.cloud"],
//   },
//   webpack: (config, { isServer }) => {
//     if (!isServer) {
//       config.optimization.minimize = true;
//     }
//     return config;
//   },
// };

// export default nextConfig;

import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "gateway.pinata.cloud",
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.minimize = true;
    }
    return config;
  },
  // output: "standalone",
};

export default withBundleAnalyzer(nextConfig);
