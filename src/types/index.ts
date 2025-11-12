import type { BlockType as BlockTypeImport } from "@/utils/constants";

/**
 * Re-export BlockType for convenience
 */
export type BlockType = BlockTypeImport;

/**
 * Text block content structure
 */
export interface TextContent {
    text: string;
}

/**
 * Heading block content structure
 */
export interface HeadingContent {
    text: string;
    level?: 1 | 2 | 3 | 4 | 5 | 6;
}

/**
 * Button block content structure
 */
export interface ButtonContent {
    text: string;
    url: string;
}

/**
 * Image block content structure
 */
export interface ImageContent {
    src: string;
    alt?: string;
    width?: number;
    height?: number;
}

/**
 * Divider block content structure (no content needed)
 */
export interface DividerContent {
    style?: "solid" | "dashed" | "dotted";
}

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
 * @property {BlockType} type - Type of content block
 * @property {unknown} content - Block content data (varies by type)
 * @property {Record<string, unknown>} [styles] - Optional custom styles for the block
 */
export interface Block {
    id: string;
    type: BlockType;
    content: unknown;
    styles?: Record<string, unknown>;
}

/**
 * Text block with strongly-typed content
 */
export interface TextBlock {
    id: string;
    type: "text";
    content: string | TextContent;
    styles?: Record<string, unknown>;
}

/**
 * Heading block with strongly-typed content
 */
export interface HeadingBlock {
    id: string;
    type: "heading";
    content: string | HeadingContent;
    styles?: Record<string, unknown>;
}

/**
 * Button block with strongly-typed content
 */
export interface ButtonBlock {
    id: string;
    type: "button";
    content: ButtonContent;
    styles?: Record<string, unknown>;
}

/**
 * Image block with strongly-typed content
 */
export interface ImageBlock {
    id: string;
    type: "image";
    content: ImageContent;
    styles?: Record<string, unknown>;
}

/**
 * Divider block with strongly-typed content
 */
export interface DividerBlock {
    id: string;
    type: "divider";
    content?: DividerContent;
    styles?: Record<string, unknown>;
}

/**
 * Discriminated union of all block types.
 * Provides type narrowing based on the block type property.
 */
export type TypedBlock = TextBlock | HeadingBlock | ButtonBlock | ImageBlock | DividerBlock;

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
 * Email styling configuration interface.
 *
 * @property {string} [className] - Unique CSS class name for the template
 * @property {string} font - Primary font family
 * @property {string} fallback - Fallback font family
 * @property {number} paddingLeft - Left padding in pixels
 * @property {number} paddingRight - Right padding in pixels
 * @property {number} paddingTop - Top padding in pixels
 * @property {number} paddingBottom - Bottom padding in pixels
 * @property {string} bodyColor - Text color (hex)
 * @property {number} marginLeft - Left margin in pixels
 * @property {number} marginRight - Right margin in pixels
 * @property {number} marginTop - Top margin in pixels
 * @property {number} marginBottom - Bottom margin in pixels
 * @property {string} backgroundColor - Page background color (hex)
 * @property {string} contentBackgroundColor - Content container background color (hex)
 * @property {number} radius - Border radius in pixels
 * @property {number} borderWidth - Border width in pixels
 * @property {string} borderColor - Border color (hex)
 */
export interface EmailStyles {
    className?: string;
    font: string;
    fallback: string;
    paddingLeft: number;
    paddingRight: number;
    paddingTop: number;
    paddingBottom: number;
    bodyColor: string;
    marginLeft: number;
    marginRight: number;
    marginTop: number;
    marginBottom: number;
    backgroundColor: string;
    contentBackgroundColor: string;
    radius: number;
    borderWidth: number;
    borderColor: string;
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
 * @property {number} marginLeft - Left margin in pixels
 * @property {number} marginRight - Right margin in pixels
 * @property {number} marginTop - Top margin in pixels
 * @property {number} marginBottom - Bottom margin in pixels
 * @property {string} backgroundColor - Background color (hex)
 * @property {number} fontSize - Font size in pixels
 * @property {number} lineHeight - Line height as percentage
 * @property {string} color - Text color (hex)
 */
export interface BlockStyles {
    alignment: "left" | "center" | "right";
    borderWidth: number;
    paddingLeft: number;
    paddingRight: number;
    paddingTop: number;
    paddingBottom: number;
    marginLeft: number;
    marginRight: number;
    marginTop: number;
    marginBottom: number;
    backgroundColor: string;
    fontSize: number;
    lineHeight: number;
    color: string;
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
