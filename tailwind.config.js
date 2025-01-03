import tailwindScrollbar from 'tailwind-scrollbar'
/** @type {import('tailwindcss').Config} */
import { nextui } from '@nextui-org/react'

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    // make sure it's pointing to the ROOT node_module
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF1F2',
          100: '#FFE4E6',
          200: '#FECDD3',
          300: '#FDA4AF',
          400: '#FB7185',
          500: '#F43F5E', // 메인 브랜드 컬러
          600: '#E11D48',
          700: '#BE123C',
          800: '#9F1239',
          900: '#881337',
        },
        info: {
          500: '#3B82F6',
          600: '#2563EB',
        },
        success: {
          500: '#22C55E',
        },
        warning: {
          500: '#F59E0B',
        },
        error: {
          500: '#EF4444',
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui(),
    tailwindScrollbar,
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-gutter-stable': {
          'scrollbar-gutter': 'stable',
        },
      })
    },
  ],
}
