import type {
    Block,
    BlockContent,
    TextBlock,
    HeadingBlock,
    ButtonBlock,
    ImageBlock,
    DividerBlock,
    TextContent,
    HeadingContent,
    ButtonContent,
    ImageContent,
    DividerContent,
    BlockType,
} from "@/types";
import { generateBlockId } from "@/utils/helpers";

/**
 * Options for creating blocks with custom properties.
 */
interface BlockOptions {
    id?: string;
    styles?: Record<string, unknown>;
}

/**
 * Creates a generic block with the specified type and content.
 *
 * This is the base factory function that all other block factories use.
 * Automatically generates a unique ID and applies default styles unless overridden.
 *
 * @param {BlockType} type - Type of block to create
 * @param {unknown} content - Block content data
 * @param {BlockOptions} [options] - Optional custom id and styles
 * @returns {Block} A new block instance with unique ID and default styles
 *
 * @example
 * const block = createBlock('text', { text: 'Hello' });
 * // { id: 'block-123...', type: 'text', content: { text: 'Hello' }, styles: {...} }
 */
export function createBlock(
    type: BlockType,
    content: BlockContent,
    options: BlockOptions = {}
): Block {
    return {
        id: options.id || generateBlockId(),
        type,
        content,
        styles: options.styles || {},
    };
}

/**
 * Creates a text block with specified content.
 *
 * Text blocks are used for paragraphs and general body text in the email template.
 *
 * @param {string | TextContent} content - Text content (string or structured object)
 * @param {BlockOptions} [options] - Optional custom id and styles
 * @returns {TextBlock} A new text block instance
 *
 * @example
 * // Simple string content
 * const block = createTextBlock('Hello World');
 *
 * // Structured content
 * const block = createTextBlock({ text: 'Hello World' });
 *
 * // With custom styles
 * const block = createTextBlock('Hello', {
 *   styles: { alignment: 'center', paddingTop: 10 }
 * });
 */
export function createTextBlock(
    content: string | TextContent,
    options: BlockOptions = {}
): TextBlock {
    const normalizedContent = typeof content === "string" ? { text: content } : content;
    return {
        id: options.id || generateBlockId(),
        type: "text",
        content: normalizedContent,
        styles: options.styles || {},
    };
}

/**
 * Creates a heading block with specified content and level.
 *
 * Heading blocks are used for titles and section headers in the email template.
 *
 * @param {string | HeadingContent} content - Heading text or content object
 * @param {1 | 2 | 3 | 4 | 5 | 6} [level=1] - Heading level (h1-h6)
 * @param {BlockOptions} [options] - Optional custom id and styles
 * @returns {HeadingBlock} A new heading block instance
 *
 * @example
 * // Simple heading with default level 1
 * const h1 = createHeadingBlock('Main Title');
 *
 * // Heading with specific level
 * const h2 = createHeadingBlock('Subtitle', 2);
 *
 * // With structured content
 * const h3 = createHeadingBlock({ text: 'Section', level: 3 });
 *
 * // With custom styles
 * const h1 = createHeadingBlock('Title', 1, {
 *   styles: { alignment: 'center', marginBottom: 20 }
 * });
 */
export function createHeadingBlock(
    content: string | HeadingContent,
    level: 1 | 2 | 3 | 4 | 5 | 6 = 1,
    options: BlockOptions = {}
): HeadingBlock {
    const normalizedContent =
        typeof content === "string" ? { text: content, level } : { ...content, level };

    return {
        id: options.id || generateBlockId(),
        type: "heading",
        content: normalizedContent,
        styles: options.styles || {},
    };
}

/**
 * Creates a button block with specified text and URL.
 *
 * Button blocks render as clickable call-to-action elements in the email template.
 *
 * @param {ButtonContent | { text: string; url: string }} content - Button content with text and URL
 * @param {BlockOptions} [options] - Optional custom id and styles
 * @returns {ButtonBlock} A new button block instance
 *
 * @example
 * // Create a CTA button
 * const button = createButtonBlock({
 *   text: 'Shop Now',
 *   url: 'https://example.com/shop'
 * });
 *
 * // With custom styles
 * const button = createButtonBlock(
 *   { text: 'Learn More', url: '/learn' },
 *   { styles: { alignment: 'center', marginTop: 20 } }
 * );
 */
export function createButtonBlock(content: ButtonContent, options: BlockOptions = {}): ButtonBlock {
    return {
        id: options.id || generateBlockId(),
        type: "button",
        content,
        styles: options.styles || {},
    };
}

/**
 * Creates an image block with specified source and optional metadata.
 *
 * Image blocks display images in the email template with optional alt text and dimensions.
 *
 * @param {ImageContent | { src: string; alt?: string; width?: number; height?: number }} content - Image content
 * @param {BlockOptions} [options] - Optional custom id and styles
 * @returns {ImageBlock} A new image block instance
 *
 * @example
 * // Simple image with just src
 * const image = createImageBlock({ src: 'https://example.com/image.jpg' });
 *
 * // Image with alt text and dimensions
 * const image = createImageBlock({
 *   src: 'https://example.com/image.jpg',
 *   alt: 'Product photo',
 *   width: 600,
 *   height: 400
 * });
 *
 * // With custom styles
 * const image = createImageBlock(
 *   { src: '/logo.png', alt: 'Company Logo' },
 *   { styles: { alignment: 'center', marginBottom: 16 } }
 * );
 */
export function createImageBlock(content: ImageContent, options: BlockOptions = {}): ImageBlock {
    return {
        id: options.id || generateBlockId(),
        type: "image",
        content,
        styles: options.styles || {},
    };
}

/**
 * Creates a divider block for visual separation.
 *
 * Divider blocks render as horizontal lines to separate content sections.
 *
 * @param {DividerContent} [content] - Optional divider style configuration
 * @param {BlockOptions} [options] - Optional custom id and styles
 * @returns {DividerBlock} A new divider block instance
 *
 * @example
 * // Simple divider with default style
 * const divider = createDividerBlock();
 *
 * // Divider with specific style
 * const divider = createDividerBlock({ style: 'dashed' });
 *
 * // With custom styles
 * const divider = createDividerBlock(
 *   { style: 'dotted' },
 *   { styles: { marginTop: 20, marginBottom: 20 } }
 * );
 */
export function createDividerBlock(
    content?: DividerContent,
    options: BlockOptions = {}
): DividerBlock {
    return {
        id: options.id || generateBlockId(),
        type: "divider",
        content: content || {},
        styles: options.styles || {},
    };
}

/**
 * Clones an existing block with a new ID and optionally updated content/styles.
 *
 * Useful for duplicating blocks while maintaining their configuration.
 *
 * @param {Block} block - Block to clone
 * @param {Partial<Block>} [updates] - Optional updates to apply to the cloned block
 * @returns {Block} A new block with the same type, content, and styles but a new ID
 *
 * @example
 * const original = createTextBlock('Hello');
 * const duplicate = cloneBlock(original);
 * // duplicate has same content and styles but different ID
 *
 * // Clone with updates
 * const modified = cloneBlock(original, {
 *   content: { text: 'Modified text' },
 *   styles: { alignment: 'center' }
 * });
 */
export function cloneBlock(block: Block, updates: Partial<Block> = {}): Block {
    return {
        ...block,
        id: generateBlockId(),
        ...updates,
        styles: updates.styles || { ...block.styles },
    };
}

/**
 * Creates a block from a type string with default content.
 *
 * Useful for quickly creating placeholder blocks when the specific content isn't known yet.
 *
 * @param {BlockType} type - Type of block to create
 * @param {BlockOptions} [options] - Optional custom id and styles
 * @returns {Block} A new block with default content for the specified type
 *
 * @example
 * const textBlock = createDefaultBlock('text');
 * // { id: '...', type: 'text', content: { text: '' }, styles: {...} }
 *
 * const headingBlock = createDefaultBlock('heading');
 * // { id: '...', type: 'heading', content: { text: '', level: 1 }, styles: {...} }
 */
export function createDefaultBlock(type: BlockType, options: BlockOptions = {}): Block {
    switch (type) {
        case "text":
            return createTextBlock("", options) as Block;
        case "heading":
            return createHeadingBlock("", 1, options) as Block;
        case "button":
            return createButtonBlock({ text: "", url: "" }, options) as Block;
        case "image":
            return createImageBlock({ src: "" }, options) as Block;
        case "divider":
            return createDividerBlock({}, options) as Block;
        default:
            // Fallback for any unhandled types
            return createBlock(type, {}, options);
    }
}

/**
 * Creates multiple blocks from an array of type strings.
 *
 * Convenience function for batch block creation.
 *
 * @param {BlockType[]} types - Array of block types to create
 * @returns {Block[]} Array of newly created blocks with default content
 *
 * @example
 * const blocks = createBlocksFromTypes(['heading', 'text', 'button', 'divider']);
 * // Returns 4 blocks with default content for each type
 */
export function createBlocksFromTypes(types: BlockType[]): Block[] {
    return types.map((type) => createDefaultBlock(type));
}
