import * as react from 'react';
import react__default from 'react';

interface TemplateBuilderProps$1 {
    showNav?: boolean;
    showLeftSidebar?: boolean;
    showRightSidebar?: boolean;
    onSave?: (content: any) => void;
    initialContent?: any;
}
declare function TemplateBuilder({ showNav, showLeftSidebar, showRightSidebar, onSave, initialContent, }: TemplateBuilderProps$1): react.JSX.Element;

declare function Nav(): react__default.JSX.Element;

declare function LeftSidebar(): react.JSX.Element;

interface ContentEditorProps$1 {
    initialContent?: string;
    onSave?: (content: string) => void;
}
declare function ContentEditor({ initialContent: _initialContent, onSave: _onSave, }: ContentEditorProps$1): react.JSX.Element;

declare function RightSidebar(): react__default.JSX.Element;

interface TemplateData$1 {
    id?: string;
    name: string;
    subject?: string;
    content: any;
    updatedAt?: Date;
}
declare function useTemplateBuilder(initialData?: TemplateData$1): {
    template: TemplateData$1;
    updateTemplate: (updates: Partial<TemplateData$1>) => void;
    saveTemplate: () => Promise<void>;
    isSaving: boolean;
    hasUnsavedChanges: boolean;
};

interface Block$1 {
    id: string;
    type: "text" | "heading" | "image" | "button" | "divider";
    content: any;
    styles?: Record<string, any>;
}
declare function useEditor(initialContent?: Block$1[]): {
    blocks: Block$1[];
    selectedBlockId: string | null;
    setSelectedBlockId: react.Dispatch<react.SetStateAction<string | null>>;
    addBlock: (block: Block$1, index?: number) => void;
    updateBlock: (id: string, updates: Partial<Block$1>) => void;
    deleteBlock: (id: string) => void;
    moveBlock: (fromIndex: number, toIndex: number) => void;
    undo: () => void;
    redo: () => void;
    canUndo: boolean;
    canRedo: boolean;
    exportToHTML: () => string;
};

interface TemplateData {
    id?: string;
    name: string;
    subject?: string;
    content: any;
    updatedAt?: Date;
}
interface Block {
    id: string;
    type: "text" | "heading" | "image" | "button" | "divider";
    content: any;
    styles?: Record<string, any>;
}
interface TemplateBuilderProps {
    showNav?: boolean;
    showLeftSidebar?: boolean;
    showRightSidebar?: boolean;
    onSave?: (content: any) => void;
    initialContent?: any;
}
interface ContentEditorProps {
    initialContent?: any;
    onSave?: (content: any) => void;
}

export { type Block, ContentEditor, type ContentEditorProps, LeftSidebar, Nav, RightSidebar, TemplateBuilder, type TemplateBuilderProps, type TemplateData, useEditor, useTemplateBuilder };
