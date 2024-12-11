/** @type {import('next').NextConfig} */

console.log("🔍 BUILD ENV VARIABLES", process.env.NEXT_PUBLIC_BACKEND_BASE_URL);

const nextConfig = {
  images: {
    domains: ["aiff.co.kr", "aiff-image-upload.s3.us-east-1.amazonaws.com","aiff-image-upload.s3.ap-northeast-2.amazonaws.com"],
  },
  env: {
    NEXT_PUBLIC_BACKEND_BASE_URL:process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
    NEXT_PUBLIC_FRONTEND_BASE_URL:process.env.NEXT_PUBLIC_FRONTEND_BASE_URL,
    NEXT_PUBLIC_MIXPANEL_TOKEN: process.env.NEXT_PUBLIC_MIXPANEL_TOKEN,
    NEXT_PUBLIC_PAYMENT_FAIL_URL:process.env.NEXT_PUBLIC_PAYMENT_FAIL_URL,
    NEXT_PUBLIC_PAYMENT_SUCCESS_URL:process.env.NEXT_PUBLIC_PAYMENT_SUCCESS_URL,
    NEXT_PUBLIC_TOSS_SECRET_KEY:process.env.NEXT_PUBLIC_TOSS_SECRET_KEY,
    NEXT_PUBLIC_TOSS_CLIENT_KEY:process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY,
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
