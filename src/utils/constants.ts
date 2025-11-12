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
 * Default block-level styling configuration for paragraphs.
 * Applied to new paragraph blocks and used as fallback values.
 */
export const DEFAULT_P_STYLES: Readonly<BlockStyles> = {
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
    fontSize: 15,
    lineHeight: 150,
    color: "#000000",
} as const;

/**
 * Default styling for H1 heading blocks.
 */
export const DEFAULT_H1_STYLES: Readonly<BlockStyles> = {
    alignment: "left",
    borderWidth: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 12,
    paddingBottom: 4,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    marginBottom: 0,
    backgroundColor: "",
    fontSize: 30,
    lineHeight: 107,
    color: "#000000",
} as const;

/**
 * Default styling for H2 heading blocks.
 */
export const DEFAULT_H2_STYLES: Readonly<BlockStyles> = {
    alignment: "left",
    borderWidth: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 12,
    paddingBottom: 4,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    marginBottom: 0,
    backgroundColor: "",
    fontSize: 24,
    lineHeight: 133,
    color: "#000000",
} as const;

/**
 * Default styling for H3 heading blocks.
 */
export const DEFAULT_H3_STYLES: Readonly<BlockStyles> = {
    alignment: "left",
    borderWidth: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 12,
    paddingBottom: 4,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    marginBottom: 0,
    backgroundColor: "",
    fontSize: 20,
    lineHeight: 160,
    color: "#000000",
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
