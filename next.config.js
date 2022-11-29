/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    PUBLIC_URL: "./public"
  }
}

module.exports = nextConfig
