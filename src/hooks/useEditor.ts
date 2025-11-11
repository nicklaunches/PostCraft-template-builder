import { useCallback } from "react";
import type { Block } from "../types";
import { useEditorState } from "./useEditorState";
import { useEditorSelection } from "./useEditorSelection";
import { useEditorHistory } from "./useEditorHistory";
import { blocksToHTML } from "@/utils/converters";

/**
 * Custom hook for managing email template editor state and operations.
 *
 * Provides functionality for creating, updating, deleting, and moving blocks within
 * the editor. Includes selection state management and history tracking for undo/redo.
 *
 * This hook composes three specialized hooks:
 * - useEditorState: Manages blocks and CRUD operations
 * - useEditorSelection: Manages block selection
 * - useEditorHistory: Manages undo/redo functionality
 *
 * @param {Block[]} [initialContent] - Initial array of blocks to populate the editor
 *
 * @returns {Object} Editor state and operations
 * @returns {Block[]} blocks - Current array of blocks in the editor
 * @returns {string | null} selectedBlockId - ID of currently selected block
 * @returns {(id: string | null) => void} setSelectedBlockId - Function to set selected block
 * @returns {(block: Block, index?: number) => void} addBlock - Add a new block at optional index
 * @returns {(id: string, updates: Partial<Block>) => void} updateBlock - Update existing block by ID
 * @returns {(id: string) => void} deleteBlock - Remove block by ID
 * @returns {(fromIndex: number, toIndex: number) => void} moveBlock - Move block from one index to another
 * @returns {() => void} undo - Revert to previous state
 * @returns {() => void} redo - Apply next state
 * @returns {boolean} canUndo - Whether undo is available
 * @returns {boolean} canRedo - Whether redo is available
 * @returns {() => string} exportToHTML - Export blocks to HTML string
 */
export function useEditor(initialContent?: Block[]) {
    // Block state management
    const {
        blocks,
        setBlocks,
        addBlock,
        updateBlock,
        deleteBlock: deleteBlockFromState,
        moveBlock,
    } = useEditorState(initialContent);

    // Selection management
    const { selectedBlockId, setSelectedBlockId } = useEditorSelection();

    // History management
    const { undo, redo, canUndo, canRedo } = useEditorHistory(blocks, setBlocks);

    // Enhanced delete that also clears selection
    const deleteBlock = useCallback(
        (id: string) => {
            deleteBlockFromState(id);
            if (selectedBlockId === id) {
                setSelectedBlockId(null);
            }
        },
        [deleteBlockFromState, selectedBlockId, setSelectedBlockId]
    );

    const exportToHTML = useCallback(() => {
        return blocksToHTML(blocks);
    }, [blocks]);

    return {
        blocks,
        selectedBlockId,
        setSelectedBlockId,
        addBlock,
        updateBlock,
        deleteBlock,
        moveBlock,
        undo,
        redo,
        canUndo,
        canRedo,
        exportToHTML,
    };
}
