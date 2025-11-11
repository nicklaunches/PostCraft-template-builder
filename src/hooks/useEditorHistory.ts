import { useState, useCallback, useEffect } from "react";
import type { Block } from "../types";

/**
 * Custom hook for managing editor history and undo/redo functionality.
 *
 * Tracks changes to the blocks array and provides undo/redo capabilities.
 * History is updated whenever the blocks change.
 *
 * @param {Block[]} blocks - Current blocks array to track
 * @param {(blocks: Block[]) => void} setBlocks - Callback to update blocks when undoing/redoing
 *
 * @returns {Object} History state and operations
 * @returns {() => void} undo - Revert to previous state
 * @returns {() => void} redo - Apply next state
 * @returns {boolean} canUndo - Whether undo is available
 * @returns {boolean} canRedo - Whether redo is available
 */
export function useEditorHistory(blocks: Block[], setBlocks: (blocks: Block[]) => void) {
    const [history, setHistory] = useState<Block[][]>([blocks]);
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

    const undo = useCallback(() => {
        if (historyIndex > 0) {
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            setBlocks(history[newIndex]);
        }
    }, [history, historyIndex, setBlocks]);

    const redo = useCallback(() => {
        if (historyIndex < history.length - 1) {
            const newIndex = historyIndex + 1;
            setHistoryIndex(newIndex);
            setBlocks(history[newIndex]);
        }
    }, [history, historyIndex, setBlocks]);

    return {
        undo,
        redo,
        canUndo: historyIndex > 0,
        canRedo: historyIndex < history.length - 1,
    };
}
