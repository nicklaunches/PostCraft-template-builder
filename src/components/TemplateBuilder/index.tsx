"use client";

import Nav from "../Nav";
import LeftSidebar from "../LeftSidebar";
import ContentEditor from "../ContentEditor";
import RightSidebar from "../RightSidebar";

export interface TemplateBuilderProps {
    showNav?: boolean;
    showLeftSidebar?: boolean;
    showRightSidebar?: boolean;
    onSave?: (content: any) => void;
    initialContent?: any;
}

export default function TemplateBuilder({
    showNav = true,
    showLeftSidebar = true,
    showRightSidebar = true,
    onSave,
    initialContent,
}: TemplateBuilderProps) {
    return (
        <div className="flex h-screen flex-col">
            {showNav && <Nav />}
            <div className="flex flex-1 overflow-hidden">
                {showLeftSidebar && <LeftSidebar />}
                <ContentEditor initialContent={initialContent} onSave={onSave} />
                {showRightSidebar && <RightSidebar />}
            </div>
        </div>
    );
}
