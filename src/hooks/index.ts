/**
 * Hooks module exports.
 *
 * Provides custom React hooks for template building, content editing,
 * and dynamic CSS generation.
 */

export { useTemplateBuilder } from "./useTemplateBuilder";
export { useEditor } from "./useEditor";
export { useDynamicCss } from "./useDynamicCss";

// Separated editor hooks for granular control
export { useEditorState } from "./useEditorState";
export { useEditorSelection } from "./useEditorSelection";
export { useEditorHistory } from "./useEditorHistory";
