import { useState, useCallback } from "react";

/**
 * Custom hook for managing block selection state in the editor.
 *
 * Tracks which block is currently selected, allowing users to focus
 * on a specific block for editing or styling.
 *
 * @returns {Object} Selection state and setter
 * @returns {string | null} selectedBlockId - ID of currently selected block
 * @returns {(id: string | null) => void} setSelectedBlockId - Function to set selected block
 */
export function useEditorSelection() {
    const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);

    const selectBlock = useCallback((id: string | null) => {
        setSelectedBlockId(id);
    }, []);

    return {
        selectedBlockId,
        setSelectedBlockId: selectBlock,
    };
}
