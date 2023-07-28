import { Accessor, JSX, createUniqueId } from "solid-js"
import { useFocusableElements } from "~/hooks/elements"

/*------------------------------*/
/*    Context                   */
/*------------------------------*/

interface ModalContextProps {
  titleID: string
  descriptionID: string
  open: Accessor<boolean>
  show: Accessor<true>
  close: Accessor<false>
}

const ModalContext = createContext<ModalContextProps>()

/*------------------------------*/
/*    Root                      */
/*------------------------------*/

interface ModalRootProps extends JSX.HTMLAttributes<HTMLDivElement> {}

/**
 * モーダルのルート要素
 * @param props
 * @returns {JSX.Element}
 */
const Root = (props: ModalRootProps): JSX.Element => {
  let dialogRef: HTMLDivElement
  const [open, setOpen] = createSignal(false)
  const id = createUniqueId()
  const titleID = `title-${id}`
  const descriptionID = `description-${id}`

  createEffect(() => {
    if (open()) {
      document.body.style.overflow = "hidden"

      // モーダル内のフォーカス可能な要素のうち、最初の要素にフォーカスを当てる
      const focusableElements = useFocusableElements(dialogRef)
      if (focusableElements.length > 0) {
        ;(focusableElements[0] as HTMLElement).focus()
      } else {
        console.warn("Modal must have at least one focusable child")
      }
      // モーダル内の要素以外を全てフォーカス不可にする
      const focusableElementsOutsideModal = useFocusableElements(document.body)
      focusableElementsOutsideModal.forEach((element) => {
        if (!dialogRef.contains(element)) {
          console.log(element)
          ;(element as HTMLElement).setAttribute("tabindex", "-1")
        }
      })
    } else {
      document.body.style.overflow = ""
      // モーダル内の要素以外を全てフォーカス可能にする
      const focusableElementsOutsideModal = useFocusableElements(document.body)
      focusableElementsOutsideModal.forEach((element) => {
        ;(element as HTMLElement).removeAttribute("tabindex")
      })
    }
  }, [open()])

  return (
    <ModalContext.Provider
      value={{
        titleID,
        descriptionID,
        open,
        show: () => setOpen(true),
        close: () => setOpen(false),
      }}
    >
      <Show when={open()}>
        <Portal>
          <div
            {...props}
            id={id}
            ref={(el) => (dialogRef = el)}
            data-status={open() ? "open" : "closed"}
          >
            {props.children}
          </div>
        </Portal>
      </Show>
    </ModalContext.Provider>
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
const Overlay = (props: ModalOverlayProps) => {
  return <div {...props} aria-hidden="true" />
}

/*------------------------------*/
/*    Content                   */
/*------------------------------*/

interface ModalContentProps extends JSX.HTMLAttributes<HTMLDivElement> {}

const Content = (props: ModalContentProps) => {
  const context = useContext(ModalContext)
  return (
    <div
      {...props}
      role="dialog"
      tabIndex={-1}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          e.stopPropagation()
          e.preventDefault()
        }
      }}
      data-status={context?.open() ? "open" : "closed"}
      aria-labelledby={context?.titleID}
      aria-describedby={context?.descriptionID}
    >
      {props.children}
    </div>
  )
}

/*------------------------------*/
/*    Title                     */
/*------------------------------*/

interface ModalTitleProps extends JSX.HTMLAttributes<HTMLHeadingElement> {}

const Title = (props: ModalTitleProps) => {
  const context = useContext(ModalContext)
  return (
    <h2 id={context?.titleID} class={props.class} classList={props.classList}>
      {props.children}
    </h2>
  )
}

/*------------------------------*/
/*    Description               */
/*------------------------------*/

interface ModalDescriptionProps
  extends JSX.HTMLAttributes<HTMLParagraphElement> {}

const Description = (props: ModalDescriptionProps) => {
  const context = useContext(ModalContext)
  return <p id={context?.descriptionID}>{props.children}</p>
}

export const useModalContext = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error("ModalContext is not provided")
  }
  return context
}

export default { Overlay, Root, Content, Title, Description }
