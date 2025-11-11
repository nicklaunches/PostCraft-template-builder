import { createContext, useContext, useState, ReactNode } from "react";
import type { Editor } from "@tiptap/react";
import type { BlockStyles, BlockStylesMap } from "@/types";

/**
 * Email styling configuration interface.
 *
 * @property {string} [className] - Unique CSS class name for the template
 * @property {string} font - Primary font family
 * @property {string} fallback - Fallback font family
 * @property {{ horizontal: number; vertical: number }} padding - Inner spacing
 * @property {string} bodyColor - Text color (hex)
 * @property {{ horizontal: number; vertical: number }} margin - Outer spacing
 * @property {string} backgroundColor - Page background color (hex)
 * @property {string} contentBackgroundColor - Content container background color (hex)
 * @property {number} radius - Border radius in pixels
 * @property {number} borderWidth - Border width in pixels
 * @property {string} borderColor - Border color (hex)
 */
export interface EmailStyles {
    className?: string;
    font: string;
    fallback: string;
    padding: { horizontal: number; vertical: number };
    bodyColor: string;
    margin: { horizontal: number; vertical: number };
    backgroundColor: string;
    contentBackgroundColor: string;
    radius: number;
    borderWidth: number;
    borderColor: string;
}

/**
 * Global state context type definition.
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
    emailStyles: EmailStyles;
    updateEmailStyle: <K extends keyof EmailStyles>(key: K, value: EmailStyles[K]) => void;
    resetEmailStyles: () => void;
    blockStylesMap: BlockStylesMap;
    getBlockStyles: (blockId: string) => BlockStyles;
    updateBlockStyle: (
        blockId: string,
        key: keyof BlockStyles,
        value: BlockStyles[keyof BlockStyles]
    ) => void;
    deleteBlockStyles: (blockId: string) => void;
    resetAllBlockStyles: () => void;
    selectedBlockId: string | null;
    setSelectedBlockId: (blockId: string | null) => void;
    editor: Editor | null;
    setEditor: (editor: Editor | null) => void;
}

const defaultEmailStyles: EmailStyles = {
    font: "Inter",
    fallback: "sans-serif",
    padding: { horizontal: 24, vertical: 12 },
    bodyColor: "",
    margin: { horizontal: 0, vertical: 24 },
    backgroundColor: "#f3f4f6",
    contentBackgroundColor: "",
    radius: 0,
    borderWidth: 0,
    borderColor: "",
};

const defaultBlockStyles: BlockStyles = {
    alignment: "left",
    borderWidth: 0,
    padding: { horizontal: 0, vertical: 0 },
    backgroundColor: "",
};

const GlobalStateContext = createContext<GlobalStateContextType | undefined>(undefined);

/**
 * Global state provider component.
 *
 * Provides access to global email styling configuration, per-block styles,
 * and update methods throughout the component tree via React context.
 *
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child components to wrap
 * @returns {JSX.Element} Provider component
 */
export function GlobalStateProvider({ children }: { children: ReactNode }) {
    const [emailStyles, setEmailStyles] = useState<EmailStyles>(defaultEmailStyles);
    const [blockStylesMap, setBlockStylesMap] = useState<BlockStylesMap>({});
    const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
    const [editor, setEditor] = useState<Editor | null>(null);

    const updateEmailStyle = <K extends keyof EmailStyles>(key: K, value: EmailStyles[K]) => {
        setEmailStyles((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const resetEmailStyles = () => {
        setEmailStyles(defaultEmailStyles);
    };

    const getBlockStyles = (blockId: string): BlockStyles => {
        return blockStylesMap[blockId] || { ...defaultBlockStyles };
    };

    const updateBlockStyle = (
        blockId: string,
        key: keyof BlockStyles,
        value: BlockStyles[keyof BlockStyles]
    ) => {
        setBlockStylesMap((prev) => {
            const currentStyles = prev[blockId] || { ...defaultBlockStyles };
            return {
                ...prev,
                [blockId]: {
                    ...currentStyles,
                    [key]: value,
                },
            };
        });
    };

    const deleteBlockStyles = (blockId: string) => {
        setBlockStylesMap((prev) => {
            const newMap = { ...prev };
            delete newMap[blockId];
            return newMap;
        });
    };

    const resetAllBlockStyles = () => {
        setBlockStylesMap({});
    };

    return (
        <GlobalStateContext.Provider
            value={{
                emailStyles,
                updateEmailStyle,
                resetEmailStyles,
                blockStylesMap,
                getBlockStyles,
                updateBlockStyle,
                deleteBlockStyles,
                resetAllBlockStyles,
                selectedBlockId,
                setSelectedBlockId,
                editor,
                setEditor,
            }}
        >
            {children}
        </GlobalStateContext.Provider>
    );
}

/**
 * Hook to access global state context.
 *
 * Provides access to email styles and update functions. Must be used
 * within a GlobalStateProvider component.
 *
 * @returns {GlobalStateContextType} Global state context value
 * @throws {Error} If used outside of GlobalStateProvider
 */
export function useGlobalState() {
    const context = useContext(GlobalStateContext);
    if (context === undefined) {
        throw new Error("useGlobalState must be used within a GlobalStateProvider");
    }
    return context;
}
