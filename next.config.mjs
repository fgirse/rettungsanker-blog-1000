/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Disable ESLint during build to avoid circular dependency issues
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { hostname: "images.react-photo-album.com" },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    qualities: [50, 75, 85, 90, 100],
  },
};

export default nextConfig;