"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) =>
    key in obj
        ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value })
        : (obj[key] = value);
var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
        if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
        for (var prop of __getOwnPropSymbols(b)) {
            if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
        }
    return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __export = (target, all) => {
    for (var name in all) __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
    if ((from && typeof from === "object") || typeof from === "function") {
        for (let key of __getOwnPropNames(from))
            if (!__hasOwnProp.call(to, key) && key !== except)
                __defProp(to, key, {
                    get: () => from[key],
                    enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
                });
    }
    return to;
};
var __toESM = (mod, isNodeMode, target) => (
    (target = mod != null ? __create(__getProtoOf(mod)) : {}),
    __copyProps(
        // If the importer is in node compatibility mode or this is not an ESM
        // file that has been converted to a CommonJS file using a Babel-
        // compatible transform (i.e. "__esModule" has not been set), then set
        // "default" to the CommonJS "module.exports" for node compatibility.
        isNodeMode || !mod || !mod.__esModule
            ? __defProp(target, "default", { value: mod, enumerable: true })
            : target,
        mod
    )
);
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
    ContentEditor: () => ContentEditor,
    LeftSidebar: () => LeftSidebar,
    Nav: () => Nav,
    RightSidebar: () => RightSidebar,
    TemplateBuilder: () => TemplateBuilder,
    useEditor: () => useEditor,
    useTemplateBuilder: () => useTemplateBuilder,
});
module.exports = __toCommonJS(index_exports);

// src/components/Nav/index.tsx
var import_react = __toESM(require("react"));
function Nav() {
    return /* @__PURE__ */ import_react.default.createElement(
        "nav",
        { className: "flex h-16 items-center justify-between border-b px-4" },
        /* @__PURE__ */ import_react.default.createElement(
            "div",
            { className: "text-lg font-semibold" },
            "PostCraft Template Builder"
        ),
        /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-2" })
    );
}

// src/components/LeftSidebar/index.tsx
function LeftSidebar() {
    return /* @__PURE__ */ React.createElement(
        "aside",
        { className: "w-64 border-r bg-gray-50 p-4" },
        /* @__PURE__ */ React.createElement("h3", { className: "mb-4 font-semibold" }, "Blocks")
    );
}

// src/components/ContentEditor/index.tsx
var import_react2 = require("react");
var import_novel = require("novel");
var extensions = [
    import_novel.StarterKit.configure({
        bulletList: {
            HTMLAttributes: {
                class: "list-disc list-outside leading-3",
            },
        },
        orderedList: {
            HTMLAttributes: {
                class: "list-decimal list-outside leading-3",
            },
        },
        listItem: {
            HTMLAttributes: {
                class: "leading-normal",
            },
        },
        blockquote: {
            HTMLAttributes: {
                class: "border-l-4 border-gray-300 pl-4",
            },
        },
        codeBlock: {
            HTMLAttributes: {
                class: "rounded-sm bg-gray-100 border p-5 font-mono",
            },
        },
        code: {
            HTMLAttributes: {
                class: "rounded-md bg-gray-100 px-1.5 py-1 font-mono",
                spellcheck: "false",
            },
        },
        horizontalRule: false,
        dropcursor: {
            color: "#DBEAFE",
            width: 4,
        },
        gapcursor: false,
    }),
];
function ContentEditor({ initialContent: _initialContent, onSave: _onSave }) {
    const [isMounted, setIsMounted] = (0, import_react2.useState)(false);
    const [content, setContent] = (0, import_react2.useState)(
        _initialContent ? JSON.parse(_initialContent) : void 0
    );
    (0, import_react2.useEffect)(() => {
        setIsMounted(true);
    }, []);
    if (!isMounted) {
        return /* @__PURE__ */ React.createElement(
            "main",
            { className: "flex-1 overflow-y-auto bg-white" },
            /* @__PURE__ */ React.createElement(
                "div",
                { className: "mx-auto max-w-4xl px-8 py-16" },
                /* @__PURE__ */ React.createElement("div", {
                    className: "min-h-[500px] animate-pulse bg-gray-100 rounded",
                })
            )
        );
    }
    return /* @__PURE__ */ React.createElement(
        "main",
        { className: "flex-1 overflow-y-auto bg-white" },
        /* @__PURE__ */ React.createElement(
            "div",
            { className: "mx-auto max-w-4xl px-8 py-16" },
            /* @__PURE__ */ React.createElement(
                import_novel.EditorRoot,
                null,
                /* @__PURE__ */ React.createElement(
                    import_novel.EditorContent,
                    {
                        extensions,
                        initialContent: content,
                        onUpdate: ({ editor }) => {
                            if (_onSave) {
                                const json = editor.getJSON();
                                _onSave(JSON.stringify(json));
                            }
                        },
                        className: "min-h-[500px] prose prose-lg focus:outline-none max-w-none",
                    },
                    /* @__PURE__ */ React.createElement(
                        import_novel.EditorCommand,
                        {
                            className:
                                "z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all",
                        },
                        /* @__PURE__ */ React.createElement(
                            import_novel.EditorCommandItem,
                            {
                                value: "paragraph",
                                onCommand: (val) => val.editor.chain().focus().setParagraph().run(),
                            },
                            "Paragraph"
                        ),
                        /* @__PURE__ */ React.createElement(
                            import_novel.EditorCommandItem,
                            {
                                value: "heading1",
                                onCommand: (val) =>
                                    val.editor.chain().focus().setHeading({ level: 1 }).run(),
                            },
                            "Heading 1"
                        ),
                        /* @__PURE__ */ React.createElement(
                            import_novel.EditorCommandItem,
                            {
                                value: "heading2",
                                onCommand: (val) =>
                                    val.editor.chain().focus().setHeading({ level: 2 }).run(),
                            },
                            "Heading 2"
                        ),
                        /* @__PURE__ */ React.createElement(
                            import_novel.EditorCommandItem,
                            {
                                value: "heading3",
                                onCommand: (val) =>
                                    val.editor.chain().focus().setHeading({ level: 3 }).run(),
                            },
                            "Heading 3"
                        ),
                        /* @__PURE__ */ React.createElement(
                            import_novel.EditorCommandItem,
                            {
                                value: "bulletList",
                                onCommand: (val) =>
                                    val.editor.chain().focus().toggleBulletList().run(),
                            },
                            "Bullet List"
                        ),
                        /* @__PURE__ */ React.createElement(
                            import_novel.EditorCommandItem,
                            {
                                value: "numberedList",
                                onCommand: (val) =>
                                    val.editor.chain().focus().toggleOrderedList().run(),
                            },
                            "Numbered List"
                        )
                    ),
                    /* @__PURE__ */ React.createElement(
                        import_novel.EditorBubble,
                        {
                            className:
                                "flex w-fit max-w-[90vw] overflow-hidden rounded border border-muted bg-background shadow-xl",
                        },
                        /* @__PURE__ */ React.createElement("span", {
                            className: "text-sm text-muted-foreground",
                        })
                    )
                )
            )
        )
    );
}

// src/components/RightSidebar/index.tsx
var import_react3 = __toESM(require("react"));
function RightSidebar() {
    return /* @__PURE__ */ import_react3.default.createElement(
        "aside",
        { className: "w-64 border-l bg-gray-50 p-4" },
        /* @__PURE__ */ import_react3.default.createElement(
            "h3",
            { className: "mb-4 font-semibold" },
            "Settings"
        )
    );
}

// src/components/TemplateBuilder/index.tsx
function TemplateBuilder({
    showNav = true,
    showLeftSidebar = true,
    showRightSidebar = true,
    onSave,
    initialContent,
}) {
    return /* @__PURE__ */ React.createElement(
        "div",
        { className: "flex h-screen flex-col" },
        showNav && /* @__PURE__ */ React.createElement(Nav, null),
        /* @__PURE__ */ React.createElement(
            "div",
            { className: "flex flex-1 overflow-hidden" },
            showLeftSidebar && /* @__PURE__ */ React.createElement(LeftSidebar, null),
            /* @__PURE__ */ React.createElement(ContentEditor, { initialContent, onSave }),
            showRightSidebar && /* @__PURE__ */ React.createElement(RightSidebar, null)
        )
    );
}

// src/hooks/useTemplateBuilder.ts
var import_react4 = require("react");
function useTemplateBuilder(initialData) {
    const [template, setTemplate] = (0, import_react4.useState)(
        initialData || {
            name: "Untitled Template",
            content: null,
        }
    );
    const [isSaving, setIsSaving] = (0, import_react4.useState)(false);
    const [hasUnsavedChanges, setHasUnsavedChanges] = (0, import_react4.useState)(false);
    const updateTemplate = (0, import_react4.useCallback)((updates) => {
        setTemplate((prev) => __spreadValues(__spreadValues({}, prev), updates));
        setHasUnsavedChanges(true);
    }, []);
    const saveTemplate = (0, import_react4.useCallback)(async () => {
        setIsSaving(true);
        try {
            setTemplate((prev) =>
                __spreadProps(__spreadValues({}, prev), {
                    updatedAt: /* @__PURE__ */ new Date(),
                })
            );
            setHasUnsavedChanges(false);
        } catch (error) {
            console.error("Save failed:", error);
        } finally {
            setIsSaving(false);
        }
    }, []);
    return {
        template,
        updateTemplate,
        saveTemplate,
        isSaving,
        hasUnsavedChanges,
    };
}

// src/hooks/useEditor.ts
var import_react5 = require("react");
function useEditor(initialContent) {
    const [blocks, setBlocks] = (0, import_react5.useState)(initialContent || []);
    const [selectedBlockId, setSelectedBlockId] = (0, import_react5.useState)(null);
    const [history] = (0, import_react5.useState)([]);
    const [historyIndex, setHistoryIndex] = (0, import_react5.useState)(-1);
    const addBlock = (0, import_react5.useCallback)((block, index) => {
        setBlocks((prev) => {
            const newBlocks = [...prev];
            if (index !== void 0) {
                newBlocks.splice(index, 0, block);
            } else {
                newBlocks.push(block);
            }
            return newBlocks;
        });
    }, []);
    const updateBlock = (0, import_react5.useCallback)((id, updates) => {
        setBlocks((prev) =>
            prev.map((block) =>
                block.id === id ? __spreadValues(__spreadValues({}, block), updates) : block
            )
        );
    }, []);
    const deleteBlock = (0, import_react5.useCallback)(
        (id) => {
            setBlocks((prev) => prev.filter((block) => block.id !== id));
            if (selectedBlockId === id) {
                setSelectedBlockId(null);
            }
        },
        [selectedBlockId]
    );
    const moveBlock = (0, import_react5.useCallback)((fromIndex, toIndex) => {
        setBlocks((prev) => {
            const newBlocks = [...prev];
            const [movedBlock] = newBlocks.splice(fromIndex, 1);
            newBlocks.splice(toIndex, 0, movedBlock);
            return newBlocks;
        });
    }, []);
    const undo = (0, import_react5.useCallback)(() => {
        if (historyIndex > 0) {
            setHistoryIndex((prev) => prev - 1);
            setBlocks(history[historyIndex - 1]);
        }
    }, [history, historyIndex]);
    const redo = (0, import_react5.useCallback)(() => {
        if (historyIndex < history.length - 1) {
            setHistoryIndex((prev) => prev + 1);
            setBlocks(history[historyIndex + 1]);
        }
    }, [history, historyIndex]);
    const exportToHTML = (0, import_react5.useCallback)(() => {
        return blocks
            .map((block) => {
                switch (block.type) {
                    case "text":
                        return `<p>${block.content}</p>`;
                    case "heading":
                        return `<h2>${block.content}</h2>`;
                    case "button":
                        return `<a href="${block.content.url}">${block.content.text}</a>`;
                    default:
                        return "";
                }
            })
            .join("\n");
    }, [blocks]);
    return {
        blocks,
        selectedBlockId,
        setSelectedBlockId,
        addBlock,
        updateBlock,
        deleteBlock,
        moveBlock,
        undo,
        redo,
        canUndo: historyIndex > 0,
        canRedo: historyIndex < history.length - 1,
        exportToHTML,
    };
}
// Annotate the CommonJS export names for ESM import in node:
0 &&
    (module.exports = {
        ContentEditor,
        LeftSidebar,
        Nav,
        RightSidebar,
        TemplateBuilder,
        useEditor,
        useTemplateBuilder,
    });
