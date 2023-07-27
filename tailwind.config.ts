import type { Config } from 'tailwindcss'

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontSize: {
        "label-sm":  ["0.875rem","1.25rem"]
      },
      fontFamily: {
        text: ['SF Pro Text'], // add Inter to the list
        display:['SF Pro Display'],
        mono: ['SF Mono']
      }
    },
  },
  plugins: [],
} satisfies Config

