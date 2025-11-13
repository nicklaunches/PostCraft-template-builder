import type { EmailStyles, BlockStyles } from "@/types";

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
 * Base margin for list elements to accommodate list markers (bullets/numbers).
 * This value is added to any user-defined marginLeft.
 */
const LIST_BASE_MARGIN_LEFT = 26;

/**
 * Generates inline style object for list block styles (ordered/bullet lists).
 *
 * Lists require special handling for margin-left:
 * - A base margin of 26px is always applied to accommodate list markers
 * - User's paddingLeft value is converted to ADDITIONAL margin-left
 * - Example: base 26px + user's 20px padding = 46px total margin-left
 * - This moves the entire list (including numbers/bullets) to the right
 *
 * @param {BlockStyles} styles - Block styling configuration
 * @returns {React.CSSProperties} Inline style object with list-specific margin
 *
 * @example
 * <ol style={generateListInlineStyles(blockStyles)}>
 *   <li>Item 1</li>
 * </ol>
 */
export function generateListInlineStyles(styles: BlockStyles): React.CSSProperties {
    const inlineStyles: React.CSSProperties = {};

    // Calculate total margin-left: base margin + user's padding (treated as additional margin)
    const totalMarginLeft = LIST_BASE_MARGIN_LEFT + styles.paddingLeft;

    // Set margin with the calculated left margin
    // User's paddingLeft becomes additional margin-left for lists
    inlineStyles.margin = `${styles.marginTop}px ${styles.marginRight}px ${styles.marginBottom}px ${totalMarginLeft}px`;

    // Apply other padding (top, right, bottom) normally, but not left
    if (styles.paddingRight > 0 || styles.paddingTop > 0 || styles.paddingBottom > 0) {
        inlineStyles.padding = `${styles.paddingTop}px ${styles.paddingRight}px ${styles.paddingBottom}px 0`;
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
