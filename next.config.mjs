/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  eslint: {
    // No ESLint config shipped with this project; don't block builds on it.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
