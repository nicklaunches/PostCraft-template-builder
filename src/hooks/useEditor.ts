import { useState, useCallback } from "react";

export interface Block {
    id: string;
    type: "text" | "heading" | "image" | "button" | "divider";
    content: any;
    styles?: Record<string, any>;
}

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
