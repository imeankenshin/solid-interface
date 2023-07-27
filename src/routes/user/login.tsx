import { Title } from "solid-start"
import { Button } from "~/components/Button"
import { Modal } from "~/components/Modal"
import { Stepper } from "~/components/stepper/Stepper"
import { Toggle } from "~/components/Toggle"

export default () => {
  return (
    <main class="grid h-screen place-items-center">
      <Title>iDid.</Title>
      <form class="grid w-full max-w-lg gap-4 border-2 p-6">
        <h1>Log in</h1>
        <div>
          <label>hello</label>
          <input type="email" name="email" />
        </div>
        <div>
          <label>hello</label>
          <input type="password" name="password" />
        </div>
      </form>
    </main>
  )
}
