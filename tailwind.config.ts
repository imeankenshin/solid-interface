import type { Config } from "tailwindcss"

export default {
  content: ["./packages/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontSize: {
        base: ["1rem", "1.25"],
        "label-sm": ["0.875rem", "1"],
      },
      fontFamily: {
        text: ["SF Pro Text"], // add Inter to the list
        display: ["SF Pro Display"],
        mono: ["SF Mono"],
      },
      animation: {
        "scale-in": "scale 150ms ease-in-out",
        "scale-out": "scale 150ms ease-in-out revert",
        "fade-in": "fade 150ms ease-in-out",
        "fade-out": "fade 150ms ease-in-out revert",
      },
      keyframes: {
        scale: {
          "0%": { transform: "scale(0.96)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        fade: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
