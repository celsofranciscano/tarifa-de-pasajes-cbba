/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#0F1117",
        gold: {
          light: "#FFE169",
          DEFAULT: "#FFD700",
          dark: "#B8860B",
        },
        animation: {
          glow: "glow 2s ease-in-out infinite alternate",
        },
        keyframes: {
          glow: {
            from: { "box-shadow": "0 0 20px #FFD700" },
            to: { "box-shadow": "0 0 30px #FFE169" },
          },
        },
      },
    },
  },
  plugins: [],
};
