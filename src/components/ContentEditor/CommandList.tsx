import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";

interface CommandListProps {
    items: any[];
    command: (item: any) => void;
}

const CommandList = forwardRef((props: CommandListProps, ref) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const selectItem = (index: number) => {
        const item = props.items[index];
        if (item) {
            props.command(item);
        }
    };

    const upHandler = () => {
        setSelectedIndex((selectedIndex + props.items.length - 1) % props.items.length);
    };

    const downHandler = () => {
        setSelectedIndex((selectedIndex + 1) % props.items.length);
    };

    const enterHandler = () => {
        selectItem(selectedIndex);
    };

    useEffect(() => setSelectedIndex(0), [props.items]);

    useImperativeHandle(ref, () => ({
        onKeyDown: ({ event }: any) => {
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
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-2 min-w-[200px]">
            {props.items.length ? (
                props.items.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => selectItem(index)}
                        className={`w-full text-left px-3 py-2 rounded transition-colors ${
                            index === selectedIndex
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700 hover:bg-gray-50"
                        }`}
                    >
                        {item.title}
                    </button>
                ))
            ) : (
                <div className="px-3 py-2 text-gray-500">No results</div>
            )}
        </div>
    );
});

CommandList.displayName = "CommandList";

export default CommandList;
