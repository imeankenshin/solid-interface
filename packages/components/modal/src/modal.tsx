import {
  Component,
  Show,
  createContext,
  createEffect,
  createSignal,
  createUniqueId,
  useContext,
} from "solid-js"
import type { Accessor, Setter, JSX } from "solid-js"
import { Portal } from "solid-js/web"
import { useFocusableElements } from "@solid-interface/hooks"

/*------------------------------*/
/*    Context                   */
/*------------------------------*/

interface ModalContextProperties {
  id: string
  open: Accessor<boolean>
  setOpen: Setter<boolean>
}

const ModalContext = createContext<ModalContextProperties>()

export const useModalContext = () => {
  const context = useContext(ModalContext)
  return context
}

/*------------------------------*/
/*    Root                      */
/*------------------------------*/

interface ModalRootProperties extends JSX.HTMLAttributes<HTMLDivElement> {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

/**
 * モーダルのルート要素
 * @param props
 */
const Root: Component<ModalRootProperties> = (properties) => {
  const [open, setOpen] = createSignal(false)
  const id = createUniqueId()

  return (
    <ModalContext.Provider
      value={{
        id,
        open,
        setOpen,
      }}
    >
      {properties.children}
    </ModalContext.Provider>
  )
}

/*------------------------------*/
/*    Portal                    */
/*------------------------------*/

interface ModalBaseProperties extends JSX.HTMLAttributes<HTMLDivElement> {}
/**
 * モーダルをポータルでレンダリングするコンポーネント
 * @param props
 */

const Base: Component<ModalBaseProperties> = (properties) => {
  let dialogReference: HTMLDivElement
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error("ModalBase must be a descendant of Modal")
  }

  createEffect(() => {
    if (context.open()) {
      document.body.style.overflow = "hidden"

      // モーダル内のフォーカス可能な要素のうち、最初の要素にフォーカスを当てる
      const focusableElements = useFocusableElements(dialogReference)
      if (focusableElements.length > 0) {
        ;(focusableElements[0] as HTMLElement).focus()
      } else {
        throw new Error("Modal must have at least one focusable child")
      }
      // モーダル外の要素を全てinertにする
      const ElementsOutsideModal = document.body.querySelectorAll<HTMLElement>(
        "body > *:not([data-status=open])"
      )
      for (const element of ElementsOutsideModal) {
        if (element !== dialogReference) element.setAttribute("inert", "")
      }
    } else {
      document.body.style.overflow = ""
      // モーダル内の要素以外を全てフォーカス可能にする
      const focusableElementsOutsideModal =
        document.body.querySelectorAll<HTMLElement>(
          "body > *:not([data-status=open])"
        )
      for (const element of focusableElementsOutsideModal) {
        element.removeAttribute("inert")
      }
    }
  })

  return (
    <Show when={context.open()}>
      <Portal ref={(element) => (dialogReference = element)}>
        <div {...properties} id={context.id} data-open={context.open()}>
          {properties.children}
        </div>
      </Portal>
    </Show>
  )
}

/*------------------------------*/
/*    Overlay                   */
/*------------------------------*/

export interface ModalOverlayProperties
  extends JSX.HTMLAttributes<HTMLDivElement> {}

/**
 * モーダルの背景を表すコンポーネント
 * @param props
 */
const Overlay: Component<ModalOverlayProperties> = (properties) => {
  return <div {...properties} aria-hidden="true" />
}

/*------------------------------*/
/*    Content                   */
/*------------------------------*/

interface ModalContentProperties extends JSX.HTMLAttributes<HTMLDivElement> {}

const Content = (properties: ModalContentProperties) => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error("ModalContent must be a descendant of Modal")
  }
  return (
    <div
      {...properties}
      role="dialog"
      data-status={context?.open() ? "open" : "closed"}
      aria-labelledby={`title-${context.id}`}
      aria-describedby={`describe-${context.id}`}
    >
      {properties.children}
    </div>
  )
}

/*------------------------------*/
/*    Title                     */
/*------------------------------*/

interface ModalTitleProperties extends JSX.HTMLAttributes<HTMLHeadingElement> {}

const Title: Component<ModalTitleProperties> = (properties) => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error("ModalTitle must be a descendant of Modal")
  }
  return (
    <h2
      id={`title-${context.id}`}
      class={properties.class}
      classList={properties.classList}
    >
      {properties.children}
    </h2>
  )
}

/*------------------------------*/
/*    Description               */
/*------------------------------*/

interface ModalDescriptionProperties
  extends JSX.HTMLAttributes<HTMLParagraphElement> {}

const Description: Component<ModalDescriptionProperties> = (properties) => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error("ModalDescription must be a descendant of Modal")
  }
  return (
    <p {...properties} id={`describe-${context.id}`}>
      {properties.children}
    </p>
  )
}

/*------------------------------*/
/*    Trigger                   */
/*------------------------------*/

interface ModalTriggerProperties
  extends JSX.HTMLAttributes<HTMLButtonElement> {}

/**
 * モーダルを開くためのトリガーとなるコンポーネント
 */
const Trigger: Component<ModalTriggerProperties> = (properties) => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error("ModalTrigger must be a descendant of Modal")
  }
  return (
    <button
      {...properties}
      onClick={() => {
        context.setOpen(true)
      }}
    >
      {properties.children}
    </button>
  )
}

/*------------------------------*/
/*    Closer                    */
/*------------------------------*/

interface ModalCloserProperties extends JSX.HTMLAttributes<HTMLButtonElement> {}

/**
 * モーダルを閉じるためのトリガーとなるコンポーネント
 * @param props
 */
const Closer: Component<ModalCloserProperties> = (properties) => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error("ModalCloser must be a descendant of Modal")
  }
  return (
    <button
      {...properties}
      onClick={() => {
        context.setOpen(false)
      }}
    >
      {properties.children}
    </button>
  )
}

/*------------------------------*/
/*    Export                    */
/*------------------------------*/

export default {
  Overlay,
  Closer,
  Trigger,
  Root,
  Base,
  Content,
  Title,
  Description,
}
