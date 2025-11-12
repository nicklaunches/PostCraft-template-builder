import type { BlockType as BlockTypeImport } from "@/utils/constants";
import type { JSONContent } from "@tiptap/core";

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
 * Union type of all possible block content types.
 * Provides type safety for block content based on block type.
 */
export type BlockContent =
    | string
    | TextContent
    | HeadingContent
    | ButtonContent
    | ImageContent
    | DividerContent;

/**
 * JSON-serializable value type for template content.
 */
export type JSONValue =
    | string
    | number
    | boolean
    | null
    | JSONValue[]
    | { [key: string]: JSONValue };

/**
 * Represents email template metadata and content.
 *
 * @property {string} [id] - Unique template identifier
 * @property {string} name - Template name/title
 * @property {string} [subject] - Email subject line
 * @property {JSONValue} content - Template content data (JSON-serializable)
 * @property {Date} [updatedAt] - Last update timestamp
 */
export interface TemplateData {
    id?: string;
    name: string;
    subject?: string;
    content: JSONValue;
    updatedAt?: Date;
}

/**
 * Represents a content block in the email template editor.
 *
 * @property {string} id - Unique identifier for the block
 * @property {BlockType} type - Type of content block
 * @property {BlockContent} content - Block content data (type-safe union)
 * @property {Partial<BlockStyles>} [styles] - Optional custom styles for the block
 */
export interface Block {
    id: string;
    type: BlockType;
    content: BlockContent;
    styles?: Partial<BlockStyles>;
}

/**
 * Text block with strongly-typed content
 */
export interface TextBlock {
    id: string;
    type: "text";
    content: string | TextContent;
    styles?: Partial<BlockStyles>;
}

/**
 * Heading block with strongly-typed content
 */
export interface HeadingBlock {
    id: string;
    type: "heading";
    content: string | HeadingContent;
    styles?: Partial<BlockStyles>;
}

/**
 * Button block with strongly-typed content
 */
export interface ButtonBlock {
    id: string;
    type: "button";
    content: ButtonContent;
    styles?: Partial<BlockStyles>;
}

/**
 * Image block with strongly-typed content
 */
export interface ImageBlock {
    id: string;
    type: "image";
    content: ImageContent;
    styles?: Partial<BlockStyles>;
}

/**
 * Divider block with strongly-typed content
 */
export interface DividerBlock {
    id: string;
    type: "divider";
    content?: DividerContent;
    styles?: Partial<BlockStyles>;
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
 * @property {(content: JSONValue) => void} [onSave] - Callback when content is saved
 * @property {JSONValue} [initialContent] - Initial content to load in the builder
 */
export interface TemplateBuilderProps {
    showNav?: boolean;
    showLeftSidebar?: boolean;
    showRightSidebar?: boolean;
    onSave?: (content: JSONContent) => void;
    initialContent?: JSONContent;
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
 * @property {number} borderRadius - Border radius in pixels
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
    borderRadius: number;
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
 * @property {JSONValue} [initialContent] - Initial content to load in the editor
 * @property {(content: JSONValue) => void} [onSave] - Callback when content is saved
 */
export interface ContentEditorProps {
    initialContent?: JSONContent;
    onSave?: (content: JSONContent) => void;
}
