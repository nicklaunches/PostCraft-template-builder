import { TemplateBuilder } from "@/components/TemplateBuilder";

/**
 * Main application component.
 *
 * Demonstrates basic usage of the TemplateBuilder component,
 * which includes all necessary providers, error handling, and loading states.
 *
 * @returns {JSX.Element} App component
 */
export function App() {
    const handleSave = async () => {
        // Custom save logic can be added here
        console.log("Custom save handler called");
    };

    return <TemplateBuilder onSave={handleSave} />;
}
