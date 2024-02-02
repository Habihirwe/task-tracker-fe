/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      screens: {
        xs: { min: "320px" },
        sm: { min: "540px" },
        md: { min: "768px" },
        lg: { min: "1024px" },
        xl: { min: "1280px" },
      },
    },
  },
  plugins: [],
};
