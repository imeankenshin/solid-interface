import type { PlopTypes } from "@turbo/gen"

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  // create a generator
  plop.setGenerator("component", {
    description: "Create a new component",
    // gather information from the user
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Component name",
      },
    ],
    // perform actions based on the prompts
    actions: [
      {
        type: "add",
        path: "packages/components/turbo/src/{{name}}/{{name}}.tsx",
        templateFile:
          "packages/components/turbo/generator/templates/component.tsx.hbs",
      },
    ],
  })
}
