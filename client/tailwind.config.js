/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f0f7f4',
          100: '#e0efe9',
          200: '#bfe0d4',
          300: '#94c9b6',
          400: '#5da991',
          500: '#388e76',
          600: '#28725e',
          700: '#215b4c',
          800: '#1b4d3e',
          900: '#143d2f',
          950: '#0a231b',
        },
        yathra: {
          green: '#13392c',
          dark: '#0d221a',
          sand: '#e8ded2',
          ivory: '#faf8f5',
          cream: '#f3ece2',
          amber: '#e59325',
          gold: '#d97706',
          earth: '#785b46',
          charcoal: '#1a1f1d',
          stone: '#38423e'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(10, 35, 27, 0.15)',
        'float': '0 20px 40px -15px rgba(13, 34, 26, 0.25)',
      }
    },
  },
  plugins: [],
}
