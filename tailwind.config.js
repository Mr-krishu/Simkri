/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        wine: '#641f35',
        parchment: '#fbf6ec',
        antique: '#ba9056'
      }
    }
  },
  plugins: [],
}
