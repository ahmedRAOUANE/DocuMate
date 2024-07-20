/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '/account123/**',
      },
    ],
  },
  output: 'export',
  basePath: '/DocuMate',
  assetPrefix: '/DocuMate/',
};

module.exports = nextConfig;
