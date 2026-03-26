/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: '#d4af37',
        graphite: '#141414'
      },
      boxShadow: {
        glow: '0 0 30px rgba(212,175,55,0.25)'
      }
    },
  },
  plugins: [],
};
