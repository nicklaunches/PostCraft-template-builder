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
 * Props for the TemplateBuilder component.
 *
 * @property {boolean} [showNav] - Whether to display the navigation bar
 * @property {boolean} [showLeftSidebar] - Whether to display the left sidebar
 * @property {boolean} [showRightSidebar] - Whether to display the right sidebar
 * @property {(content: any) => void} [onSave] - Callback when content is saved
 * @property {any} [initialContent] - Initial content to load in the builder
 */
export interface TemplateBuilderProps {
    showNav?: boolean;
    showLeftSidebar?: boolean;
    showRightSidebar?: boolean;
    onSave?: (content: any) => void;
    initialContent?: any;
}

/**
 * Props for the ContentEditor component.
 *
 * @property {any} [initialContent] - Initial content to load in the editor
 * @property {(content: any) => void} [onSave] - Callback when content is saved
 */
export interface ContentEditorProps {
    initialContent?: any;
    onSave?: (content: any) => void;
}
