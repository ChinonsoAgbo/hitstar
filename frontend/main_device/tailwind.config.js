const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  safelist: [
    'ring-gray-500',
    'border-gray-500',
    'ring-blue-500',
    'border-blue-500',
    'ring-red-500',
    'border-red-500',
    'ring-yellow-500',
    'border-yellow-500',
    'ring-green-500',
    'border-green-500',
    'ring-brown-500',
    'border-brown-500',
      'border-white',
      'ring-white',
      'border-black',
      'ring-black',
      'border-orange-500',
      'ring-orange-500',
      'border-pink-500',
      'ring-pink-500',
      'border-gray-500',
      'ring-gray-500',
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