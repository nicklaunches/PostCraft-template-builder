import type { Block } from "@/types";

/**
 * Button block content structure
 */
interface ButtonContent {
    url?: string;
    text?: string;
}

/**
 * Image block content structure
 */
interface ImageContent {
    src?: string;
    alt?: string;
}

/**
 * Converts an array of blocks to an HTML email template string.
 *
 * Generates email-compatible HTML from the block structure, handling different
 * block types (text, heading, image, button, divider) and their content.
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
            // Handle different block types
            switch (block.type) {
                case "text":
                    return `<p>${escapeHTML(String(block.content || ""))}</p>`;

                case "heading": {
                    const content = escapeHTML(String(block.content || ""));
                    // You can extend this to support different heading levels
                    return `<h2>${content}</h2>`;
                }

                case "image": {
                    const imgContent = block.content as ImageContent;
                    const src = imgContent?.src || "";
                    const alt = imgContent?.alt || "";
                    return `<img src="${escapeHTML(src)}" alt="${escapeHTML(alt)}" />`;
                }

                case "button": {
                    const btnContent = block.content as ButtonContent;
                    const url = btnContent?.url || "#";
                    const text = btnContent?.text || "Click here";
                    return `<a href="${escapeHTML(url)}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 4px;">${escapeHTML(text)}</a>`;
                }

                case "divider":
                    return `<hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />`;

                default:
                    // Return empty string for unknown block types
                    return "";
            }
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
