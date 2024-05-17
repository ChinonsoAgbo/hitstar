const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
        // primary: '#151796',
        primary: colors.indigo,
        // secondary: '#f0aa41',
        secondary: colors.yellow,
        neutral: '#f3f3f3',
      },
    },
  },
  plugins: [],
}