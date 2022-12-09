/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        // Configure your color palette here
        ivory: "#F9F4EC",
        chalk: "#EAEAEA",
        clay: "#B0695C",
        balticSea: "#2A2A2A",
      },
    },
  },
  darkMode: "class",
  plugins: [require("@tailwindcss/line-clamp")],
};
