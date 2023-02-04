/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      clipPath: {
        "hero-image": "polygon(32% 0, 100% 0%, 100% 100%, 0% 100%)",
      },
    },
  },
  plugins: [require("tailwind-clip-path"), require("@tailwindcss/typography")],
};
