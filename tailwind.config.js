/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBlue: {
          50: '#f0f7ff',
          100: '#c9e2ff',
          200: '#94c5ff',
          300: '#60a8ff',
          400: '#2c8aff',
          500: '#006dff', // Primary dark blue
          600: '#0057cc',
          700: '#004199',
          800: '#002c66',
          900: '#001633', // Very dark blue for backgrounds
        },
      },
    },
  },
  plugins: [],
}