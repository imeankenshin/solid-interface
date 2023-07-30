import type { StorybookConfig } from "storybook-solidjs-vite"
import fs from "node:fs"
import { join, dirname } from "path"

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")))
}

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
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-interactions"),
  ],
  framework: {
    name: getAbsolutePath("storybook-solidjs-vite"),
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
}
export default config
