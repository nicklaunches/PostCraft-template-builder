import { useMemo, useEffect } from "react";
import type { EmailStyles } from "@/types";
import { generateClassName } from "@/utils/helpers";

/**
 * Custom hook for generating dynamic CSS from email styles.
 *
 * Creates CSS rules based on email styling configuration and applies them
 * to a class name stored in the email styles. If no className exists,
 * generates a new one. Automatically memoizes the result for performance.
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
    // Generate className if it doesn't exist
    useEffect(() => {
        if (!emailStyles.className) {
            const newClassName = generateClassName();
            updateEmailStyle("className", newClassName);
        }
    }, [emailStyles.className, updateEmailStyle]);

    const className = emailStyles.className || "";

    const css = useMemo(() => {
        let cssString = `.${className} {\n`;

        cssString += `  font-family: ${emailStyles.font}, ${emailStyles.fallback};\n`;
        cssString += `  padding: ${emailStyles.paddingTop}px ${emailStyles.paddingRight}px ${emailStyles.paddingBottom}px ${emailStyles.paddingLeft}px;\n`;
        cssString += `  margin: ${emailStyles.marginTop}px ${emailStyles.marginRight}px ${emailStyles.marginBottom}px ${emailStyles.marginLeft}px;\n`;

        if (emailStyles.bodyColor) {
            cssString += `  color: ${emailStyles.bodyColor};\n`;
        }

        if (emailStyles.contentBackgroundColor) {
            cssString += `  background-color: ${emailStyles.contentBackgroundColor};\n`;
        }

        if (emailStyles.radius > 0) {
            cssString += `  border-radius: ${emailStyles.radius}px;\n`;
        }

        if (emailStyles.borderWidth > 0) {
            cssString += `  border-width: ${emailStyles.borderWidth}px;\n`;
            cssString += `  border-style: solid;\n`;

            if (emailStyles.borderColor) {
                cssString += `  border-color: ${emailStyles.borderColor};\n`;
            }
        }

        cssString += `}`;
        return cssString;
    }, [className, emailStyles]);

    return { css, className };
}
