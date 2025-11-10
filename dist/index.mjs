var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));

// src/components/Nav/index.tsx
import React2 from "react";
function Nav() {
  return /* @__PURE__ */ React2.createElement("nav", { className: "flex h-16 items-center justify-between border-b px-4" }, /* @__PURE__ */ React2.createElement("div", { className: "text-lg font-semibold" }, "PostCraft Template Builder"), /* @__PURE__ */ React2.createElement("div", { className: "flex gap-2" }));
}

// src/components/LeftSidebar/index.tsx
function LeftSidebar() {
  return /* @__PURE__ */ React.createElement("aside", { className: "w-64 border-r bg-gray-50 p-4" }, /* @__PURE__ */ React.createElement("h3", { className: "mb-4 font-semibold" }, "Blocks"));
}

// src/components/ContentEditor/index.tsx
import { useEffect, useState } from "react";
import {
  EditorRoot,
  EditorContent,
  EditorCommand,
  EditorCommandItem,
  EditorBubble,
  StarterKit
} from "novel";
var extensions = [
  StarterKit.configure({
    bulletList: {
      HTMLAttributes: {
        class: "list-disc list-outside leading-3"
      }
    },
    orderedList: {
      HTMLAttributes: {
        class: "list-decimal list-outside leading-3"
      }
    },
    listItem: {
      HTMLAttributes: {
        class: "leading-normal"
      }
    },
    blockquote: {
      HTMLAttributes: {
        class: "border-l-4 border-gray-300 pl-4"
      }
    },
    codeBlock: {
      HTMLAttributes: {
        class: "rounded-sm bg-gray-100 border p-5 font-mono"
      }
    },
    code: {
      HTMLAttributes: {
        class: "rounded-md bg-gray-100 px-1.5 py-1 font-mono",
        spellcheck: "false"
      }
    },
    horizontalRule: false,
    dropcursor: {
      color: "#DBEAFE",
      width: 4
    },
    gapcursor: false
  })
];
function ContentEditor({
  initialContent: _initialContent,
  onSave: _onSave
}) {
  const [isMounted, setIsMounted] = useState(false);
  const [content, setContent] = useState(
    _initialContent ? JSON.parse(_initialContent) : void 0
  );
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return /* @__PURE__ */ React.createElement("main", { className: "flex-1 overflow-y-auto bg-white" }, /* @__PURE__ */ React.createElement("div", { className: "mx-auto max-w-4xl px-8 py-16" }, /* @__PURE__ */ React.createElement("div", { className: "min-h-[500px] animate-pulse bg-gray-100 rounded" })));
  }
  return /* @__PURE__ */ React.createElement("main", { className: "flex-1 overflow-y-auto bg-white" }, /* @__PURE__ */ React.createElement("div", { className: "mx-auto max-w-4xl px-8 py-16" }, /* @__PURE__ */ React.createElement(EditorRoot, null, /* @__PURE__ */ React.createElement(
    EditorContent,
    {
      extensions,
      initialContent: content,
      onUpdate: ({ editor }) => {
        if (_onSave) {
          const json = editor.getJSON();
          _onSave(JSON.stringify(json));
        }
      },
      className: "min-h-[500px] prose prose-lg focus:outline-none max-w-none"
    },
    /* @__PURE__ */ React.createElement(EditorCommand, { className: "z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all" }, /* @__PURE__ */ React.createElement(
      EditorCommandItem,
      {
        value: "paragraph",
        onCommand: (val) => val.editor.chain().focus().setParagraph().run()
      },
      "Paragraph"
    ), /* @__PURE__ */ React.createElement(
      EditorCommandItem,
      {
        value: "heading1",
        onCommand: (val) => val.editor.chain().focus().setHeading({ level: 1 }).run()
      },
      "Heading 1"
    ), /* @__PURE__ */ React.createElement(
      EditorCommandItem,
      {
        value: "heading2",
        onCommand: (val) => val.editor.chain().focus().setHeading({ level: 2 }).run()
      },
      "Heading 2"
    ), /* @__PURE__ */ React.createElement(
      EditorCommandItem,
      {
        value: "heading3",
        onCommand: (val) => val.editor.chain().focus().setHeading({ level: 3 }).run()
      },
      "Heading 3"
    ), /* @__PURE__ */ React.createElement(
      EditorCommandItem,
      {
        value: "bulletList",
        onCommand: (val) => val.editor.chain().focus().toggleBulletList().run()
      },
      "Bullet List"
    ), /* @__PURE__ */ React.createElement(
      EditorCommandItem,
      {
        value: "numberedList",
        onCommand: (val) => val.editor.chain().focus().toggleOrderedList().run()
      },
      "Numbered List"
    )),
    /* @__PURE__ */ React.createElement(EditorBubble, { className: "flex w-fit max-w-[90vw] overflow-hidden rounded border border-muted bg-background shadow-xl" }, /* @__PURE__ */ React.createElement("span", { className: "text-sm text-muted-foreground" }))
  ))));
}

// src/components/RightSidebar/index.tsx
import React3 from "react";
function RightSidebar() {
  return /* @__PURE__ */ React3.createElement("aside", { className: "w-64 border-l bg-gray-50 p-4" }, /* @__PURE__ */ React3.createElement("h3", { className: "mb-4 font-semibold" }, "Settings"));
}

// src/components/TemplateBuilder/index.tsx
function TemplateBuilder({
  showNav = true,
  showLeftSidebar = true,
  showRightSidebar = true,
  onSave,
  initialContent
}) {
  return /* @__PURE__ */ React.createElement("div", { className: "flex h-screen flex-col" }, showNav && /* @__PURE__ */ React.createElement(Nav, null), /* @__PURE__ */ React.createElement("div", { className: "flex flex-1 overflow-hidden" }, showLeftSidebar && /* @__PURE__ */ React.createElement(LeftSidebar, null), /* @__PURE__ */ React.createElement(ContentEditor, { initialContent, onSave }), showRightSidebar && /* @__PURE__ */ React.createElement(RightSidebar, null)));
}

// src/hooks/useTemplateBuilder.ts
import { useState as useState2, useCallback } from "react";
function useTemplateBuilder(initialData) {
  const [template, setTemplate] = useState2(
    initialData || {
      name: "Untitled Template",
      content: null
    }
  );
  const [isSaving, setIsSaving] = useState2(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState2(false);
  const updateTemplate = useCallback((updates) => {
    setTemplate((prev) => __spreadValues(__spreadValues({}, prev), updates));
    setHasUnsavedChanges(true);
  }, []);
  const saveTemplate = useCallback(async () => {
    setIsSaving(true);
    try {
      setTemplate((prev) => __spreadProps(__spreadValues({}, prev), {
        updatedAt: /* @__PURE__ */ new Date()
      }));
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
    hasUnsavedChanges
  };
}

// src/hooks/useEditor.ts
import { useState as useState3, useCallback as useCallback2 } from "react";
function useEditor(initialContent) {
  const [blocks, setBlocks] = useState3(initialContent || []);
  const [selectedBlockId, setSelectedBlockId] = useState3(null);
  const [history] = useState3([]);
  const [historyIndex, setHistoryIndex] = useState3(-1);
  const addBlock = useCallback2((block, index) => {
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
  const updateBlock = useCallback2((id, updates) => {
    setBlocks(
      (prev) => prev.map((block) => block.id === id ? __spreadValues(__spreadValues({}, block), updates) : block)
    );
  }, []);
  const deleteBlock = useCallback2(
    (id) => {
      setBlocks((prev) => prev.filter((block) => block.id !== id));
      if (selectedBlockId === id) {
        setSelectedBlockId(null);
      }
    },
    [selectedBlockId]
  );
  const moveBlock = useCallback2((fromIndex, toIndex) => {
    setBlocks((prev) => {
      const newBlocks = [...prev];
      const [movedBlock] = newBlocks.splice(fromIndex, 1);
      newBlocks.splice(toIndex, 0, movedBlock);
      return newBlocks;
    });
  }, []);
  const undo = useCallback2(() => {
    if (historyIndex > 0) {
      setHistoryIndex((prev) => prev - 1);
      setBlocks(history[historyIndex - 1]);
    }
  }, [history, historyIndex]);
  const redo = useCallback2(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex((prev) => prev + 1);
      setBlocks(history[historyIndex + 1]);
    }
  }, [history, historyIndex]);
  const exportToHTML = useCallback2(() => {
    return blocks.map((block) => {
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
    }).join("\n");
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
    exportToHTML
  };
}
export {
  ContentEditor,
  LeftSidebar,
  Nav,
  RightSidebar,
  TemplateBuilder,
  useEditor,
  useTemplateBuilder
};
