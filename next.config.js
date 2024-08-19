/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '/account123/**',
      },
    ],
  },
  output: 'export',
  distDir: 'dist',
  basePath: '/DocuMate',
  assetPrefix: '/DocuMate/',
};

module.exports = nextConfig;
