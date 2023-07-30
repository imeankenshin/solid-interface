import type { Meta, StoryObj } from "storybook-solidjs"
import Modal from "../src"

interface ModalForExampleProps {
  title: string
  description: string
  maxWidth: string
}
function ModalForExample({
  title,
  description,
  maxWidth,
}: ModalForExampleProps) {
  return (
    <Modal.Root>
      <Modal.Trigger class="rounded-lg bg-gray-300 px-3 py-2 hover:bg-gray-200 focus:bg-gray-200">
        Open Modal
      </Modal.Trigger>
      <Modal.Base class="fixed left-0 top-0 grid h-full w-full place-items-center">
        <Modal.Overlay class="absolute -z-10 h-full w-full bg-black/50" />
        <Modal.Content
          class="rounded-lg bg-white p-4"
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
  argTypes: {
    children: {
      control: {
        type: "text",
      },
    },
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
