/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'green-light': '#7dd56f',
        'green-dark': '#28b487',
        'grey-light': '#f7f7f7',
        'grey-dark': '#777',
      },
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-green': 'linear-gradient(to right bottom, #7dd56f, #28b487)',
      },
    },
  },
  plugins: [],
};
