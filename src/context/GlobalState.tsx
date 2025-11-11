import { createContext, useContext, useState, ReactNode } from "react";

/**
 * Email styling configuration interface.
 *
 * @property {string} [className] - Unique CSS class name for the template
 * @property {string} font - Primary font family
 * @property {string} fallback - Fallback font family
 * @property {{ horizontal: number; vertical: number }} padding - Inner spacing
 * @property {string} bodyColor - Text color (hex)
 * @property {{ horizontal: number; vertical: number }} margin - Outer spacing
 * @property {string} backgroundColor - Page background color (hex)
 * @property {string} contentBackgroundColor - Content container background color (hex)
 * @property {number} radius - Border radius in pixels
 * @property {number} borderWidth - Border width in pixels
 * @property {string} borderColor - Border color (hex)
 */
export interface EmailStyles {
    className?: string;
    font: string;
    fallback: string;
    padding: { horizontal: number; vertical: number };
    bodyColor: string;
    margin: { horizontal: number; vertical: number };
    backgroundColor: string;
    contentBackgroundColor: string;
    radius: number;
    borderWidth: number;
    borderColor: string;
}

/**
 * Block styling configuration interface.
 *
 * @property {"left" | "center" | "right"} alignment - Text/content alignment
 * @property {number} borderWidth - Border width in pixels
 * @property {{ horizontal: number; vertical: number }} padding - Inner spacing (X and Y)
 * @property {string} backgroundColor - Background color (hex)
 */
export interface BlockStyles {
    alignment: "left" | "center" | "right";
    borderWidth: number;
    padding: { horizontal: number; vertical: number };
    backgroundColor: string;
}

/**
 * Global state context type definition.
 *
 * @property {EmailStyles} emailStyles - Current email styling configuration
 * @property {<K extends keyof EmailStyles>(key: K, value: EmailStyles[K]) => void} updateEmailStyle - Update a specific style property
 * @property {() => void} resetEmailStyles - Reset all styles to defaults
 * @property {BlockStyles} blockStyles - Current block styling configuration
 * @property {<K extends keyof BlockStyles>(key: K, value: BlockStyles[K]) => void} updateBlockStyle - Update a specific block style property
 * @property {() => void} resetBlockStyles - Reset all block styles to defaults
 */
interface GlobalStateContextType {
    emailStyles: EmailStyles;
    updateEmailStyle: <K extends keyof EmailStyles>(key: K, value: EmailStyles[K]) => void;
    resetEmailStyles: () => void;
    blockStyles: BlockStyles;
    updateBlockStyle: <K extends keyof BlockStyles>(key: K, value: BlockStyles[K]) => void;
    resetBlockStyles: () => void;
}

const defaultEmailStyles: EmailStyles = {
    font: "Inter",
    fallback: "sans-serif",
    padding: { horizontal: 24, vertical: 12 },
    bodyColor: "",
    margin: { horizontal: 0, vertical: 24 },
    backgroundColor: "#f3f4f6",
    contentBackgroundColor: "",
    radius: 0,
    borderWidth: 0,
    borderColor: "",
};

const defaultBlockStyles: BlockStyles = {
    alignment: "left",
    borderWidth: 0,
    padding: { horizontal: 0, vertical: 0 },
    backgroundColor: "",
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
    const [blockStyles, setBlockStyles] = useState<BlockStyles>(defaultBlockStyles);

    const updateEmailStyle = <K extends keyof EmailStyles>(key: K, value: EmailStyles[K]) => {
        setEmailStyles((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const resetEmailStyles = () => {
        setEmailStyles(defaultEmailStyles);
    };

    const updateBlockStyle = <K extends keyof BlockStyles>(key: K, value: BlockStyles[K]) => {
        setBlockStyles((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const resetBlockStyles = () => {
        setBlockStyles(defaultBlockStyles);
    };

    return (
        <GlobalStateContext.Provider
            value={{
                emailStyles,
                updateEmailStyle,
                resetEmailStyles,
                blockStyles,
                updateBlockStyle,
                resetBlockStyles,
            }}
        >
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
