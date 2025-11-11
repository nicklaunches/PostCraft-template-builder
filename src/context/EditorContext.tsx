import { createContext, useContext, useState, ReactNode } from "react";
import type { Editor } from "@tiptap/react";

/**
 * Editor context type definition.
 *
 * @property {Editor | null} editor - TipTap editor instance
 * @property {(editor: Editor | null) => void} setEditor - Set the TipTap editor instance
 */
interface EditorContextType {
    editor: Editor | null;
    setEditor: (editor: Editor | null) => void;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

/**
 * Editor provider component.
 *
 * Manages the TipTap editor instance state, allowing components throughout
 * the application to access and control the editor. The editor instance is
 * typically set once when the editor component mounts and used by various
 * UI components to trigger editor commands and read editor state.
 *
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child components to wrap
 * @returns {JSX.Element} Provider component
 *
 * @example
 * <EditorProvider>
 *   <YourComponent />
 * </EditorProvider>
 */
export function EditorProvider({ children }: { children: ReactNode }) {
    const [editor, setEditor] = useState<Editor | null>(null);

    return (
        <EditorContext.Provider value={{ editor, setEditor }}>{children}</EditorContext.Provider>
    );
}

/**
 * Hook to access editor context.
 *
 * Provides access to the TipTap editor instance and the function to set it.
 * Must be used within an EditorProvider component.
 *
 * @returns {EditorContextType} Editor context value
 * @throws {Error} If used outside of EditorProvider
 *
 * @example
 * const { editor, setEditor } = useEditor();
 * if (editor) {
 *   editor.chain().focus().toggleBold().run();
 * }
 */
export function useEditorContext() {
    const context = useContext(EditorContext);
    if (context === undefined) {
        throw new Error("useEditorContext must be used within an EditorProvider");
    }
    return context;
}
