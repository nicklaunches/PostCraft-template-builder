import { createContext, useContext, useState, ReactNode } from "react";
import type { EmailStyles } from "@/types";
import { DEFAULT_EMAIL_STYLES } from "@/utils/constants";

/**
 * Email styles context type definition.
 *
 * @property {EmailStyles} emailStyles - Current email styling configuration
 * @property {<K extends keyof EmailStyles>(key: K, value: EmailStyles[K]) => void} updateEmailStyle - Update a specific style property
 * @property {() => void} resetEmailStyles - Reset all styles to defaults
 */
interface EmailStylesContextType {
    emailStyles: EmailStyles;
    updateEmailStyle: <K extends keyof EmailStyles>(key: K, value: EmailStyles[K]) => void;
    resetEmailStyles: () => void;
}

const EmailStylesContext = createContext<EmailStylesContextType | undefined>(undefined);

/**
 * Email styles provider component.
 *
 * Manages email-wide styling configuration including fonts, colors, spacing,
 * borders, and other visual properties. Provides methods to update individual
 * style properties or reset to defaults.
 *
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child components to wrap
 * @returns {JSX.Element} Provider component
 *
 * @example
 * <EmailStylesProvider>
 *   <YourComponent />
 * </EmailStylesProvider>
 */
export function EmailStylesProvider({ children }: { children: ReactNode }) {
    const [emailStyles, setEmailStyles] = useState<EmailStyles>(DEFAULT_EMAIL_STYLES);

    const updateEmailStyle = <K extends keyof EmailStyles>(key: K, value: EmailStyles[K]) => {
        setEmailStyles((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const resetEmailStyles = () => {
        setEmailStyles(DEFAULT_EMAIL_STYLES);
    };

    return (
        <EmailStylesContext.Provider
            value={{
                emailStyles,
                updateEmailStyle,
                resetEmailStyles,
            }}
        >
            {children}
        </EmailStylesContext.Provider>
    );
}

/**
 * Hook to access email styles context.
 *
 * Provides access to email styling configuration and update functions.
 * Must be used within an EmailStylesProvider component.
 *
 * @returns {EmailStylesContextType} Email styles context value
 * @throws {Error} If used outside of EmailStylesProvider
 *
 * @example
 * const { emailStyles, updateEmailStyle, resetEmailStyles } = useEmailStyles();
 * updateEmailStyle('font', 'Arial');
 */
export function useEmailStyles() {
    const context = useContext(EmailStylesContext);
    if (context === undefined) {
        throw new Error("useEmailStyles must be used within an EmailStylesProvider");
    }
    return context;
}
