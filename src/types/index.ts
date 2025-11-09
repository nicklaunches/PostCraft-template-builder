export interface TemplateData {
    id?: string;
    name: string;
    subject?: string;
    content: any;
    updatedAt?: Date;
}

export interface Block {
    id: string;
    type: "text" | "heading" | "image" | "button" | "divider";
    content: any;
    styles?: Record<string, any>;
}

export interface TemplateBuilderProps {
    showNav?: boolean;
    showLeftSidebar?: boolean;
    showRightSidebar?: boolean;
    onSave?: (content: any) => void;
    initialContent?: any;
}

export interface ContentEditorProps {
    initialContent?: any;
    onSave?: (content: any) => void;
}
