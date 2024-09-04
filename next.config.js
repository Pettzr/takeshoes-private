/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, 
  experimental: {
    outputFileTracingIncludes: {
      "/": ["./node_modules/argon2/prebuilds/linux-x64/*"], 
    },
  },
  images: {
    domains: ['res.cloudinary.com', 'images.pexels.com'],
  },
};

module.exports = nextConfig;
