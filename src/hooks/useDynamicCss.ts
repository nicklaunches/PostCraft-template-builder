import { useMemo, useEffect } from "react";
import type { EmailStyles } from "@/types";
import { generateClassName, generateEmailCSS } from "@/utils";

/**
 * Custom hook for generating dynamic CSS from email styles.
 *
 * Creates CSS rules based on email styling configuration and applies them
 * to a class name stored in the email styles. If no className exists,
 * generates a new one. Automatically memoizes the result for performance.
 *
 * Uses the extracted CSS generator utility for cleaner separation of concerns.
 *
 * @param {EmailStyles} emailStyles - Email styling configuration object
 * @param {(key: "className", value: string) => void} updateEmailStyle - Function to update className in global state
 *
 * @returns {Object} Object containing the generated CSS and className
 * @returns {string} css - Generated CSS string
 * @returns {string} className - CSS class name used
 */
export function useDynamicCss(
    emailStyles: EmailStyles,
    updateEmailStyle: <K extends keyof EmailStyles>(key: K, value: EmailStyles[K]) => void
): { css: string; className: string } {
    // Generate className based on email styles content hash
    useEffect(() => {
        if (!emailStyles.className) {
            // Create a stable string representation of email styles for hashing
            const contentString = JSON.stringify({
                font: emailStyles.font,
                fallback: emailStyles.fallback,
                backgroundColor: emailStyles.backgroundColor,
                contentBackgroundColor: emailStyles.contentBackgroundColor,
                bodyColor: emailStyles.bodyColor,
                borderColor: emailStyles.borderColor,
                paddingLeft: emailStyles.paddingLeft,
                paddingRight: emailStyles.paddingRight,
                paddingTop: emailStyles.paddingTop,
                paddingBottom: emailStyles.paddingBottom,
                marginLeft: emailStyles.marginLeft,
                marginRight: emailStyles.marginRight,
                marginTop: emailStyles.marginTop,
                marginBottom: emailStyles.marginBottom,
                radius: emailStyles.radius,
                borderWidth: emailStyles.borderWidth,
            });
            const newClassName = generateClassName(contentString);
            updateEmailStyle("className", newClassName);
        }
    }, [emailStyles.className, updateEmailStyle]);

    const className = emailStyles.className || "";

    // Use the extracted CSS generator
    const css = useMemo(() => generateEmailCSS(emailStyles, className), [className, emailStyles]);

    return { css, className };
}
