/**
 * 현재 스테이지
 */

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

/**
 * FRONTEND BASE URL
 */
export const NEXT_PUBLIC_FRONTEND_BASE_URL = process.env
  .NEXT_PUBLIC_FRONTEND_BASE_URL as string;

/**
 * BACKEND BASE URL
 */
export const BACKEND_BASE_URL = process.env
  .NEXT_PUBLIC_BACKEND_BASE_URL as string;

/**
 * BACKEND BASE URL
 */
export const NEXT_PUBLIC_BACKEND_BASE_URL = process.env
  .NEXT_PUBLIC_BACKEND_BASE_URL as string;

/**
 * TOSS PAYMENTS CLIENT KEY
 */
export const NEXT_PUBLIC_TOSS_CLIENT_KEY = process.env
  .NEXT_PUBLIC_TOSS_CLIENT_KEY as string;

/**
 * TOSS PAYMENTS SECRET KEY
 */

export const NEXT_PUBLIC_TOSS_SECRET_KEY = process.env
  .NEXT_PUBLIC_TOSS_SECRET_KEY as string;

export const COOKIES = {
  ACCESS_TOKEN: "__AIFF_ADMIN_ACCESS_TOKEN",
};
/**
 * 접근에 restrict 가 없는 routes
 */
export const publicRoutes = {
  HOME: "/",
  LOGIN: "/login",
  BOOKING: "/booking",
  PAYMENT: "/payment",
  NOT_FOUND: "/oops",
};

/**
 * restrict가 있는 routes
 */
export const privateRoutes = {
  ADMIN: "/admin",
};

/**
 * API Endpoints
 */

export const serverAPI = {
  AUTH_LOGIN: "/auth/login",
  AUTH_TOKEN: "/auth/token",
};

/**
 * toss payment success redirect url
 */

export const NEXT_PUBLIC_PAYMENT_SUCCESS_URL = process.env
  .NEXT_PUBLIC_PAYMENT_SUCCESS_URL as string;

/**
 * toss payment fail redirect url
 */

export const NEXT_PUBLIC_PAYMENT_FAIL_URL = process.env
  .NEXT_PUBLIC_PAYMENT_FAIL_URL as string;

/**
 * frontend api url temporary
 */

export const NEXT_PUBLIC_FRONTEND_API_URL = process.env
  .NEXT_PUBLIC_FRONTEND_API_URL as string;

/**
 * slack bot api
 *
 */

export const SLACK_API_TOKEN = process.env.SLACK_API_TOKEN as string;

/**
 * Sentry DSN
 *
 */

export const SENTRY_DSN = process.env.SENTRY_DSN as string;

/**
 * Biz plus clientId
 */

export const BIZ_PLUS_CLIENT_ID = process.env.BIZ_PLUSH_CLIENT_ID as string;

/**
 * BIZ_PLUSH_CLIENT_PW
 */
export const BIZ_PLUSH_CLIENT_PW = process.env.BIZ_PLUSH_CLIENT_PW as string;

/**
 * BIZ_PLUS_SENDER_ID
 */

export const BIZ_PLUS_SENDER_ID = process.env.BIZ_PLUS_SENDER_ID as string;

/**
 * BIZ_SENDER_KEY
 */

export const BIZ_SENDER_KEY = process.env.BIZ_SENDER_KEY as string;

/**
 * bzPlusURL
 */

export const bzPlusURL = process.env.bzPlusURL as string;

/**
 * NEXT_PUBLIC_MIXPANEL_TOKEN
 */
export const NEXT_PUBLIC_MIXPANEL_TOKEN =process.env.NEXT_PUBLIC_MIXPANEL_TOKEN as string;