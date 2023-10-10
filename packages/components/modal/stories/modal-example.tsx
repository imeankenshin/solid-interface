import Modal from "../src"
import type { Component } from "solid-js"

interface ModalForExampleProperties {
  title: string
  description: string
  radius: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full"
  maxWidth: string
}

export const ModalForExample: Component<ModalForExampleProperties> = (
  properties
) => {
  return (
    <Modal.Root>
      <Modal.Trigger class="rounded-lg bg-gray-300 px-4 py-3 text-base hover:bg-gray-200 focus:bg-gray-200">
        Open Modal
      </Modal.Trigger>
      <Modal.Base class="fixed inset-0 grid h-full w-full animate-fade-in place-items-center data-[status=open]:animate-fade-out">
        <Modal.Overlay class="absolute z-10 h-full w-full bg-black/30" />
        <Modal.Content
          class="z-20 w-full animate-scale-in bg-white p-6 data-[open]:animate-scale-out"
          classList={{
            "rounded-none": properties.radius === "none",
            "rounded-sm": properties.radius === "sm",
            "rounded-md": properties.radius === "md",
            "rounded-lg": properties.radius === "lg",
            "rounded-xl": properties.radius === "xl",
            "rounded-2xl": properties.radius === "2xl",
            "rounded-3xl": properties.radius === "3xl",
            "rounded-full": properties.radius === "full",
          }}
          style={{ "max-width": properties.maxWidth }}
        >
          <Modal.Title class="my-2 text-3xl font-bold">
            {properties.title}
          </Modal.Title>
          {properties.description && (
            <Modal.Description class="my-2">
              {properties.description}
            </Modal.Description>
          )}
          <Modal.Closer>Close Modal</Modal.Closer>
        </Modal.Content>
      </Modal.Base>
    </Modal.Root>
  )
}
