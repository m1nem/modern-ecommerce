/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  env: {
    STRIPE_PUBLISHABLE_KEY: 'pk_test_51O...',
    STRIPE_SECRET_KEY: 'sk_test_51O...',
  },
}
module.exports = nextConfig
