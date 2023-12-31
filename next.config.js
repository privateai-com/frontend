/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  webpack: function (config, options) {
    config.experiments = { asyncWebAssembly: true };
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'archon-backend.sfxdx.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'drive.google.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'frontend-demo.privateai.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'backend-demo.privateai.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'archon.sfxdx.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
