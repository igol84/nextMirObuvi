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
      {hostname: 'mirobuvi.com.ua'},
      {hostname: 'lh3.googleusercontent.com'},
    ],
  },
}

module.exports = nextConfig
