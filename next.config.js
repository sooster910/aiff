/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  // concurrentFeatures: true,
  // serverComponents: true,
  reactMode: "concurrent",

  images: {
    domains: ["aiff.co.kr", "aiff-image-upload.s3.us-east-1.amazonaws.com"],
  },
};

module.exports = nextConfig;
