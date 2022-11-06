/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  // concurrentFeatures: true,
  // serverComponents: true,
  reactMode: 'concurrent',
  // experimental: {
  //   runtime: 'nodejs',
  //   serverComponents: true,
  // },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: `https://staging.aiff.co.kr/api/:path*`,
  //     },
  //   ]
  // },
}

module.exports = nextConfig
