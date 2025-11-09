"use client";

import TemplateBuilder from "@/components/TemplateBuilder";
import { useTemplateBuilder } from "@/hooks/useTemplateBuilder";
import { useEditor } from "@/hooks/useEditor";

export default function Home() {
    const builder = useTemplateBuilder();
    const editor = useEditor();

    const handleSave = async () => {
        const html = editor.exportToHTML();

        console.log("Template Builder State:", builder.template);
        console.log("Exported HTML:", html);
    };

    return <TemplateBuilder onSave={handleSave} />;
}
