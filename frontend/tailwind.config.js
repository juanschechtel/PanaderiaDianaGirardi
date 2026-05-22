/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'nunito': ['Nunito', 'sans-serif'],
        'playfair': ['PlayfairDisplay-Regular', 'serif'],
        'playfair-italic': ['PlayfairDisplay-Italic', 'serif'],
      },
    },
  },
  plugins: [],
}