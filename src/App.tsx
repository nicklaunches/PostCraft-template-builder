import TemplateBuilder from "@/components/layout/TemplateBuilder";
import { GlobalStateProvider } from "@/context/GlobalState";
import { useTemplateBuilder } from "@/hooks/useTemplateBuilder";
import { useEditor } from "@/hooks/useEditor";

/**
 * Main application component.
 *
 * Initializes the template builder and editor hooks, sets up global state
 * provider, and handles save operations. Serves as the root component for
 * the PostCraft template builder application.
 *
 * @returns {JSX.Element} App component
 */
export default function App() {
    const builder = useTemplateBuilder();
    const editor = useEditor();

    const handleSave = async () => {
        const html = editor.exportToHTML();

        console.log("Template Builder State:", builder.template);
        console.log("Exported HTML:", html);
    };

    return (
        <GlobalStateProvider>
            <TemplateBuilder onSave={handleSave} />
        </GlobalStateProvider>
    );
}
