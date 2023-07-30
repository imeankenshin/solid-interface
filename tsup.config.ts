import { defineConfig } from "tsup"

export default defineConfig({
  format: ["cjs", "esm"],
  target: "es2020",
  dts: true,
})
