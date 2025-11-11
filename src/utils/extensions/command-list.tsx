import { useState, useEffect, useCallback, forwardRef, useImperativeHandle } from "react";
import type { Editor, Range } from "@tiptap/core";
import { suggestionItems } from "./suggestion-items";

/**
 * Props for the CommandList component.
 *
 * @property {Editor} editor - TipTap editor instance
 * @property {DOMRect} clientRect - Position rectangle for the popup
 * @property {Range} range - Text range of the slash command to replace
 */
interface CommandListProps {
    editor: Editor;
    clientRect: DOMRect;
    range: Range;
}

/**
 * Command list dropdown component for slash commands.
 *
 * Displays a list of available commands (paragraph, headings, etc.) in a
 * dropdown menu when the user types "/". Supports keyboard navigation
 * with arrow keys and Enter to select commands.
 *
 * @param {CommandListProps} props - Component props
 * @param {React.Ref} ref - Forwarded ref for imperative keyboard handling
 * @returns {JSX.Element} Command list dropdown menu
 */
export const CommandList = forwardRef((props: CommandListProps, ref) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const selectItem = useCallback(
        (index: number) => {
            const item = suggestionItems[index];
            if (item && item.command) {
                item.command({ editor: props.editor, range: props.range });
            }
        },
        [props.editor, props.range]
    );

    const upHandler = useCallback(() => {
        setSelectedIndex((prevIndex) =>
            prevIndex <= 0 ? suggestionItems.length - 1 : prevIndex - 1
        );
    }, []);

    const downHandler = useCallback(() => {
        setSelectedIndex((prevIndex) =>
            prevIndex >= suggestionItems.length - 1 ? 0 : prevIndex + 1
        );
    }, []);

    const enterHandler = useCallback(() => {
        selectItem(selectedIndex);
    }, [selectedIndex, selectItem]);

    useEffect(() => {
        setSelectedIndex(0);
    }, []);

    useImperativeHandle(ref, () => ({
        onKeyDown: ({ event }: { event: KeyboardEvent }) => {
            if (event.key === "ArrowUp") {
                upHandler();
                return true;
            }

            if (event.key === "ArrowDown") {
                downHandler();
                return true;
            }

            if (event.key === "Enter") {
                enterHandler();
                return true;
            }

            return false;
        },
    }));

    return (
        <div
            id="slash-command"
            className="z-50 h-auto max-h-[330px] w-72 overflow-y-auto rounded-md border border-gray-200 bg-white px-1 py-2 shadow-md transition-all"
        >
            <div className="px-2 py-1.5 text-xs text-gray-500">Press '/' for commands</div>
            {suggestionItems.map((item, index: number) => (
                <button
                    key={index}
                    onClick={() => selectItem(index)}
                    className={`flex w-full items-center space-x-3 rounded-md px-2 py-2 text-left text-sm transition-colors ${
                        index === selectedIndex
                            ? "bg-blue-100 text-blue-900"
                            : "text-gray-900 hover:bg-gray-100"
                    }`}
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white">
                        {item.icon}
                    </div>
                    <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-xs text-gray-500">{item.description}</p>
                    </div>
                </button>
            ))}
        </div>
    );
});

CommandList.displayName = "CommandList";
