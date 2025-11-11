// Full builder export
export { default as TemplateBuilder } from "./components/layout/TemplateBuilder";

// Modular component exports
export { default as Nav } from "./components/layout/Nav";
export { default as LeftSidebar } from "./components/layout/LeftSidebar";
export { default as ContentEditor } from "./components/layout/ContentEditor";
export { default as RightSidebar } from "./components/layout/RightSidebar";

// Hooks
export { useTemplateBuilder, useEditor } from "./hooks";

// Context
export { GlobalStateProvider, useGlobalState } from "./context/GlobalState";
export type { EmailStyles } from "./context/GlobalState";

// Types
export type * from "./types";
