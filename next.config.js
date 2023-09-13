/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  webpack: function (config, options) {
    config.experiments = { asyncWebAssembly: true };
    return config;
  },
}

module.exports = nextConfig
