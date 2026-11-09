import type { Config } from "tailwindcss";

// Colours come from CSS variables in src/app/globals.css so light and dark mode share one palette.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)", sf: "var(--sf)", ink: "var(--ink)", mut: "var(--mut)",
        g: "var(--g)", g2: "var(--g2)", line: "var(--line)",
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        sans: ["Figtree", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
