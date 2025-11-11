/**
 * Represents email template metadata and content.
 *
 * @property {string} [id] - Unique template identifier
 * @property {string} name - Template name/title
 * @property {string} [subject] - Email subject line
 * @property {unknown} content - Template content data
 * @property {Date} [updatedAt] - Last update timestamp
 */
export interface TemplateData {
    id?: string;
    name: string;
    subject?: string;
    content: unknown;
    updatedAt?: Date;
}

/**
 * Represents a content block in the email template editor.
 *
 * @property {string} id - Unique identifier for the block
 * @property {"text" | "heading" | "image" | "button" | "divider"} type - Type of content block
 * @property {unknown} content - Block content data (varies by type)
 * @property {Record<string, unknown>} [styles] - Optional custom styles for the block
 */
export interface Block {
    id: string;
    type: "text" | "heading" | "image" | "button" | "divider";
    content: unknown;
    styles?: Record<string, unknown>;
}

/**
 * Props for the TemplateBuilder component.
 *
 * @property {boolean} [showNav] - Whether to display the navigation bar
 * @property {boolean} [showLeftSidebar] - Whether to display the left sidebar
 * @property {boolean} [showRightSidebar] - Whether to display the right sidebar
 * @property {(content: unknown) => void} [onSave] - Callback when content is saved
 * @property {unknown} [initialContent] - Initial content to load in the builder
 */
export interface TemplateBuilderProps {
    showNav?: boolean;
    showLeftSidebar?: boolean;
    showRightSidebar?: boolean;
    onSave?: (content: unknown) => void;
    initialContent?: unknown;
}

/**
 * Props for the ContentEditor component.
 *
 * @property {unknown} [initialContent] - Initial content to load in the editor
 * @property {(content: unknown) => void} [onSave] - Callback when content is saved
 */
export interface ContentEditorProps {
    initialContent?: unknown;
    onSave?: (content: unknown) => void;
}
