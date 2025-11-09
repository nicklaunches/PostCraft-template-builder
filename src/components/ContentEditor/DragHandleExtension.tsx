import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { Decoration, DecorationSet } from "@tiptap/pm/view";

export const DragHandleExtension = Extension.create({
    name: "dragHandle",

    addProseMirrorPlugins() {
        return [
            new Plugin({
                key: new PluginKey("dragHandle"),
                props: {
                    decorations(state) {
                        const { doc } = state;
                        const decorations: Decoration[] = [];

                        doc.descendants((node, pos) => {
                            // Only add decorations to block-level nodes
                            if (
                                node.isBlock &&
                                node.type.name !== "doc" &&
                                node.type.name !== "listItem"
                            ) {
                                const decoration = Decoration.widget(
                                    pos,
                                    (_view, _getPos) => {
                                        const handle = document.createElement("div");
                                        handle.className = "drag-handle";
                                        handle.style.cssText = `
                                            position: absolute;
                                            left: -2.5rem;
                                            top: 2px;
                                            width: 1.25rem;
                                            height: 1.25rem;
                                            display: flex;
                                            align-items: center;
                                            justify-content: center;
                                            opacity: 0;
                                            transition: opacity 0.15s ease, background-color 0.15s ease;
                                            cursor: grab;
                                            color: #d1d5db;
                                            z-index: 50;
                                            user-select: none;
                                            border-radius: 0.25rem;
                                            padding: 0.125rem;
                                        `;
                                        handle.innerHTML = `
                                            <svg width="10" height="16" viewBox="0 0 10 16" fill="currentColor" style="width: 1rem; height: 1rem;">
                                                <circle cx="2" cy="3" r="1" />
                                                <circle cx="2" cy="8" r="1" />
                                                <circle cx="2" cy="13" r="1" />
                                                <circle cx="6" cy="3" r="1" />
                                                <circle cx="6" cy="8" r="1" />
                                                <circle cx="6" cy="13" r="1" />
                                            </svg>
                                        `;
                                        handle.draggable = true;
                                        handle.contentEditable = "false";

                                        // Get the actual content element
                                        setTimeout(() => {
                                            const contentElement = handle.nextElementSibling;
                                            if (contentElement) {
                                                contentElement.addEventListener(
                                                    "mouseenter",
                                                    () => {
                                                        handle.style.opacity = "1";
                                                    }
                                                );
                                                contentElement.addEventListener(
                                                    "mouseleave",
                                                    () => {
                                                        handle.style.opacity = "0";
                                                    }
                                                );
                                            }
                                        }, 0);

                                        // Handle hover on the drag handle itself
                                        handle.addEventListener("mouseenter", () => {
                                            handle.style.opacity = "1";
                                            handle.style.color = "#6b7280";
                                            handle.style.backgroundColor = "rgba(0, 0, 0, 0.05)";
                                        });
                                        handle.addEventListener("mouseleave", () => {
                                            handle.style.color = "#d1d5db";
                                            handle.style.backgroundColor = "transparent";
                                        });
                                        handle.addEventListener("mousedown", () => {
                                            handle.style.cursor = "grabbing";
                                            handle.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
                                        });
                                        handle.addEventListener("mouseup", () => {
                                            handle.style.cursor = "grab";
                                        });

                                        return handle;
                                    },
                                    {
                                        side: -1,
                                    }
                                );
                                decorations.push(decoration);
                            }
                        });
                        return DecorationSet.create(doc, decorations);
                    },
                },
            }),
        ];
    },
});
