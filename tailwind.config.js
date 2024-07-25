/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*.{ts,tsx,html,js,jsx}", "./src/**/*.{ts,tsx,html,js,jsx}"],
  theme: {
    extend: {
      screens: {
        l1: "1300px",
        l2: "1050px",
      },
    },
  },
  plugins: [require("daisyui")],
};
