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
 * Block styling configuration interface.
 *
 * @property {"left" | "center" | "right"} alignment - Text/content alignment
 * @property {number} borderWidth - Border radius in pixels (note: property name is borderWidth but represents radius)
 * @property {number} paddingLeft - Left padding in pixels
 * @property {number} paddingRight - Right padding in pixels
 * @property {number} paddingTop - Top padding in pixels
 * @property {number} paddingBottom - Bottom padding in pixels
 * @property {string} backgroundColor - Background color (hex)
 */
export interface BlockStyles {
    alignment: "left" | "center" | "right";
    borderWidth: number;
    paddingLeft: number;
    paddingRight: number;
    paddingTop: number;
    paddingBottom: number;
    backgroundColor: string;
}

/**
 * Map of block IDs to their corresponding styles.
 * Key: unique block identifier
 * Value: BlockStyles configuration for that block
 */
export type BlockStylesMap = Record<string, BlockStyles>;

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
