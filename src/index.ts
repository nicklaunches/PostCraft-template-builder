// Full builder export
export { default as TemplateBuilder } from "./components/layout/TemplateBuilder";

// Modular component exports
export { default as Nav } from "./components/layout/Nav";
export { default as LeftSidebar } from "./components/layout/LeftSidebar";
export { default as ContentEditor } from "./components/layout/ContentEditor";
export { default as RightSidebar } from "./components/layout/RightSidebar";

// Hooks
export { useTemplateBuilder, useEditor } from "./hooks";

// Types
export type * from "./types";
