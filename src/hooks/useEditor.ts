import { useState, useCallback } from "react";

/**
 * Represents a content block in the email template editor.
 *
 * @property {string} id - Unique identifier for the block
 * @property {"text" | "heading" | "image" | "button" | "divider"} type - Type of content block
 * @property {any} content - Block content data (varies by type)
 * @property {Record<string, any>} [styles] - Optional custom styles for the block
 */
export interface Block {
    id: string;
    type: "text" | "heading" | "image" | "button" | "divider";
    content: any;
    styles?: Record<string, any>;
}

/**
 * Custom hook for managing email template editor state and operations.
 *
 * Provides functionality for creating, updating, deleting, and moving blocks within
 * the editor. Includes selection state management and history tracking for undo/redo.
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
    const [blocks, setBlocks] = useState<Block[]>(initialContent || []);
    const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
    const [history] = useState<Block[][]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);

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

    const undo = useCallback(() => {
        if (historyIndex > 0) {
            setHistoryIndex((prev) => prev - 1);
            setBlocks(history[historyIndex - 1]);
        }
    }, [history, historyIndex]);

    const redo = useCallback(() => {
        if (historyIndex < history.length - 1) {
            setHistoryIndex((prev) => prev + 1);
            setBlocks(history[historyIndex + 1]);
        }
    }, [history, historyIndex]);

    const exportToHTML = useCallback(() => {
        // Convert blocks to HTML email template
        return blocks
            .map((block) => {
                // This is a simplified version
                switch (block.type) {
                    case "text":
                        return `<p>${block.content}</p>`;
                    case "heading":
                        return `<h2>${block.content}</h2>`;
                    case "button":
                        return `<a href="${block.content.url}">${block.content.text}</a>`;
                    default:
                        return "";
                }
            })
            .join("\n");
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
