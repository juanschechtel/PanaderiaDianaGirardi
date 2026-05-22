/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,html}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'nuni': ['Nunito', 'sans-serif'],
        'paris-i': ['PlayfairDisplay-Italic', 'sans-serif'],
        'paris-r': ['PlayfairDisplay-Regular', 'sans-serif'],
      },
    },
  },
}
