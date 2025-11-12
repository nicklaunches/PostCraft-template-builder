import { ReactNode } from "react";
import { EmailStylesProvider } from "./EmailStylesContext";
import { BlockStylesProvider } from "./BlockStylesContext";
import { EditorProvider } from "./EditorContext";

/**
 * Global state provider that composes email styles, block styles, and editor contexts.
 *
 * This provider nests all three specialized context providers to maintain a single
 * entry point for the application state. Components should use the individual context
 * hooks for optimal performance:
 * - `useEmailStyles()` for email-wide styling
 * - `useBlockStyles()` for block-specific styling
 * - `useEditorContext()` for editor instance
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
