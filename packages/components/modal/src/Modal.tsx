import {
  Accessor,
  Component,
  JSX,
  Show,
  createContext,
  createEffect,
  createSignal,
  createUniqueId,
  useContext,
} from "solid-js"
import { Portal } from "solid-js/web"
import { useFocusableElements } from "packages/hooks/src/elements"

/*------------------------------*/
/*    Context                   */
/*------------------------------*/

interface ModalContextProps {
  id: string
  open: Accessor<boolean>
  show: Accessor<true>
  close: Accessor<false>
}

const ModalContext = createContext<ModalContextProps>()

/*------------------------------*/
/*    Root                      */
/*------------------------------*/

interface ModalRootProps extends JSX.HTMLAttributes<HTMLDivElement> {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

/**
 * モーダルのルート要素
 * @param props
 */
const Root: Component<ModalRootProps> = (props) => {
  const [open, setOpen] = createSignal(false)
  const id = createUniqueId()

  return (
    <ModalContext.Provider
      value={{
        id,
        open,
        show: () => {
          return setOpen(true)
        },
        close: () => {
          return setOpen(false)
        },
      }}
    >
      {props.children}
    </ModalContext.Provider>
  )
}

/*------------------------------*/
/*    Portal                    */
/*------------------------------*/

interface ModalBaseProps extends JSX.HTMLAttributes<HTMLDivElement> {}

/**
 * モーダルをポータルでレンダリングするコンポーネント
 * @param props
 */

const Base: Component<ModalBaseProps> = (props) => {
  let dialogRef: HTMLDivElement
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error("ModalBase must be a descendant of Modal")
  }

  createEffect(() => {
    if (context.open()) {
      document.body.style.overflow = "hidden"

      // モーダル内のフォーカス可能な要素のうち、最初の要素にフォーカスを当てる
      const focusableElements = useFocusableElements(dialogRef)
      if (focusableElements.length > 0) {
        console.log(focusableElements[0])
        ;(focusableElements[0] as HTMLElement).focus()
      } else {
        console.warn("Modal must have at least one focusable child")
      }
      // モーダル外の要素を全てinertにする
      const ElementsOutsideModal = document.body.querySelectorAll(
        "body > *:not([data-status=open])"
      )
      ElementsOutsideModal.forEach((element) => {
        if (element !== dialogRef)
          (element as HTMLElement).setAttribute("inert", "")
      })
    } else {
      document.body.style.overflow = ""
      // モーダル内の要素以外を全てフォーカス可能にする
      const focusableElementsOutsideModal = document.body.querySelectorAll(
        "body > *:not([data-status=open])"
      )
      focusableElementsOutsideModal.forEach((element) => {
        ;(element as HTMLElement).removeAttribute("inert")
      })
    }
  }, [context.open()])

  return (
    <Show when={context.open()}>
      <Portal ref={(el) => (dialogRef = el)}>
        <div
          {...props}
          id={context.id}
          data-status={context.open() ? "open" : "closed"}
        >
          {props.children}
        </div>
      </Portal>
    </Show>
  )
}

/*------------------------------*/
/*    Overlay                   */
/*------------------------------*/

export interface ModalOverlayProps extends JSX.HTMLAttributes<HTMLDivElement> {}

/**
 * モーダルの背景を表すコンポーネント
 * @param props
 */
const Overlay: Component<ModalOverlayProps> = (props) => {
  return <div {...props} aria-hidden="true" />
}

/*------------------------------*/
/*    Content                   */
/*------------------------------*/

interface ModalContentProps extends JSX.HTMLAttributes<HTMLDivElement> {}

const Content = (props: ModalContentProps) => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error("ModalContent must be a descendant of Modal")
  }
  return (
    <div
      {...props}
      role="dialog"
      data-status={context?.open() ? "open" : "closed"}
      aria-labelledby={`title-${context.id}`}
      aria-describedby={`describe-${context.id}`}
    >
      {props.children}
    </div>
  )
}

/*------------------------------*/
/*    Title                     */
/*------------------------------*/

interface ModalTitleProps extends JSX.HTMLAttributes<HTMLHeadingElement> {}

const Title: Component<ModalTitleProps> = (props) => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error("ModalTitle must be a descendant of Modal")
  }
  return (
    <h2
      id={`title-${context.id}`}
      class={props.class}
      classList={props.classList}
    >
      {props.children}
    </h2>
  )
}

/*------------------------------*/
/*    Description               */
/*------------------------------*/

interface ModalDescriptionProps
  extends JSX.HTMLAttributes<HTMLParagraphElement> {}

const Description: Component<ModalDescriptionProps> = (props) => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error("ModalDescription must be a descendant of Modal")
  }
  return (
    <p {...props} id={`describe-${context.id}`}>
      {props.children}
    </p>
  )
}

export const useModalContext = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error("ModalContext is not provided")
  }
  return context
}

/*------------------------------*/
/*    Trigger                   */
/*------------------------------*/

interface ModalTriggerProps extends JSX.HTMLAttributes<HTMLButtonElement> {}

/**
 * モーダルを開くためのトリガーとなるコンポーネント
 */
const Trigger: Component<ModalTriggerProps> = (props) => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error("ModalTrigger must be a descendant of Modal")
  }
  return (
    <button
      {...props}
      onClick={() => {
        context.show()
      }}
    >
      {props.children}
    </button>
  )
}

/*------------------------------*/
/*    Closer                    */
/*------------------------------*/

interface ModalCloserProps extends JSX.HTMLAttributes<HTMLButtonElement> {}

/**
 * モーダルを閉じるためのトリガーとなるコンポーネント
 * @param props
 */
const Closer: Component<ModalCloserProps> = (props) => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error("ModalCloser must be a descendant of Modal")
  }
  return (
    <button
      {...props}
      onClick={() => {
        context.close()
      }}
    >
      {props.children}
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
