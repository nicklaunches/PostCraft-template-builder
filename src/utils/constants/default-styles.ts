import type { EmailStyles, BlockStyles } from "@/types";

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
    borderRadius: 0,
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
    borderRadius: 0,
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
    borderRadius: 0,
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
    borderRadius: 0,
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
 * Default styling for ordered list (numbered list) blocks.
 * Note: paddingLeft of 0 means only the base 26px will be applied.
 * User adjustments will be added on top of the base value.
 */
export const DEFAULT_OL_STYLES: Readonly<BlockStyles> = {
    alignment: "left",
    borderRadius: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 16,
    marginBottom: 16,
    backgroundColor: "",
    fontSize: 15,
    lineHeight: 150,
    color: "#000000",
} as const;

/**
 * Default styling for bullet list (unordered list) blocks.
 * Note: paddingLeft of 0 means only the base 26px will be applied.
 * User adjustments will be added on top of the base value.
 */
export const DEFAULT_UL_STYLES: Readonly<BlockStyles> = {
    alignment: "left",
    borderRadius: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 16,
    marginBottom: 16,
    backgroundColor: "",
    fontSize: 15,
    lineHeight: 150,
    color: "#000000",
} as const;
