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
    },
  },
  plugins: [],
} satisfies Config
