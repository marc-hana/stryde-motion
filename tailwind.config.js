/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: { extend: {
    colors: { obsidian: '#090B10', graphite: '#191D27', electric: '#526BFF', ice: '#F2F3F5', steel: '#AEB7C4' },
    fontFamily: { display: ['Barlow Condensed', 'sans-serif'], sans: ['DM Sans', 'sans-serif'] }
  }},
  plugins: []
}
