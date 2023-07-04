/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mainColor: {
          DEFAULT: "rgb(31 41 55)",
        },
        secColor: {
          DEFAULT: "rgb(250 204 21)",
          sec: "rgb(161 98 7)",
        },
      },
      fontFamily: {
        Marhey: ["Marhey", "cursive"],
        Almarai: ["Almarai", "sans-serif"],
        Cairo: ["Cairo", "sans-serif"],
      },
    },
  },
  plugins: [],
};
