import { Title } from "solid-start"
import { Button } from "~/components/Button"
import Modal from "packages/components/modal/src"
import { Toggle } from "~/components/Toggle"

export default () => {
  const [open, setOpen] = createSignal(false)
  return (
    <main class="px-4">
      <Title>iDid.</Title>
      <Modal.Root>
        <section class="grid h-screen place-items-center">
          <div class="grid w-full max-w-md content-center gap-48">
            <hgroup class="grid justify-items-center gap-2">
              <h1>iDid.</h1>
              <h2>List the things you did.</h2>
            </hgroup>
            <Modal.Trigger>Get started</Modal.Trigger>
          </div>
        </section>
        <Modal.Base class="fixed left-0 top-0 grid h-full w-full place-items-center p-4">
          <Modal.Overlay class="fixed -z-10 h-full w-full bg-black/50" />
          <Modal.Content tabIndex={-1} class="max-w-md rounded-xl bg-white p-4">
            <Modal.Title class="my-2 text-3xl">Modal title</Modal.Title>
            <Modal.Description class="mb-2 text-black/50">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              voluptatibus.
            </Modal.Description>
            <div class="flex justify-end gap-2">
              <Button variant="primary">Accept</Button>
              <Modal.Closer class="rounded-lg px-4 py-3">Cancel</Modal.Closer>
            </div>
          </Modal.Content>
        </Modal.Base>
      </Modal.Root>
      <section id="aa" class="grid max-w-sm rounded-xl border-2 p-4">
        <Toggle>Hello world</Toggle>
        <fieldset>
          <div class="flex items-center gap-3">
            <input name="hello" type="radio" value="hello" />
            <label>hello</label>
          </div>
          <div class="flex items-center gap-3">
            <input name="hello" type="radio" value="hello" />
            <label>hello</label>
          </div>
          <div class="flex items-center gap-3">
            <input name="hello" type="radio" value="hello" />
            <label>hello</label>
          </div>
        </fieldset>
      </section>
    </main>
  )
}
function createSignal(arg0: boolean): [any, any] {
  throw new Error("Function not implemented.")
}
