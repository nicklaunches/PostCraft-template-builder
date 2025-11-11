import { useState, useCallback } from "react";
import type { Block } from "../types";

/**
 * Custom hook for managing email template editor block state.
 *
 * Handles the core block management operations: adding, updating, deleting,
 * and moving blocks within the editor.
 *
 * @param {Block[]} [initialContent] - Initial array of blocks to populate the editor
 *
 * @returns {Object} Block state and operations
 * @returns {Block[]} blocks - Current array of blocks in the editor
 * @returns {(block: Block, index?: number) => void} addBlock - Add a new block at optional index
 * @returns {(id: string, updates: Partial<Block>) => void} updateBlock - Update existing block by ID
 * @returns {(id: string) => void} deleteBlock - Remove block by ID
 * @returns {(fromIndex: number, toIndex: number) => void} moveBlock - Move block from one index to another
 * @returns {(blocks: Block[]) => void} setBlocks - Directly set the blocks array (for history management)
 */
export function useEditorState(initialContent?: Block[]) {
    const [blocks, setBlocks] = useState<Block[]>(initialContent || []);

    const addBlock = useCallback((block: Block, index?: number) => {
        setBlocks((prev) => {
            const newBlocks = [...prev];
            if (index !== undefined) {
                newBlocks.splice(index, 0, block);
            } else {
                newBlocks.push(block);
            }
            return newBlocks;
        });
    }, []);

    const updateBlock = useCallback((id: string, updates: Partial<Block>) => {
        setBlocks((prev) =>
            prev.map((block) => (block.id === id ? { ...block, ...updates } : block))
        );
    }, []);

    const deleteBlock = useCallback((id: string) => {
        setBlocks((prev) => prev.filter((block) => block.id !== id));
    }, []);

    const moveBlock = useCallback((fromIndex: number, toIndex: number) => {
        setBlocks((prev) => {
            const newBlocks = [...prev];
            const [movedBlock] = newBlocks.splice(fromIndex, 1);
            newBlocks.splice(toIndex, 0, movedBlock);
            return newBlocks;
        });
    }, []);

    return {
        blocks,
        setBlocks,
        addBlock,
        updateBlock,
        deleteBlock,
        moveBlock,
    };
}
