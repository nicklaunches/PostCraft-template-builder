/**
 * Hooks module exports.
 *
 * Provides custom React hooks for template building, content editing,
 * and dynamic CSS generation.
 */

export { useTemplateBuilder } from "./useTemplateBuilder";
export { useEditor } from "./useEditor";
export { useDynamicCss } from "./useDynamicCss";

// Re-export types for convenience
export type { TemplateData } from "@/types";
