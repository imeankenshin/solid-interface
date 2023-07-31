import type { StorybookConfig } from "storybook-solidjs-vite"
import fs from "node:fs"

function getStories({ dir = "components" }) {
  const dirName = `packages/${dir}`
  const scope = fs.readdirSync(dirName)
  return scope
    .map((pkg) => `${dirName}/${pkg}/stories`)
    .filter((storyDir) => fs.existsSync(storyDir))
    .map((storyDir) => `../${storyDir}/*.stories.tsx`)
}

const config: StorybookConfig = {
  stories: [
    ...getStories({ dir: "components" }),
    "../stories/*.{stories.tsx,mdx}",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-styling",
    "@storybook/addon-a11y",
  ],
  framework: "storybook-solidjs-vite",
  docs: {
    autodocs: "tag",
  },
}
export default config
