import type { Meta, StoryObj } from "storybook-solidjs"
import Modal from "../src"
import type { Component } from "solid-js"

interface ModalForExampleProperties {
  title: string
  description: string
  maxWidth: string
}

const ModalForExample: Component<ModalForExampleProperties> = ({
  title,
  description,
  maxWidth,
}) => {
  return (
    <Modal.Root>
      <Modal.Trigger class="rounded-lg bg-gray-300 px-4 py-3 text-base hover:bg-gray-200 focus:bg-gray-200">
        Open Modal
      </Modal.Trigger>
      <Modal.Base class="fixed inset-0 grid h-full w-full animate-fade-in place-items-center data-[status=open]:animate-fade-out">
        <Modal.Overlay class="absolute z-10 h-full w-full bg-black/30" />
        <Modal.Content
          class="z-20 w-full animate-scale-in rounded-2xl bg-white p-6 data-[open]:animate-scale-out"
          style={{ "max-width": maxWidth }}
        >
          <Modal.Title class="my-2 text-3xl font-bold">{title}</Modal.Title>
          {description && (
            <Modal.Description class="my-2">{description}</Modal.Description>
          )}
          <Modal.Closer>Close Modal</Modal.Closer>
        </Modal.Content>
      </Modal.Base>
    </Modal.Root>
  )
}

const meta = {
  title: "Example/Modal",
  component: ModalForExample,
  tags: ["autodocs"],
  argTypes: {
    maxWidth: { control: "text" },
  },
} as Meta<typeof ModalForExample>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: "Modal Title",
    description: "Modal Description",
    maxWidth: "640px",
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
