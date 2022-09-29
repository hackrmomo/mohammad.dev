/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    styledComponents: true,
  },
  images: {
    domains: ['mohammad.dev'],
  },
};

module.exports = nextConfig;
