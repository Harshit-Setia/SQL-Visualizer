/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // <--- Tell tailwind to check your components
  ],
  theme: {
    extend: {
      colors: {
        background: "#0e0e0e",
        surface: {
          low: "#131313",
          container: "#1a1a1a",
          high: "#20201f",
          bright: "#2c2c2c",
          lowest: "#000000",
        },
        primary: {
          DEFAULT: "#FF8C00",
          variant: "#ff9f4a",
          container: "#fd8b00",
        },
        on: {
          surface: {
            variant: "#adaaaa",
          },
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
