import { Extension } from "@tiptap/core";
import type { Editor, Range } from "@tiptap/core";
import { ReactRenderer } from "@tiptap/react";
import Suggestion, { type SuggestionOptions } from "@tiptap/suggestion";
import type { ReactNode } from "react";
import tippy, { type GetReferenceClientRect, type Instance, type Props } from "tippy.js";
import { CommandList } from "./command-list";

/**
 * Slash command extension for TipTap editor.
 *
 * Enables a command palette triggered by typing "/" that allows users to
 * quickly insert different block types (paragraphs, headings, etc.) without
 * using traditional formatting buttons.
 */
const Command = Extension.create({
    name: "slash-command",
    addOptions() {
        return {
            suggestion: {
                char: "/",
                command: ({ editor, range, props }) => {
                    props.command({ editor, range });
                },
            } as SuggestionOptions,
        };
    },
    addProseMirrorPlugins() {
        return [
            Suggestion({
                editor: this.editor,
                ...this.options.suggestion,
            }),
        ];
    },
});

/**
 * Renders the slash command suggestion dropdown.
 *
 * Creates and manages a Tippy.js popup that displays the command list
 * when the user types "/". Handles lifecycle events like showing, updating,
 * and hiding the popup based on user interactions.
 *
 * @returns {Object} Suggestion render handlers
 * @returns {Function} onStart - Called when the suggestion popup should appear
 * @returns {Function} onUpdate - Called when the popup position needs updating
 * @returns {Function} onKeyDown - Handles keyboard navigation within the popup
 * @returns {Function} onExit - Cleanup when the popup is closed
 */
const renderItems = () => {
    let component: ReactRenderer | null = null;
    let popup: Instance<Props>[] | null = null;

    return {
        onStart: (props: { editor: Editor; clientRect: DOMRect; range: Range }) => {
            component = new ReactRenderer(CommandList, {
                props,
                editor: props.editor,
            });

            const { selection } = props.editor.state;
            const parentNode = selection.$from.node(selection.$from.depth);
            const blockType = parentNode.type.name;

            if (blockType === "codeBlock") {
                return false;
            }

            // @ts-expect-error - tippy types don't match perfectly with our usage
            popup = tippy("body", {
                getReferenceClientRect: props.clientRect,
                appendTo: () => document.body,
                content: component.element,
                showOnCreate: true,
                interactive: true,
                trigger: "manual",
                placement: "bottom-start",
            });
        },
        onUpdate: (props: { editor: Editor; clientRect: GetReferenceClientRect; range: Range }) => {
            component?.updateProps(props);

            popup?.[0]?.setProps({
                getReferenceClientRect: props.clientRect,
            });
        },
        onKeyDown: (props: { event: KeyboardEvent }) => {
            if (props.event.key === "Escape") {
                popup?.[0]?.hide();
                return true;
            }

            // @ts-expect-error - component ref has imperative handle for keyboard events
            return component?.ref?.onKeyDown(props);
        },
        onExit: () => {
            popup?.[0]?.destroy();
            component?.destroy();
        },
    };
};

/**
 * Represents a single suggestion item in the slash command menu.
 *
 * @property {string} title - Display title of the command
 * @property {string} description - Brief description of what the command does
 * @property {ReactNode} icon - Icon component to display next to the command
 * @property {string[]} [searchTerms] - Optional terms for filtering/searching commands
 * @property {Function} [command] - Function to execute when the command is selected
 */
export interface SuggestionItem {
    title: string;
    description: string;
    icon: ReactNode;
    searchTerms?: string[];
    command?: (props: { editor: Editor; range: Range }) => void;
}

/**
 * Helper function to create and validate suggestion items array.
 *
 * @param {SuggestionItem[]} items - Array of suggestion items
 * @returns {SuggestionItem[]} The same array of suggestion items
 */
export const createSuggestionItems = (items: SuggestionItem[]) => items;

/**
 * Handles keyboard navigation events for the slash command menu.
 *
 * Checks if the user is navigating the slash command menu with arrow keys
 * or Enter key. Returns true if the event should be handled by the menu.
 *
 * @param {KeyboardEvent} event - Keyboard event to check
 * @returns {boolean | undefined} True if event is a navigation key and menu is active
 */
export const handleCommandNavigation = (event: KeyboardEvent) => {
    if (["ArrowUp", "ArrowDown", "Enter"].includes(event.key)) {
        const slashCommand = document.querySelector("#slash-command");
        if (slashCommand) {
            return true;
        }
    }
};

export { Command, renderItems };
