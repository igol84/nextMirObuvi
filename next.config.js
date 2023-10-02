/** @type {import('next').NextConfig} */
const path = require('path')
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mirobuvi.com.ua',
        port: '',
        pathname: '/ftp_brands/**',
      },
      {
        protocol: 'https',
        hostname: 'mirobuvi.com.ua',
        port: '',
        pathname: '/ftp_products/**',
      },
    ],
  },
}

module.exports = nextConfig
