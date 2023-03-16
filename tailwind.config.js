/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.js",
    "./pages/**/*.js",
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        'sm': '600px',
        'md': '740px',
        'lg': '960px',
        'xl': '1024px',
        '2xl': '1280px',
      },
    },
    extend: {},
  },
  plugins: [],
}
