import type { Meta, StoryObj } from "storybook-solidjs"
import { within } from "@storybook/testing-library"
import { ModalForExample } from "./modal-example"

const meta = {
  title: "Example/Modal",
  component: ModalForExample,
  tags: ["autodocs"],
  argTypes: {
    maxWidth: { control: "text" },
    radius: {
      control: {
        type: "select",
      },
      options: ["none", "sm", "md", "lg", "xl", "2xl", "3xl", "full"],
    },
  },
  parameters: {},
  decorators: [
    (Story) => (
      <div class="flex items-center justify-center">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ModalForExample>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: "Modal Title",
    description: "Modal Description",
    maxWidth: "640px",
    radius: "md",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = await canvas.findByText("Open Modal")
    trigger.click()
  },
}

export const NoDescription: Story = {
  args: {
    title: "Modal Title",
    description: "",
    maxWidth: "640px",
  },
}

export const NoMaxWidth: Story = {
  args: {
    title: "Modal Title",
    description:
      "Quick brown fox jumps over the lazy dog. Quick brown fox jumps over the lazy dog. Quick brown fox jumps over the lazy dog. Quick brown fox jumps over the lazy dog.",
    maxWidth: "",
  },
}
