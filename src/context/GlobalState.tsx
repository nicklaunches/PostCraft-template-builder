import { createContext, useContext, useState, ReactNode } from "react";

/**
 * Email styling configuration interface.
 *
 * @property {string} font - Primary font family
 * @property {string} fallback - Fallback font family
 * @property {{ horizontal: number; vertical: number }} padding - Inner spacing
 * @property {string} bodyColor - Text color (hex)
 * @property {{ horizontal: number; vertical: number }} margin - Outer spacing
 * @property {string} backgroundColor - Background color (hex)
 * @property {number} radius - Border radius in pixels
 * @property {number} borderWidth - Border width in pixels
 * @property {string} borderColor - Border color (hex)
 */
export interface EmailStyles {
    font: string;
    fallback: string;
    padding: { horizontal: number; vertical: number };
    bodyColor: string;
    margin: { horizontal: number; vertical: number };
    backgroundColor: string;
    radius: number;
    borderWidth: number;
    borderColor: string;
}

/**
 * Global state context type definition.
 *
 * @property {EmailStyles} emailStyles - Current email styling configuration
 * @property {<K extends keyof EmailStyles>(key: K, value: EmailStyles[K]) => void} updateEmailStyle - Update a specific style property
 * @property {() => void} resetEmailStyles - Reset all styles to defaults
 */
interface GlobalStateContextType {
    emailStyles: EmailStyles;
    updateEmailStyle: <K extends keyof EmailStyles>(key: K, value: EmailStyles[K]) => void;
    resetEmailStyles: () => void;
}

const defaultEmailStyles: EmailStyles = {
    font: "Inter",
    fallback: "sans-serif",
    padding: { horizontal: 24, vertical: 12 },
    bodyColor: "",
    margin: { horizontal: 0, vertical: 24 },
    backgroundColor: "",
    radius: 0,
    borderWidth: 0,
    borderColor: "",
};

const GlobalStateContext = createContext<GlobalStateContextType | undefined>(undefined);

/**
 * Global state provider component.
 *
 * Provides access to global email styling configuration and update methods
 * throughout the component tree via React context.
 *
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child components to wrap
 * @returns {JSX.Element} Provider component
 */
export function GlobalStateProvider({ children }: { children: ReactNode }) {
    const [emailStyles, setEmailStyles] = useState<EmailStyles>(defaultEmailStyles);

    const updateEmailStyle = <K extends keyof EmailStyles>(key: K, value: EmailStyles[K]) => {
        setEmailStyles((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const resetEmailStyles = () => {
        setEmailStyles(defaultEmailStyles);
    };

    return (
        <GlobalStateContext.Provider value={{ emailStyles, updateEmailStyle, resetEmailStyles }}>
            {children}
        </GlobalStateContext.Provider>
    );
}

/**
 * Hook to access global state context.
 *
 * Provides access to email styles and update functions. Must be used
 * within a GlobalStateProvider component.
 *
 * @returns {GlobalStateContextType} Global state context value
 * @throws {Error} If used outside of GlobalStateProvider
 */
export function useGlobalState() {
    const context = useContext(GlobalStateContext);
    if (context === undefined) {
        throw new Error("useGlobalState must be used within a GlobalStateProvider");
    }
    return context;
}
