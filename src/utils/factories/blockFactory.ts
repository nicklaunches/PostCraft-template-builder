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
    BlockStyles,
} from "@/types";
import { generateBlockId } from "@/utils/helpers";

/**
 * Options for creating blocks with custom properties.
 */
interface BlockOptions {
    id?: string;
    styles?: Partial<BlockStyles>;
}

/**
 * Fluent builder for creating blocks with a type-safe, chainable API.
 * Reduces verbosity while maintaining flexibility for advanced use cases.
 *
 * @example
 * // Simple usage
 * const block = blockBuilder('text')
 *   .withContent({ text: 'Hello' })
 *   .build();
 *
 * // Advanced usage with custom ID and styles
 * const block = blockBuilder('heading')
 *   .withId('custom-id')
 *   .withContent({ text: 'Title', level: 1 })
 *   .withStyles({ alignment: 'center', paddingTop: 20 })
 *   .build();
 */
export function blockBuilder<T extends BlockType>(type: T) {
    const blockData: Partial<Block> = {
        id: generateBlockId(),
        type,
        styles: {},
    };

    return {
        /**
         * Set a custom block ID (otherwise auto-generated)
         */
        withId(id: string) {
            blockData.id = id;
            return this;
        },

        /**
         * Set the block content
         */
        withContent(content: BlockContent) {
            blockData.content = content;
            return this;
        },

        /**
         * Set or merge block styles
         */
        withStyles(styles: Partial<BlockStyles>) {
            blockData.styles = { ...blockData.styles, ...styles };
            return this;
        },

        /**
         * Build and return the final block
         */
        build(): Block {
            return blockData as Block;
        },
    };
}

/**
 * Creates a generic block with the specified type and content.
 * This is a lower-level function; consider using blockBuilder() or convenience functions instead.
 *
 * @param {BlockType} type - Type of block to create
 * @param {BlockContent} content - Block content data
 * @param {BlockOptions} [options] - Optional custom id and styles
 * @returns {Block} A new block instance
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
 * Creates a text block. Accepts either a string or structured content.
 *
 * @example
 * createTextBlock('Hello World')
 * createTextBlock({ text: 'Hello' }, { styles: { alignment: 'center' } })
 */
export function createTextBlock(
    content: string | TextContent,
    options: BlockOptions = {}
): TextBlock {
    const normalizedContent = typeof content === "string" ? { text: content } : content;
    return blockBuilder("text")
        .withId(options.id || generateBlockId())
        .withContent(normalizedContent)
        .withStyles(options.styles || {})
        .build() as TextBlock;
}

/**
 * Creates a heading block with optional level (defaults to h1).
 *
 * @example
 * createHeadingBlock('Title')
 * createHeadingBlock('Subtitle', 2)
 * createHeadingBlock({ text: 'Section', level: 3 }, { styles: { alignment: 'center' } })
 */
export function createHeadingBlock(
    content: string | HeadingContent,
    level: 1 | 2 | 3 | 4 | 5 | 6 = 1,
    options: BlockOptions = {}
): HeadingBlock {
    const normalizedContent =
        typeof content === "string" ? { text: content, level } : { ...content, level };

    return blockBuilder("heading")
        .withId(options.id || generateBlockId())
        .withContent(normalizedContent)
        .withStyles(options.styles || {})
        .build() as HeadingBlock;
}

/**
 * Creates a button block with text and URL.
 *
 * @example
 * createButtonBlock({ text: 'Click Me', url: 'https://example.com' })
 * createButtonBlock({ text: 'Learn More', url: '/learn' }, { styles: { alignment: 'center' } })
 */
export function createButtonBlock(content: ButtonContent, options: BlockOptions = {}): ButtonBlock {
    return blockBuilder("button")
        .withId(options.id || generateBlockId())
        .withContent(content)
        .withStyles(options.styles || {})
        .build() as ButtonBlock;
}

/**
 * Creates an image block with source and optional metadata.
 *
 * @example
 * createImageBlock({ src: 'image.jpg' })
 * createImageBlock({ src: 'logo.png', alt: 'Logo', width: 200, height: 100 })
 */
export function createImageBlock(content: ImageContent, options: BlockOptions = {}): ImageBlock {
    return blockBuilder("image")
        .withId(options.id || generateBlockId())
        .withContent(content)
        .withStyles(options.styles || {})
        .build() as ImageBlock;
}

/**
 * Creates a divider block for visual separation.
 *
 * @example
 * createDividerBlock()
 * createDividerBlock({ style: 'dashed' }, { styles: { marginTop: 20 } })
 */
export function createDividerBlock(
    content?: DividerContent,
    options: BlockOptions = {}
): DividerBlock {
    return blockBuilder("divider")
        .withId(options.id || generateBlockId())
        .withContent(content || {})
        .withStyles(options.styles || {})
        .build() as DividerBlock;
}

/**
 * Clones an existing block with a new ID and optional updates.
 *
 * @example
 * const duplicate = cloneBlock(originalBlock)
 * const modified = cloneBlock(originalBlock, { content: { text: 'New text' } })
 */
export function cloneBlock(block: Block, updates: Partial<Block> = {}): Block {
    return {
        ...block,
        id: generateBlockId(),
        ...updates,
        styles: updates.styles ? { ...block.styles, ...updates.styles } : { ...block.styles },
    };
}

/**
 * Creates a block with default content for the specified type.
 * Useful for creating placeholder blocks.
 *
 * @example
 * const textBlock = createDefaultBlock('text')
 * const headingBlock = createDefaultBlock('heading', { styles: { alignment: 'center' } })
 */
export function createDefaultBlock(type: BlockType, options: BlockOptions = {}): Block {
    switch (type) {
        case "text":
            return createTextBlock("", options);
        case "heading":
            return createHeadingBlock("", 1, options);
        case "button":
            return createButtonBlock({ text: "", url: "" }, options);
        case "image":
            return createImageBlock({ src: "" }, options);
        case "divider":
            return createDividerBlock({}, options) as Block;
        default:
            return createBlock(type, {}, options);
    }
}

/**
 * Creates multiple blocks from an array of type strings.
 * Convenience function for batch block creation.
 *
 * @example
 * const blocks = createBlocksFromTypes(['heading', 'text', 'button', 'divider'])
 */
export function createBlocksFromTypes(types: BlockType[]): Block[] {
    return types.map((type) => createDefaultBlock(type));
}
