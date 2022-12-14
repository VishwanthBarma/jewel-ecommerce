/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "hero-bg": "url('/jewel.jpg')",
        "products-bg": "url('/jewel2.jpeg')",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
