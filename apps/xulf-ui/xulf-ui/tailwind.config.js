/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './apps/xulf-ui/xulf-ui/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    '../../libs/ui/**/*.{js,ts,jsx,tsx}',
    '../../libs/essentials/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
