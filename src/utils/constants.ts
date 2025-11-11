import type { EmailStyles, BlockStyles } from "@/types";

/**
 * Block types supported by the email template builder.
 * Use const assertion for strict type safety.
 */
export const BLOCK_TYPES = ["text", "heading", "image", "button", "divider"] as const;

/**
 * Block type union derived from BLOCK_TYPES constant.
 */
export type BlockType = (typeof BLOCK_TYPES)[number];

/**
 * Default email-wide styling configuration.
 * Applied to new templates and used as fallback values.
 */
export const DEFAULT_EMAIL_STYLES: Readonly<EmailStyles> = {
    font: "Inter",
    fallback: "sans-serif",
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 12,
    paddingBottom: 12,
    bodyColor: "",
    marginLeft: 0,
    marginRight: 0,
    marginTop: 24,
    marginBottom: 24,
    backgroundColor: "#f3f4f6",
    contentBackgroundColor: "",
    radius: 0,
    borderWidth: 0,
    borderColor: "",
} as const;

/**
 * Default block-level styling configuration.
 * Applied to new blocks and used as fallback values.
 */
export const DEFAULT_BLOCK_STYLES: Readonly<BlockStyles> = {
    alignment: "left",
    borderWidth: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    marginBottom: 0,
    backgroundColor: "",
} as const;

/**
 * Available font options for email templates.
 */
export const FONT_OPTIONS = [
    { value: "Inter", label: "Inter" },
    { value: "Arial", label: "Arial" },
    { value: "Helvetica", label: "Helvetica" },
    { value: "Georgia", label: "Georgia" },
];

/**
 * Available font fallback options for email templates.
 */
export const FALLBACK_OPTIONS = [
    { value: "sans-serif", label: "Sans" },
    { value: "serif", label: "Serif" },
    { value: "monospace", label: "Mono" },
];

/**
 * Maximum number of history states to keep in undo/redo.
 * Prevents memory issues with very long editing sessions.
 */
export const MAX_HISTORY_SIZE = 50;
