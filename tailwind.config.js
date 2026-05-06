/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        clothiq: {
          black: '#0f172a',
          gold: '#d4af37',
          offwhite: '#f8fafc',
        }
      }
    },
  },
  plugins: [],
}
