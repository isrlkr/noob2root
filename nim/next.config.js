/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'cdn.cosmos.so'],
    formats: ['image/avif', 'image/webp'],
  },
  // Ajoutez d'autres configurations si nécessaire
}

module.exports = nextConfig
