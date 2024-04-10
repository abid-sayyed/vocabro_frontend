/** @type {import('next').NextConfig} */


const nextConfig = {
  rewrites: async () => [
    {
      source: "/anthropic/:path*",
      destination: "https://api.anthropic.com/:path*"
    },
  ],
  // ...other configuration
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
  webpack: (config, options) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: false,
    };
    return config;
  },
};

export default nextConfig;