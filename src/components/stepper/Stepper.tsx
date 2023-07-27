import styles from "./Stepper.module.scss"

export type StepperProps = {
  steps: Array<string>
  currentStep: number
  orientation?: "horizontal" | "vertical"
}

export function Stepper(props: StepperProps) {
  return (
    <ol
      aria-label="Progress"
      aria-orientation={props.orientation || "horizontal"}
      data-value={props.currentStep}
      class={styles.root}
    >
      <For each={props.steps}>
        {(step, idx) => (
          <li
            class={
              styles.step +
              (idx() >= props.currentStep
                ? " before:bg-gray-300"
                : " before:bg-gray-900")
            }
          >
            <span
              class={`${styles.indicator} h-10 w-10 select-none rounded-full ${
                idx() >= props.currentStep
                  ? "bg-gray-300 text-black"
                  : "bg-gray-900 text-white"
              }`}
            >
              {idx() + 1}
            </span>
            <p class="hello relative mx-4">{step}</p>
          </li>
        )}
      </For>
    </ol>
  )
}
