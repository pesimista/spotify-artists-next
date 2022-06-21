const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        black: {
          ...colors.black,
          spotify: '#222222',
        },
        blue: {
          ...colors.blue,
          spotify: '#619CED',
        },
        red: {
          ...colors.red,
          spotify: '#E3513D',
        },
        green: {
          ...colors.green,
          spotify: '#D6F379',
        },
      },
    },
  },
  plugins: [],
}
