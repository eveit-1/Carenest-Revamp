/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['www.carenest.in'],
    unoptimized: false,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [...(config.externals || []), 'nodemailer'];
    }
    return config;
  },
}

module.exports = nextConfig
