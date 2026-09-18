/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["IBM Plex Sans", "Inter", "system-ui", "sans-serif"],
        mono: ["IBM Plex Mono", "ui-monospace", "monospace"],
      },
      colors: {
        void: "#05070b",
        panel: "#0b1118",
        card: "#101821",
        line: "#1c2a38",
        cyan: {
          neon: "#22e0d0",
        },
        violet: {
          neon: "#a78bfa",
        },
      },
      boxShadow: {
        glow: "0 0 40px rgba(34, 224, 208, 0.12)",
        "glow-violet": "0 0 36px rgba(167, 139, 250, 0.14)",
      },
    },
  },
  plugins: [],
};
