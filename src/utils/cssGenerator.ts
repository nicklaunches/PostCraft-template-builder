import type { EmailStyles, BlockStyles } from "@/types";

/**
 * Generates CSS rules for email-wide styles.
 *
 * Creates CSS string with font, spacing, colors, borders, and other
 * email-level styling properties applied to a specified class name.
 *
 * @param {EmailStyles} styles - Email styling configuration
 * @param {string} className - CSS class name to apply styles to
 * @returns {string} Generated CSS rules as a string
 *
 * @example
 * const css = generateEmailCSS(emailStyles, "email-abc123");
 * // Returns: ".email-abc123 { font-family: Arial, sans-serif; ... }"
 */
export function generateEmailCSS(styles: EmailStyles, className: string): string {
    let cssString = `.${className} {\n`;

    // Font family
    cssString += `  font-family: ${styles.font}, ${styles.fallback};\n`;

    // Padding (shorthand: top right bottom left)
    cssString += `  padding: ${styles.paddingTop}px ${styles.paddingRight}px ${styles.paddingBottom}px ${styles.paddingLeft}px;\n`;

    // Margin (shorthand: top right bottom left)
    cssString += `  margin: ${styles.marginTop}px ${styles.marginRight}px ${styles.marginBottom}px ${styles.marginLeft}px;\n`;

    // Text color
    if (styles.bodyColor) {
        cssString += `  color: ${styles.bodyColor};\n`;
    }

    // Background color
    if (styles.contentBackgroundColor) {
        cssString += `  background-color: ${styles.contentBackgroundColor};\n`;
    }

    // Border radius
    if (styles.radius > 0) {
        cssString += `  border-radius: ${styles.radius}px;\n`;
    }

    // Border
    if (styles.borderWidth > 0) {
        cssString += `  border-width: ${styles.borderWidth}px;\n`;
        cssString += `  border-style: solid;\n`;

        if (styles.borderColor) {
            cssString += `  border-color: ${styles.borderColor};\n`;
        }
    }

    cssString += `}`;
    return cssString;
}

/**
 * Generates CSS rules for block-level styles.
 *
 * Creates CSS string with alignment, spacing, colors, and borders
 * for individual content blocks.
 *
 * @param {BlockStyles} styles - Block styling configuration
 * @param {string} className - CSS class name to apply styles to
 * @returns {string} Generated CSS rules as a string
 *
 * @example
 * const css = generateBlockCSS(blockStyles, "block-xyz789");
 * // Returns: ".block-xyz789 { text-align: center; padding: 20px; ... }"
 */
export function generateBlockCSS(styles: BlockStyles, className: string): string {
    let cssString = `.${className} {\n`;

    // Text alignment
    if (styles.alignment) {
        cssString += `  text-align: ${styles.alignment};\n`;
    }

    // Padding (shorthand: top right bottom left)
    cssString += `  padding: ${styles.paddingTop}px ${styles.paddingRight}px ${styles.paddingBottom}px ${styles.paddingLeft}px;\n`;

    // Margin (shorthand: top right bottom left)
    cssString += `  margin: ${styles.marginTop}px ${styles.marginRight}px ${styles.marginBottom}px ${styles.marginLeft}px;\n`;

    // Background color
    if (styles.backgroundColor) {
        cssString += `  background-color: ${styles.backgroundColor};\n`;
    }

    // Border radius
    if (styles.borderRadius > 0) {
        cssString += `  border-radius: ${styles.borderRadius}px;\n`;
    }

    cssString += `}`;
    return cssString;
}

/**
 * Generates inline style object for email-wide styles.
 *
 * Useful for React components that need inline styles instead of CSS classes.
 *
 * @param {EmailStyles} styles - Email styling configuration
 * @returns {React.CSSProperties} Inline style object
 *
 * @example
 * <div style={generateEmailInlineStyles(emailStyles)}>
 *   Content
 * </div>
 */
export function generateEmailInlineStyles(styles: EmailStyles): React.CSSProperties {
    const inlineStyles: React.CSSProperties = {
        fontFamily: `${styles.font}, ${styles.fallback}`,
        padding: `${styles.paddingTop}px ${styles.paddingRight}px ${styles.paddingBottom}px ${styles.paddingLeft}px`,
        margin: `${styles.marginTop}px ${styles.marginRight}px ${styles.marginBottom}px ${styles.marginLeft}px`,
    };

    if (styles.bodyColor) {
        inlineStyles.color = styles.bodyColor;
    }

    if (styles.contentBackgroundColor) {
        inlineStyles.backgroundColor = styles.contentBackgroundColor;
    }

    if (styles.radius > 0) {
        inlineStyles.borderRadius = `${styles.radius}px`;
    }

    if (styles.borderWidth > 0) {
        inlineStyles.borderWidth = `${styles.borderWidth}px`;
        inlineStyles.borderStyle = "solid";

        if (styles.borderColor) {
            inlineStyles.borderColor = styles.borderColor;
        }
    }

    return inlineStyles;
}

/**
 * Generates inline style object for block-level styles.
 *
 * Useful for React components that need inline styles instead of CSS classes.
 *
 * @param {BlockStyles} styles - Block styling configuration
 * @returns {React.CSSProperties} Inline style object
 *
 * @example
 * <div style={generateBlockInlineStyles(blockStyles)}>
 *   Block content
 * </div>
 */
export function generateBlockInlineStyles(styles: BlockStyles): React.CSSProperties {
    const inlineStyles: React.CSSProperties = {};

    // Only add padding if any value is non-zero
    if (
        styles.paddingLeft > 0 ||
        styles.paddingRight > 0 ||
        styles.paddingTop > 0 ||
        styles.paddingBottom > 0
    ) {
        inlineStyles.padding = `${styles.paddingTop}px ${styles.paddingRight}px ${styles.paddingBottom}px ${styles.paddingLeft}px`;
    }

    // Only add margin if any value is non-zero
    if (
        styles.marginLeft > 0 ||
        styles.marginRight > 0 ||
        styles.marginTop > 0 ||
        styles.marginBottom > 0
    ) {
        inlineStyles.margin = `${styles.marginTop}px ${styles.marginRight}px ${styles.marginBottom}px ${styles.marginLeft}px`;
    }

    if (styles.alignment) {
        inlineStyles.textAlign = styles.alignment;
    }

    if (styles.backgroundColor) {
        inlineStyles.backgroundColor = styles.backgroundColor;
    }

    if (styles.borderRadius > 0) {
        inlineStyles.borderRadius = `${styles.borderRadius}px`;
    }

    if (styles.fontSize > 0) {
        inlineStyles.fontSize = `${styles.fontSize}px`;
    }

    if (styles.lineHeight > 0) {
        inlineStyles.lineHeight = `${styles.lineHeight}%`;
    }

    if (styles.color) {
        inlineStyles.color = styles.color;
    }

    return inlineStyles;
}

/**
 * Generates a complete CSS stylesheet from email and block styles.
 *
 * Combines email-wide styles and all block styles into a single CSS string
 * that can be injected into a style tag or saved to a file.
 *
 * @param {EmailStyles} emailStyles - Email styling configuration
 * @param {string} emailClassName - CSS class name for email container
 * @param {Array<{id: string, styles: BlockStyles}>} blocks - Array of blocks with their styles
 * @returns {string} Complete CSS stylesheet
 *
 * @example
 * const stylesheet = generateCompleteStylesheet(
 *   emailStyles,
 *   "email-abc123",
 *   [
 *     { id: "block-1", styles: blockStyles1 },
 *     { id: "block-2", styles: blockStyles2 }
 *   ]
 * );
 */
export function generateCompleteStylesheet(
    emailStyles: EmailStyles,
    emailClassName: string,
    blocks: Array<{ id: string; styles: BlockStyles }>
): string {
    let stylesheet = "/* Email Styles */\n";
    stylesheet += generateEmailCSS(emailStyles, emailClassName);
    stylesheet += "\n\n";

    if (blocks.length > 0) {
        stylesheet += "/* Block Styles */\n";
        blocks.forEach((block, index) => {
            stylesheet += generateBlockCSS(block.styles, `block-${block.id}`);
            if (index < blocks.length - 1) {
                stylesheet += "\n\n";
            }
        });
    }

    return stylesheet;
}

/**
 * Minifies CSS by removing whitespace and line breaks.
 *
 * Useful for production builds to reduce CSS file size.
 *
 * @param {string} css - CSS string to minify
 * @returns {string} Minified CSS string
 *
 * @example
 * const minified = minifyCSS(css);
 * // ".email{font-family:Arial,sans-serif;padding:20px;}"
 */
export function minifyCSS(css: string): string {
    return css
        .replace(/\s+/g, " ") // Replace multiple spaces with single space
        .replace(/\s*{\s*/g, "{") // Remove spaces around {
        .replace(/\s*}\s*/g, "}") // Remove spaces around }
        .replace(/\s*:\s*/g, ":") // Remove spaces around :
        .replace(/\s*;\s*/g, ";") // Remove spaces around ;
        .replace(/;\s*}/g, "}") // Remove trailing semicolons before }
        .trim();
}

/**
 * Adds vendor prefixes to CSS properties that need them.
 *
 * Enhances cross-browser compatibility for modern CSS properties.
 *
 * @param {string} css - CSS string to add prefixes to
 * @returns {string} CSS with vendor prefixes
 *
 * @example
 * const prefixed = addVendorPrefixes(css);
 * // Adds -webkit-, -moz-, etc. where needed
 */
export function addVendorPrefixes(css: string): string {
    // Add -webkit- prefix for border-radius (for older Safari)
    css = css.replace(/border-radius:\s*([^;]+);/g, (_match, value) => {
        return `-webkit-border-radius: ${value};\n  border-radius: ${value};`;
    });

    // Add -webkit- prefix for box-shadow if present
    css = css.replace(/box-shadow:\s*([^;]+);/g, (_match, value) => {
        return `-webkit-box-shadow: ${value};\n  box-shadow: ${value};`;
    });

    return css;
}
