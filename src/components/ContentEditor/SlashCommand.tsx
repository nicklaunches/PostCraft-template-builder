import { Extension } from "@tiptap/core";
import Suggestion from "@tiptap/suggestion";
import { ReactRenderer } from "@tiptap/react";
import tippy, { Instance } from "tippy.js";
import CommandList from "./CommandList";

export const SlashCommand = Extension.create({
    name: "slashCommand",

    addOptions() {
        return {
            suggestion: {
                char: "/",
                command: ({ editor, range, props }: any) => {
                    console.log("Command triggered!", { editor, range, props });
                    props.command({ editor, range });
                },
            },
        };
    },

    addProseMirrorPlugins() {
        console.log("SlashCommand plugin is being added to editor");
        return [
            Suggestion({
                editor: this.editor,
                ...this.options.suggestion,
            }),
        ];
    },

    onCreate() {
        console.log("SlashCommand extension created");
    },
});

export const suggestion = {
    items: ({ query }: { query: string }) => {
        console.log("Items called with query:", query);
        return [
            {
                title: "Heading 1",
                command: ({ editor, range }: any) => {
                    editor
                        .chain()
                        .focus()
                        .deleteRange(range)
                        .setNode("heading", { level: 1 })
                        .run();
                },
            },
            {
                title: "Heading 2",
                command: ({ editor, range }: any) => {
                    editor
                        .chain()
                        .focus()
                        .deleteRange(range)
                        .setNode("heading", { level: 2 })
                        .run();
                },
            },
            {
                title: "Heading 3",
                command: ({ editor, range }: any) => {
                    editor
                        .chain()
                        .focus()
                        .deleteRange(range)
                        .setNode("heading", { level: 3 })
                        .run();
                },
            },
            {
                title: "Bullet List",
                command: ({ editor, range }: any) => {
                    editor.chain().focus().deleteRange(range).toggleBulletList().run();
                },
            },
            {
                title: "Numbered List",
                command: ({ editor, range }: any) => {
                    editor.chain().focus().deleteRange(range).toggleOrderedList().run();
                },
            },
        ].filter((item) => item.title.toLowerCase().startsWith(query.toLowerCase()));
    },

    render: () => {
        console.log("Render function called");
        let component: ReactRenderer;
        let popup: Instance[];

        return {
            onStart: (props: any) => {
                console.log("onStart called with props:", props);
                component = new ReactRenderer(CommandList, {
                    props,
                    editor: props.editor,
                });

                console.log("props.clientRect:", props.clientRect);

                if (!props.clientRect) {
                    console.log("No clientRect, returning early");
                    return;
                }

                popup = tippy("body", {
                    getReferenceClientRect: props.clientRect,
                    appendTo: () => document.body,
                    content: component.element,
                    showOnCreate: true,
                    interactive: true,
                    trigger: "manual",
                    placement: "bottom-start",
                });

                console.log("Popup created:", popup);
            },

            onUpdate(props: any) {
                console.log("onUpdate called");
                component.updateProps(props);

                if (!props.clientRect) {
                    return;
                }

                popup[0].setProps({
                    getReferenceClientRect: props.clientRect,
                });
            },

            onKeyDown(props: any) {
                console.log("onKeyDown called:", props.event.key);
                if (props.event.key === "Escape") {
                    popup[0].hide();
                    return true;
                }

                return (component.ref as any)?.onKeyDown(props);
            },

            onExit() {
                console.log("onExit called");
                popup[0].destroy();
                component.destroy();
            },
        };
    },
};
