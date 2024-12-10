/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  // concurrentFeatures: true,
  // serverComponents: true,
  // reactMode: "concurrent",

  images: {
    domains: ["aiff.co.kr", "aiff-image-upload.s3.us-east-1.amazonaws.com","aiff-image-upload.s3.ap-northeast-2.amazonaws.com"],
  },
}

module.exports = nextConfig

// Injected content via Sentry wizard below

// const { withSentryConfig } = require("@sentry/nextjs");

// module.exports = withSentryConfig(
//   module.exports,
//   {
//     // For all available options, see:
//     // https://github.com/getsentry/sentry-webpack-plugin#options

//     // Suppresses source map uploading logs during build
//     org: "aiff",
//     project: "frontend-aiff",
//     // An auth token is required for uploading source maps.
//     authToken: process.env.SENTRY_AUTH_TOKEN,

//     silent: true, // Suppresses all logs
//   },
//   {
//     // For all available options, see:
//     // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

//     // Upload a larger set of source maps for prettier stack traces (increases build time)
//     widenClientFileUpload: true,

//     // Transpiles SDK to be compatible with IE11 (increases bundle size)
//     transpileClientSDK: true,

//     // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
//     tunnelRoute: "/monitoring",

//     // Hides source maps from generated client bundles
//     hideSourceMaps: true,

//     // Automatically tree-shake Sentry logger statements to reduce bundle size
//     disableLogger: true,
//   }
// );
