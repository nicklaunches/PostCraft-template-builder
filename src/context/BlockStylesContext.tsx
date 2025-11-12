import { createContext, useContext, useState, ReactNode } from "react";
import type { BlockStyles, BlockStylesMap } from "@/types";

/**
 * Block styles context type definition.
 *
 * @property {BlockStylesMap} blockStylesMap - Map of block IDs to their style configurations
 * @property {(blockId: string) => BlockStyles | undefined} getBlockStyles - Get styles for a specific block (returns undefined if not found)
 * @property {(blockId: string, key: keyof BlockStyles, value: BlockStyles[keyof BlockStyles]) => void} updateBlockStyle - Update a specific style property for a block
 * @property {(blockId: string) => void} deleteBlockStyles - Remove styles for a specific block
 * @property {() => void} resetAllBlockStyles - Reset all block styles
 * @property {string | null} selectedBlockId - Currently selected block ID
 * @property {(blockId: string | null) => void} setSelectedBlockId - Set the currently selected block ID
 */
interface BlockStylesContextType {
    blockStylesMap: BlockStylesMap;
    getBlockStyles: (blockId: string) => BlockStyles | undefined;
    updateBlockStyle: (
        blockId: string,
        key: keyof BlockStyles,
        value: BlockStyles[keyof BlockStyles]
    ) => void;
    deleteBlockStyles: (blockId: string) => void;
    resetAllBlockStyles: () => void;
    selectedBlockId: string | null;
    setSelectedBlockId: (blockId: string | null) => void;
}

const BlockStylesContext = createContext<BlockStylesContextType | undefined>(undefined);

/**
 * Block styles provider component.
 *
 * Manages per-block styling configuration including alignment, spacing, borders,
 * and background colors. Each block in the editor has its own set of styles stored
 * by block ID. Also tracks which block is currently selected for editing.
 *
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child components to wrap
 * @returns {JSX.Element} Provider component
 *
 * @example
 * <BlockStylesProvider>
 *   <YourComponent />
 * </BlockStylesProvider>
 */
export function BlockStylesProvider({ children }: { children: ReactNode }) {
    const [blockStylesMap, setBlockStylesMap] = useState<BlockStylesMap>({});
    const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);

    const getBlockStyles = (blockId: string): BlockStyles | undefined => {
        return blockStylesMap[blockId];
    };

    const updateBlockStyle = (
        blockId: string,
        key: keyof BlockStyles,
        value: BlockStyles[keyof BlockStyles]
    ) => {
        setBlockStylesMap((prev) => {
            const currentStyles = prev[blockId] || ({} as BlockStyles);
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
        <BlockStylesContext.Provider
            value={{
                blockStylesMap,
                getBlockStyles,
                updateBlockStyle,
                deleteBlockStyles,
                resetAllBlockStyles,
                selectedBlockId,
                setSelectedBlockId,
            }}
        >
            {children}
        </BlockStylesContext.Provider>
    );
}

/**
 * Hook to access block styles context.
 *
 * Provides access to block-specific styling configuration, selection state,
 * and update functions. Must be used within a BlockStylesProvider component.
 *
 * @returns {BlockStylesContextType} Block styles context value
 * @throws {Error} If used outside of BlockStylesProvider
 *
 * @example
 * const { getBlockStyles, updateBlockStyle, selectedBlockId } = useBlockStyles();
 * const styles = getBlockStyles('block-123');
 * updateBlockStyle('block-123', 'alignment', 'center');
 */
export function useBlockStyles() {
    const context = useContext(BlockStylesContext);
    if (context === undefined) {
        throw new Error("useBlockStyles must be used within a BlockStylesProvider");
    }
    return context;
}
