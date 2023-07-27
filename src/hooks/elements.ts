export function useFocusableElements<T extends HTMLElement>(ref: ParentNode) {
  return Array.from(
    ref.querySelectorAll<T>(
      "a, button, input, textarea, select, details, [tabindex]:not([tabindex='-1'])"
    )
  )
}
