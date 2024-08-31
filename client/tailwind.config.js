/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          100: '#d4a76a',
          200: '#b57c4d',
          300: '#8f5e3c',
          400: '#7d4c3c',
          500: '#6c3c2c',
          600: '#5a2a1a',
          700: '#4a1b0e',
          800: '#3a0d00',
        },
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out forwards',
      },
     
    },
  },
  plugins: [],
}

