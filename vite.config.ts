import solid from "solid-start/vite"
import { defineConfig } from "vite"
import autoImport from "unplugin-auto-import/vite"

export default defineConfig({
  plugins: [
    solid({ssr: true}),
    autoImport({
      imports: ["solid-js", {
        "solid-js": [
          "JSX"
        ]
      }],
    }),
  ],
  server: {
    port: 4000
  }
})
