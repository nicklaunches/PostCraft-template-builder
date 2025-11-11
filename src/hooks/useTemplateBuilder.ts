import { useState, useCallback } from "react";

/**
 * Represents email template metadata and content.
 *
 * @property {string} [id] - Unique template identifier
 * @property {string} name - Template name/title
 * @property {string} [subject] - Email subject line
 * @property {any} content - Template content data
 * @property {Date} [updatedAt] - Last update timestamp
 */
export interface TemplateData {
    id?: string;
    name: string;
    subject?: string;
    content: any;
    updatedAt?: Date;
}

/**
 * Custom hook for managing template builder state and operations.
 *
 * Handles template metadata, save status, and unsaved changes tracking.
 * Provides methods to update template data and persist changes.
 *
 * @param {TemplateData} [initialData] - Initial template data
 *
 * @returns {Object} Template state and operations
 * @returns {TemplateData} template - Current template data
 * @returns {(updates: Partial<TemplateData>) => void} updateTemplate - Update template with partial data
 * @returns {() => Promise<void>} saveTemplate - Save template (updates timestamp)
 * @returns {boolean} isSaving - Whether save operation is in progress
 * @returns {boolean} hasUnsavedChanges - Whether template has unsaved changes
 */
export function useTemplateBuilder(initialData?: TemplateData) {
    const [template, setTemplate] = useState<TemplateData>(
        initialData || {
            name: "Untitled Template",
            content: null,
        }
    );
    const [isSaving, setIsSaving] = useState(false);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    const updateTemplate = useCallback((updates: Partial<TemplateData>) => {
        setTemplate((prev) => ({ ...prev, ...updates }));
        setHasUnsavedChanges(true);
    }, []);

    const saveTemplate = useCallback(async () => {
        setIsSaving(true);
        try {
            // This will be called from the parent app (PostCraft)
            // For now, just update the timestamp
            setTemplate((prev) => ({
                ...prev,
                updatedAt: new Date(),
            }));
            setHasUnsavedChanges(false);
        } catch (error) {
            console.error("Save failed:", error);
        } finally {
            setIsSaving(false);
        }
    }, []);

    return {
        template,
        updateTemplate,
        saveTemplate,
        isSaving,
        hasUnsavedChanges,
    };
}
