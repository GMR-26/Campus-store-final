/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      // If you use another image hosting service, you can add its hostname here too
    ],
  },
};

module.exports = nextConfig;