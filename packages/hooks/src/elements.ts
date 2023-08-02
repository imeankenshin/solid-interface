export function useFocusableElements<T extends HTMLElement>(
  reference: ParentNode
) {
  return [
    ...reference.querySelectorAll<T>(
      "a, button, input, textarea, select, details, [tabindex]:not([tabindex='-1'])"
    ),
  ]
}
