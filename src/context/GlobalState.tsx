import { createContext, useContext, useState, ReactNode } from "react";

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

export function useGlobalState() {
    const context = useContext(GlobalStateContext);
    if (context === undefined) {
        throw new Error("useGlobalState must be used within a GlobalStateProvider");
    }
    return context;
}
