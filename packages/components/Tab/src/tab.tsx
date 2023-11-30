import {
  type JSX,
  type Signal,
  createContext,
  createSignal,
  useContext,
} from "solid-js";

type Stylable = {
  class: string;
  classList: Record<string, boolean | undefined>;
  style: string | JSX.CSSProperties;
};

type TabsField = Partial<Stylable> & {
  children: JSX.Element;
  defaultValue: string;
};
type TabListProps = Partial<Stylable> & {
  children: JSX.ArrayElement;
  orientation?: "horizontal" | "vertical";
};
type TabProps = Partial<Stylable> & {
  disabled?: boolean;
  children: JSX.Element;
  value: string;
};
type TabContentProps = Partial<Stylable> & {
  children: JSX.Element;
  value: string;
};

const tabContext = createContext<[...Signal<string>, string]>();
function useTabContext() {
  const context = useContext(tabContext);
  if (!context)
    throw new Error(
      "Tab compound components cannot be rendered outside the Tabs component"
    );
  return context;
}

export function TabField(props: TabsField) {
  const [selected, setSelected] = createSignal(props.defaultValue);
  const id = Math.random().toString(36).substring(2);
  return (
    <tabContext.Provider value={[selected, setSelected, id]}>
      <div classList={props.classList} style={props.style} class={props.class}>
        {props.children}
      </div>
    </tabContext.Provider>
  );
}

export function TabList(props: TabListProps) {
  const focusableElements =
    ":is(button, [href], input, select, textarea):not([disabled])";
  return (
    <div
      classList={props.classList}
      style={props.style}
      onKeyDown={(event) => {
        const list = event.currentTarget;
        const tabs =
          list.querySelectorAll<HTMLButtonElement>(focusableElements);
        const index = Array.from(tabs).indexOf(
          event.target as HTMLButtonElement
        );
        const prevKey =
          props.orientation === "vertical" ? "ArrowUp" : "ArrowLeft";
        const nextKey =
          props.orientation === "vertical" ? "ArrowDown" : "ArrowRight";
        let nextIndex = index;

        switch ([event.key, index].toString()) {
          case [nextKey, tabs.length - 1].toString():
            nextIndex = 0;
            break;
          case [prevKey, 0].toString():
            nextIndex = tabs.length - 1;
            break;
          case [nextKey, index].toString():
            nextIndex++;
            break;
          case [prevKey, index].toString():
            nextIndex--;
            break;
          default:
            return;
        }
        event.preventDefault();
        if (!tabs[nextIndex].focus) throw new Error("Tab not focusable");
        tabs[nextIndex].focus();
        tabs[nextIndex].click();
      }}
      role="tablist"
      aria-orientation={props.orientation || "horizontal"}
      class={props.class}
    >
      {props.children}
    </div>
  );
}

export function Tab(props: TabProps) {
  const [selected, setSelected, id] = useTabContext();
  return (
    <button
      classList={props.classList}
      style={props.style}
      role="tab"
      disabled={props.disabled}
      id={`tab:${id}:${props.value}`}
      aria-controls={`panel:${id}:${props.value}`}
      tabIndex={selected() === props.value ? 0 : -1}
      aria-selected={selected() === props.value}
      class={props.class}
      onClick={() => setSelected(() => props.value)}
    >
      {props.children}
    </button>
  );
}

export function TabPanel(props: TabContentProps) {
  const [selected, , id] = useTabContext();
  return (
    <div
      classList={props.classList}
      style={props.style}
      role="tabpanel"
      id={`panel:${id}:${props.value}`}
      aria-aria-labelledby={`tab:${id}:${props.value}`}
      hidden={selected() !== props.value}
      class={props.class}
    >
      {props.children}
    </div>
  );
}

const Tabs = {
  Field: TabField,
  List: TabList,
  Tab,
  Panel: TabPanel,
} as const;

export default Tabs;
