/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // পেমেন্ট বা অথেনটিকেশনের জন্য যদি অতিরিক্ত কনফিগ লাগে এখানে আসবে
};

export default nextConfig;