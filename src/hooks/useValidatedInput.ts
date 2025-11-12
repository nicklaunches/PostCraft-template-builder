import { useState } from "react";

/**
 * Configuration for the validated input hook.
 *
 * @template T - The type of the validated value
 * @property {T} [value] - Controlled value from parent
 * @property {T} defaultValue - Default value if uncontrolled or invalid
 * @property {(value: T) => void} [onChange] - Callback when value changes
 * @property {(value: unknown) => boolean} validate - Validation function
 * @property {(value: unknown) => T} sanitize - Sanitization function
 * @property {boolean} [showValidation] - Whether to show validation feedback (default: false)
 */
export interface UseValidatedInputConfig<T> {
    value?: T;
    defaultValue: T;
    onChange?: (value: T) => void;
    validate: (value: unknown) => boolean;
    sanitize: (value: unknown) => T;
    showValidation?: boolean;
}

/**
 * Return type for the validated input hook.
 *
 * @template T - The type of the validated value
 * @template D - The type of the display value (usually string)
 * @property {D} displayValue - The value to display in the input
 * @property {boolean} isInvalid - Whether the current input is invalid
 * @property {(rawValue: string) => void} handleChange - Change handler
 * @property {() => void} handleBlur - Blur handler
 * @property {T} currentValue - The current validated value
 */
export interface UseValidatedInputReturn<T, D = T> {
    displayValue: D;
    isInvalid: boolean;
    handleChange: (rawValue: string) => void;
    handleBlur: () => void;
    currentValue: T;
}

/**
 * Reusable hook for managing validated input state.
 *
 * Provides consistent validation, sanitization, and error display logic
 * for input components. Handles local state during typing, validation
 * feedback, and blur sanitization.
 *
 * @template T - The type of the validated value
 * @param {UseValidatedInputConfig<T>} config - Hook configuration
 * @returns {UseValidatedInputReturn<T, string>} Input state and handlers
 *
 * @example
 * // Number input validation
 * const numberInput = useValidatedInput({
 *   value: props.value,
 *   defaultValue: 0,
 *   onChange: props.onChange,
 *   validate: (val) => {
 *     const num = parseFloat(String(val));
 *     return !isNaN(num) && num >= min && num <= max;
 *   },
 *   sanitize: (val) => sanitizeNumber(val, { min, max }),
 *   showValidation: true,
 * });
 *
 * @example
 * // Color input validation
 * const colorInput = useValidatedInput({
 *   value: props.color,
 *   defaultValue: "#000000",
 *   onChange: props.onColorChange,
 *   validate: (val) => isValidHexColor(String(val)),
 *   sanitize: (val) => sanitizeHexColor(String(val)),
 *   showValidation: true,
 * });
 */
export function useValidatedInput<T>({
    value,
    defaultValue,
    onChange,
    validate,
    sanitize,
    showValidation = false,
}: UseValidatedInputConfig<T>): UseValidatedInputReturn<T, string> {
    const [isInvalid, setIsInvalid] = useState(false);
    const [localValue, setLocalValue] = useState<string>("");

    const currentValue = value ?? defaultValue;

    const handleChange = (rawValue: string) => {
        setLocalValue(rawValue);

        // Allow empty input or negative sign during typing
        if (rawValue === "" || rawValue === "-") {
            setIsInvalid(false);
            return;
        }

        const isValid = validate(rawValue);
        setIsInvalid(showValidation && !isValid);

        if (isValid) {
            const sanitized = sanitize(rawValue);
            onChange?.(sanitized);
        }
    };

    const handleBlur = () => {
        setLocalValue("");
        setIsInvalid(false);
        const sanitized = sanitize(currentValue);
        onChange?.(sanitized);
    };

    const displayValue = localValue !== "" ? localValue : String(currentValue);

    return {
        displayValue,
        isInvalid,
        handleChange,
        handleBlur,
        currentValue,
    };
}
