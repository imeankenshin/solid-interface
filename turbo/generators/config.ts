import type { PlopTypes } from "@turbo/gen"

function add(path: string, templateFile: string): PlopTypes.ActionType {
  return {
    type: "add",
    path: `packages/components/{{name}}/${path}`,
    templateFile: `templates/${templateFile}.hbs`,
  }
}

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  // create a generator
  plop.setGenerator("component", {
    description: "Create a new component",
    // gather information from the user
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Component name:",
      },
      {
        type: "input",
        name: "description",
        message: "Component description:",
      },
    ],
    // perform actions based on the prompts
    actions: [
      add("src/index.ts", "index.ts"),
      add("src/{{name}}.tsx", "component.tsx"),
      add("package.json", "package.json"),
      add("README.md", "README.md"),
      add("tsconfig.json", "tsconfig.json"),
    ],
  })
}
