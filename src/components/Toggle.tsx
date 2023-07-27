export interface BuiToggle {
  id?: string
  children?: string
  defaultChecked?: boolean
}


export function Toggle(props: BuiToggle) {
  const [checked, setChecked] = createSignal(props.defaultChecked)
  return (
    <div class="inline-flex items-center justify-between gap-8">
      <label for={props.id}>{props.children}</label>
      <button
        id={props.id}
        onClick={() => {
          setChecked((i) => !i)
        }}
        aria-checked={checked()}
        role="switch"
        class="group inline-grid h-8 w-12 cursor-pointer select-none rounded-full bg-gray-400 p-0.5 outline-none ring-blue-500 transition-all focus:ring-2 aria-checked:bg-black [&>span]:aria-checked:translate-x-4"
      >
        <span class="grid h-7 w-7 rounded-full bg-white transition-all" />
      </button>
    </div>
  )
}
