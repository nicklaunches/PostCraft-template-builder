import { ReactNode } from "react";
import { EmailStylesProvider, useEmailStyles } from "./EmailStylesContext";
import { BlockStylesProvider, useBlockStyles } from "./BlockStylesContext";
import { EditorProvider, useEditorContext } from "./EditorContext";

/**
 * Combined global state type from all context providers.
 *
 * This aggregates email styles, block styles, and editor contexts into a single
 * interface for backwards compatibility with existing components.
 *
 * @property {EmailStyles} emailStyles - Current email styling configuration
 * @property {<K extends keyof EmailStyles>(key: K, value: EmailStyles[K]) => void} updateEmailStyle - Update a specific style property
 * @property {() => void} resetEmailStyles - Reset all styles to defaults
 * @property {BlockStylesMap} blockStylesMap - Map of block IDs to their style configurations
 * @property {(blockId: string) => BlockStyles} getBlockStyles - Get styles for a specific block (returns defaults if not found)
 * @property {(blockId: string, key: keyof BlockStyles, value: BlockStyles[keyof BlockStyles]) => void} updateBlockStyle - Update a specific style property for a block
 * @property {(blockId: string) => void} deleteBlockStyles - Remove styles for a specific block
 * @property {() => void} resetAllBlockStyles - Reset all block styles
 * @property {string | null} selectedBlockId - Currently selected block ID
 * @property {(blockId: string | null) => void} setSelectedBlockId - Set the currently selected block ID
 * @property {Editor | null} editor - TipTap editor instance
 * @property {(editor: Editor | null) => void} setEditor - Set the TipTap editor instance
 */
interface GlobalStateContextType {
    // Email styles
    emailStyles: ReturnType<typeof useEmailStyles>["emailStyles"];
    updateEmailStyle: ReturnType<typeof useEmailStyles>["updateEmailStyle"];
    resetEmailStyles: ReturnType<typeof useEmailStyles>["resetEmailStyles"];
    // Block styles
    blockStylesMap: ReturnType<typeof useBlockStyles>["blockStylesMap"];
    getBlockStyles: ReturnType<typeof useBlockStyles>["getBlockStyles"];
    updateBlockStyle: ReturnType<typeof useBlockStyles>["updateBlockStyle"];
    deleteBlockStyles: ReturnType<typeof useBlockStyles>["deleteBlockStyles"];
    resetAllBlockStyles: ReturnType<typeof useBlockStyles>["resetAllBlockStyles"];
    setDefaultBlockStyles: ReturnType<typeof useBlockStyles>["setDefaultBlockStyles"];
    selectedBlockId: ReturnType<typeof useBlockStyles>["selectedBlockId"];
    setSelectedBlockId: ReturnType<typeof useBlockStyles>["setSelectedBlockId"];
    // Editor
    editor: ReturnType<typeof useEditorContext>["editor"];
    setEditor: ReturnType<typeof useEditorContext>["setEditor"];
}

/**
 * Global state provider that composes email styles, block styles, and editor contexts.
 *
 * This provider nests all three specialized context providers to maintain a single
 * entry point for the application state. Components can use either the unified
 * `useGlobalState` hook or the individual context hooks for more granular subscriptions.
 *
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child components to wrap
 * @returns {JSX.Element} Composed provider component
 *
 * @example
 * <GlobalStateProvider>
 *   <App />
 * </GlobalStateProvider>
 */
export function GlobalStateProvider({ children }: { children: ReactNode }) {
    return (
        <EmailStylesProvider>
            <BlockStylesProvider>
                <EditorProvider>{children}</EditorProvider>
            </BlockStylesProvider>
        </EmailStylesProvider>
    );
}

/**
 * Hook to access all global state contexts in a single object.
 *
 * This hook combines the three specialized contexts (email styles, block styles,
 * and editor) into a single return object for backwards compatibility. For better
 * performance, consider using the individual context hooks instead:
 * - `useEmailStyles()` for email-wide styling
 * - `useBlockStyles()` for block-specific styling
 * - `useEditorContext()` for editor instance
 *
 * @returns {GlobalStateContextType} Combined global state value
 * @throws {Error} If used outside of GlobalStateProvider
 *
 * @example
 * const { emailStyles, updateBlockStyle, editor } = useGlobalState();
 */
export function useGlobalState(): GlobalStateContextType {
    const emailStylesContext = useEmailStyles();
    const blockStylesContext = useBlockStyles();
    const editorContext = useEditorContext();

    return {
        ...emailStylesContext,
        ...blockStylesContext,
        ...editorContext,
    };
}
