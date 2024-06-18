const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  safelist: [
    'ring-gray-200',
    'border-gray-200',
    'bg-gray-200',
    'ring-blue-200',
    'border-blue-200',
      'bg-blue-200',
    'ring-red-200',
    'border-red-200',
      'bg-red-200',
    'ring-yellow-200',
    'border-yellow-200',
      'bg-yellow-200',
    'ring-green-200',
    'border-green-200',
      'bg-green-200',
    'ring-brown-200',
    'border-brown-200',
      'bg-brown-200',
    'border-cyan-200',
    'ring-cyan-200',
      'bg-cyan-200',
    'border-lime-200',
    'ring-lime-200',
      'bg-lime-200',
    'border-orange-200',
    'ring-orange-200',
      'bg-orange-200',
    'border-pink-200',
    'ring-pink-200',
      'bg-pink-200',
    'border-gray-200',
    'ring-gray-200',
      'grid-cols-7'
  ],
  theme: {
    extend: {
      fontFamily: {
        comic: ['"Comic Sans MS"', 'cursive', 'sans-serif'],
      },
      colors: {
        ...colors,
        // primary: '#151796',
        primary: colors.blue,
        // secondary: '#f0aa41',
        secondary: colors.orange,
        neutral: '#f3f3f3',
      },
    },
  },
  plugins: [],
}