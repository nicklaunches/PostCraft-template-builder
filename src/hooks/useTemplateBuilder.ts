import { useState, useCallback } from "react";

export interface TemplateData {
    id?: string;
    name: string;
    subject?: string;
    content: any;
    updatedAt?: Date;
}

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
