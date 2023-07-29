import { JSX } from "solid-js"

export interface BuiButton {
  children: JSX.Element
  variant?: "primary" | "secondary" | "teritary"
  destructive?: boolean
  disabled?: boolean
  link?: boolean
  href?: string
  size?: "small" | "medium" | "large"
  onClick?: JSX.EventHandler<HTMLButtonElement, MouseEvent>
}

export function Button({
  children,
  variant,
  size,
  destructive,
  disabled,
  link,
  href,
  onClick,
}: BuiButton) {
  if (link)
    return (
      <a
        link
        href={href}
        classList={{
          //* variant
          "bg-black hover:bg-gray-900 active:bg-gray-800": variant == "primary", // primary
          "bg-red-500": variant == "primary" && destructive && !disabled, // primary(destructive)

          "bg-gray-200 hover:bg-gray-300 active:bg-gray-400":
            variant == "secondary" && !disabled, // secondary
          "bg-transparent hover:bg-gray-100 active:bg-gray-200":
            variant == "teritary" && !disabled, // teritary
          //* boolean
          "bg-gray-100 cursor-not-allowed": disabled, // disabled
          //* sizing
          "px-4 py-3": size == "small",
          "px-4 py-3.5": size == "medium" || !size,
          "px-5 py-4": size == "large",
        }}
        class="inline-grid gap-2 rounded-lg outline-blue-500 duration-100 focus:outline-4"
      >
        <span
          classList={{
            "text-gray-500": disabled,
            "text-white": variant == "primary",
            "text-red-500": variant == "secondary" && destructive,
            "text-sm": size == "small",
            "text-base": size == "medium" || !size,
            "text-lg": size == "large",
          }}
          class="text-center"
        >
          {children}
        </span>
      </a>
    )

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      classList={{
        //* variant
        "bg-black hover:bg-gray-900 active:bg-gray-800": variant == "primary", // primary
        "bg-red-500": variant == "primary" && destructive && !disabled, // primary(destructive)

        "bg-gray-200 hover:bg-gray-300 active:bg-gray-400":
          variant == "secondary" && !disabled, // secondary
        "bg-transparent hover:bg-gray-100 active:bg-gray-200":
          variant == "teritary" && !disabled, // teritary
        //* boolean
        "bg-gray-100 cursor-not-allowed": disabled, // disabled
        //* sizing
        "px-4 py-3": !size,
        "px-5 py-4": size == "large",
      }}
      class="inline-flex items-center gap-2 rounded-lg outline-blue-500 duration-100 focus:outline-4"
    >
      <span
        classList={{
          "text-gray-500": disabled,
          "text-white": variant == "primary",
          "text-red-500": variant == "secondary" && destructive,
          "text-sm": size == "small",
          "text-base": size == "medium" || !size,
          "text-lg": size == "large",
        }}
      >
        {children}
      </span>
    </button>
  )
}
