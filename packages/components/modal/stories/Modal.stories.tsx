import type { Meta, StoryObj } from "storybook-solidjs"
import Modal from "../src"

function ModalForExample() {
  return (
    <Modal.Root>
      <Modal.Trigger>Open Modal</Modal.Trigger>
      <Modal.Base>
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Closer>Close Modal</Modal.Closer>
          <div>Modal Content</div>
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
    children: "Modal",
  },
}
