import { JSX, createUniqueId } from "solid-js"
import ModalCore from "packages/components/modal"

interface ModalComponent {
  isOpen: boolean
  children: JSX.Element
  title: string
  description?: string
}

function Modal(props: ModalComponent) {
  const titleID = createUniqueId()
  const descriptionID = props.description ? createUniqueId() : ""
  return (
    <ModalCore.Root class="fixed left-0 top-0 grid h-full w-full place-items-center">
      <ModalCore.Overlay class="fixed inset-0 z-40 h-screen w-screen bg-black opacity-60" />
      <ModalCore.Content class="z-50 grid w-full max-w-lg gap-4 rounded-lg bg-white p-8">
        <ModalCore.Title id={titleID} class="text-4xl">
          {props.title}
        </ModalCore.Title>
        <Show when={props.description}>
          <ModalCore.Description id={descriptionID}>
            {props.description}
          </ModalCore.Description>
        </Show>
        {props.children}
      </ModalCore.Content>
    </ModalCore.Root>
  )
}

export default Modal
