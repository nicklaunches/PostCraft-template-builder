import type {
    Block,
    HeadingContent,
    TextContent,
    ImageContent,
    ButtonContent,
    DividerContent,
} from "@/types";
import {
    isTextBlock,
    isHeadingBlock,
    isButtonBlock,
    isImageBlock,
    isDividerBlock,
} from "./type-guards";

/**
 * Converts an array of blocks to an HTML email template string.
 *
 * Generates email-compatible HTML from the block structure, handling different
 * block types (text, heading, image, button, divider) and their content.
 * Uses type guards for safe type narrowing.
 *
 * @param {Block[]} blocks - Array of blocks to convert to HTML
 * @returns {string} Generated HTML string for email template
 *
 * @example
 * const blocks = [
 *   { id: '1', type: 'heading', content: 'Welcome' },
 *   { id: '2', type: 'text', content: 'Hello world' }
 * ];
 * const html = blocksToHTML(blocks);
 * // Returns: "<h2>Welcome</h2>\n<p>Hello world</p>"
 */
export function blocksToHTML(blocks: Block[]): string {
    return blocks
        .map((block) => {
            // Use type guards for safe type narrowing
            if (isTextBlock(block)) {
                const text =
                    typeof block.content === "string"
                        ? block.content
                        : (block.content as TextContent)?.text || "";
                return `<p>${escapeHTML(text)}</p>`;
            }

            if (isHeadingBlock(block)) {
                const content =
                    typeof block.content === "string"
                        ? block.content
                        : (block.content as HeadingContent)?.text || "";
                const level =
                    typeof block.content === "object"
                        ? (block.content as HeadingContent)?.level || 2
                        : 2;
                return `<h${level}>${escapeHTML(content)}</h${level}>`;
            }

            if (isImageBlock(block)) {
                const imageContent = block.content as ImageContent;
                if (typeof imageContent !== "object" || !imageContent?.src) {
                    return "";
                }
                const { src, alt = "", width, height } = imageContent;
                const widthAttr = width ? ` width="${width}"` : "";
                const heightAttr = height ? ` height="${height}"` : "";
                return `<img src="${escapeHTML(src)}" alt="${escapeHTML(alt)}"${widthAttr}${heightAttr} />`;
            }

            if (isButtonBlock(block)) {
                const buttonContent = block.content as ButtonContent;
                if (
                    typeof buttonContent !== "object" ||
                    !buttonContent?.text ||
                    !buttonContent?.url
                ) {
                    return "";
                }
                const { url, text } = buttonContent;
                return `<a href="${escapeHTML(url)}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 4px;">${escapeHTML(text)}</a>`;
            }

            if (isDividerBlock(block)) {
                const dividerContent = block.content as DividerContent;
                const style =
                    typeof dividerContent === "object" && dividerContent?.style
                        ? dividerContent.style
                        : "solid";
                return `<hr style="border: none; border-top: 1px ${style} #e5e7eb; margin: 20px 0;" />`;
            }

            // Return empty string for unknown block types
            return "";
        })
        .filter((html) => html !== "") // Remove empty strings
        .join("\n");
}

/**
 * Converts an array of blocks to a JSON string.
 *
 * Serializes the block structure to JSON format for storage or transmission.
 * Includes proper formatting for readability.
 *
 * @param {Block[]} blocks - Array of blocks to convert to JSON
 * @param {boolean} [pretty=true] - Whether to format JSON with indentation
 * @returns {string} JSON string representation of blocks
 *
 * @example
 * const blocks = [{ id: '1', type: 'text', content: 'Hello' }];
 * const json = blocksToJSON(blocks);
 * // Returns formatted JSON string
 */
export function blocksToJSON(blocks: Block[], pretty: boolean = true): string {
    return pretty ? JSON.stringify(blocks, null, 2) : JSON.stringify(blocks);
}

/**
 * Parses a JSON string to an array of blocks.
 *
 * Deserializes JSON data back into block structure with validation.
 * Returns empty array if parsing fails.
 *
 * @param {string} json - JSON string to parse
 * @returns {Block[]} Array of blocks, or empty array if parsing fails
 *
 * @example
 * const json = '[{"id":"1","type":"text","content":"Hello"}]';
 * const blocks = blocksFromJSON(json);
 * // Returns: [{ id: '1', type: 'text', content: 'Hello' }]
 */
export function blocksFromJSON(json: string): Block[] {
    try {
        const parsed = JSON.parse(json);
        // Basic validation - ensure it's an array
        if (!Array.isArray(parsed)) {
            console.error("Invalid JSON: expected array of blocks");
            return [];
        }
        return parsed as Block[];
    } catch (error) {
        console.error("Failed to parse blocks from JSON:", error);
        return [];
    }
}

/**
 * Escapes HTML special characters to prevent XSS attacks.
 *
 * Converts special characters to their HTML entity equivalents.
 *
 * @param {string} text - Text to escape
 * @returns {string} Escaped text safe for HTML insertion
 *
 * @example
 * escapeHTML('<script>alert("xss")</script>')
 * // Returns: "&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;"
 */
function escapeHTML(text: string): string {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Generates a complete HTML email template with proper structure.
 *
 * Wraps blocks in a full HTML document with email-compatible styling
 * and structure. Includes proper DOCTYPE, meta tags, and container elements.
 *
 * @param {Block[]} blocks - Array of blocks to include in the template
 * @param {Object} [options] - Optional configuration
 * @param {string} [options.title] - Email title for meta tags
 * @param {string} [options.backgroundColor] - Body background color
 * @param {string} [options.contentBackgroundColor] - Content container background
 * @param {number} [options.maxWidth] - Maximum width of content container
 * @returns {string} Complete HTML email template
 *
 * @example
 * const html = generateEmailTemplate(blocks, {
 *   title: 'Welcome Email',
 *   backgroundColor: '#f3f4f6',
 *   maxWidth: 600
 * });
 */
export function generateEmailTemplate(
    blocks: Block[],
    options?: {
        title?: string;
        backgroundColor?: string;
        contentBackgroundColor?: string;
        maxWidth?: number;
    }
): string {
    const {
        title = "Email Template",
        backgroundColor = "#f3f4f6",
        contentBackgroundColor = "#ffffff",
        maxWidth = 600,
    } = options || {};

    const content = blocksToHTML(blocks);

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>${escapeHTML(title)}</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background-color: ${backgroundColor};
        }
        .email-container {
            max-width: ${maxWidth}px;
            margin: 0 auto;
            background-color: ${contentBackgroundColor};
            padding: 20px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        ${content}
    </div>
</body>
</html>`;
}
