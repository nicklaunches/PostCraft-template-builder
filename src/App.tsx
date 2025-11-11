import TemplateBuilder from "@/components/layout/TemplateBuilder";
import { GlobalStateProvider } from "@/context/GlobalState";
import { useTemplateBuilder } from "@/hooks/useTemplateBuilder";
import { useEditor } from "@/hooks/useEditor";

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
