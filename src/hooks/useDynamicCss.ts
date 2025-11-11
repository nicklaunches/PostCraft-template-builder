import { useMemo } from "react";
import { EmailStyles } from "@/context/GlobalState";

/**
 * Custom hook for generating dynamic CSS from email styles.
 *
 * Creates CSS rules based on email styling configuration and applies them
 * to a specified class name. Automatically memoizes the result for performance.
 *
 * @param {string} className - CSS class name to apply styles to
 * @param {EmailStyles} emailStyles - Email styling configuration object
 *
 * @returns {string} Generated CSS string
 */
export function useDynamicCss(className: string, emailStyles: EmailStyles): string {
    return useMemo(() => {
        let css = `.${className} {\n`;

        css += `  font-family: ${emailStyles.font}, ${emailStyles.fallback};\n`;
        css += `  padding: ${emailStyles.padding.vertical}px ${emailStyles.padding.horizontal}px;\n`;
        css += `  margin: ${emailStyles.margin.vertical}px ${emailStyles.margin.horizontal}px;\n`;

        if (emailStyles.bodyColor) {
            css += `  color: ${emailStyles.bodyColor};\n`;
        }

        if (emailStyles.backgroundColor) {
            css += `  background-color: ${emailStyles.backgroundColor};\n`;
        }

        if (emailStyles.radius > 0) {
            css += `  border-radius: ${emailStyles.radius}px;\n`;
        }

        if (emailStyles.borderWidth > 0) {
            css += `  border-width: ${emailStyles.borderWidth}px;\n`;
            css += `  border-style: solid;\n`;

            if (emailStyles.borderColor) {
                css += `  border-color: ${emailStyles.borderColor};\n`;
            }
        }

        css += `}`;
        return css;
    }, [className, emailStyles]);
}
