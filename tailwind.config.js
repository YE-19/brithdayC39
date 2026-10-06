/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mauve: {
          DEFAULT: '#965b79',
          dark: '#7a4763',
        },
        cream: {
          DEFAULT: '#fbf6ec',
        },
        blush: '#e8c7d6',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        script: ['"Alex Brush"', 'cursive'],
        hand: ['"Caveat"', 'cursive'],
        letter: ['"EB Garamond"', 'serif'],
      },
      boxShadow: {
        polaroid: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.15)',
      }
    },
  },
  plugins: [],
}