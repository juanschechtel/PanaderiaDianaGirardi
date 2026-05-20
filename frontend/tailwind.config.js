/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,html}"
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        pacifico: ['Pacifico', 'cursive'],
        lobster: ['Lobster', 'sans-serif'],
        cinzel: ['Cinzel Decorative', 'serif'],
        paris: ['Parisienne', 'cursive'],
        orbitron: ['Orbitron', 'sans-serif'],
        creep: ['Creepster', 'system-ui'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}