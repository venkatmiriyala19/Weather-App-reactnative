/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}', // Root App file
    './src/screens/**/*.{js,jsx,ts,tsx}', // Screen files
    './src/components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
