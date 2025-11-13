import { useState, useCallback, useEffect } from "react";
import type { Block } from "../types";
import { blocksToHTML } from "@/utils";

/**
 * Custom hook for managing email template editor state and operations.
 *
 * Provides comprehensive functionality for:
 * - Block management: creating, updating, deleting, and moving blocks
 * - Selection tracking: managing which block is currently selected
 * - History management: undo/redo functionality with state tracking
 * - Export capabilities: converting blocks to HTML
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
    // State management
    const [blocks, setBlocks] = useState<Block[]>(initialContent || []);

    // Selection management
    const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);

    // History management
    const [history, setHistory] = useState<Block[][]>([initialContent || []]);
    const [historyIndex, setHistoryIndex] = useState(0);

    // Update history when blocks change (but not during undo/redo)
    useEffect(() => {
        setHistory((prev) => {
            // Only add to history if blocks actually changed
            const lastState = prev[prev.length - 1];
            if (JSON.stringify(lastState) === JSON.stringify(blocks)) {
                return prev;
            }

            // If we're not at the end of history, truncate future states
            const newHistory = prev.slice(0, historyIndex + 1);
            newHistory.push(blocks);

            // Limit history size to prevent memory issues (keep last 50 states)
            if (newHistory.length > 50) {
                newHistory.shift();
                setHistoryIndex((prev) => Math.max(0, prev - 1));
                return newHistory;
            }

            setHistoryIndex(newHistory.length - 1);
            return newHistory;
        });
    }, [blocks, historyIndex]);

    // Block operations
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

    const deleteBlock = useCallback(
        (id: string) => {
            setBlocks((prev) => prev.filter((block) => block.id !== id));
            if (selectedBlockId === id) {
                setSelectedBlockId(null);
            }
        },
        [selectedBlockId]
    );

    const moveBlock = useCallback((fromIndex: number, toIndex: number) => {
        setBlocks((prev) => {
            const newBlocks = [...prev];
            const [movedBlock] = newBlocks.splice(fromIndex, 1);
            newBlocks.splice(toIndex, 0, movedBlock);
            return newBlocks;
        });
    }, []);

    // History operations
    const undo = useCallback(() => {
        if (historyIndex > 0) {
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            setBlocks(history[newIndex]);
        }
    }, [history, historyIndex]);

    const redo = useCallback(() => {
        if (historyIndex < history.length - 1) {
            const newIndex = historyIndex + 1;
            setHistoryIndex(newIndex);
            setBlocks(history[newIndex]);
        }
    }, [history, historyIndex]);

    // Export functionality
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
        canUndo: historyIndex > 0,
        canRedo: historyIndex < history.length - 1,
        exportToHTML,
    };
}
