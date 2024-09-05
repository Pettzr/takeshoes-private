/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false, // Disable React Strict Mode
    images: {
      domains: ['res.cloudinary.com', 'images.pexels.com'], // Configure allowed image domains
    },
  };
  
  module.exports = nextConfig; // Export the configuration
  