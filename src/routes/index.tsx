import { Title } from "solid-start"
import { Button } from "~/components/Button"
import Modal from "~/components/Modal"
import { Toggle } from "~/components/Toggle"

export default () => {
  const [open, setOpen] = createSignal(false)
  return (
    <main class="px-4">
      <Title>iDid.</Title>
      <section class="grid h-screen place-items-center">
        <div class="grid w-full max-w-md content-center gap-48">
          <hgroup class="grid justify-items-center gap-2">
            <h1>iDid.</h1>
            <h2>List the things you did.</h2>
          </hgroup>
          <Button variant="primary" onClick={() => setOpen(true)}>
            Get started
          </Button>
          <Modal
            title="Log in"
            description="Enter your email and password."
            isOpen={open()}
          >
            <form class="grid">
              <label for="email" class="mb-2">
                Email
              </label>
              <input
                id="email"
                placeholder="name@example.com"
                class="rounded-lg bg-gray-200 p-3"
                type="mail"
                name="mail"
              />
            </form>
            <div class="grid">
              <label for="a" class="mb-2">
                Password
              </label>
              <input
                id="a"
                class="rounded-lg bg-gray-200 p-3"
                type="password"
                name="password"
              />
            </div>
            <Button variant="primary" onClick={() => setOpen(false)}>
              Close
            </Button>
          </Modal>
        </div>
      </section>
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
