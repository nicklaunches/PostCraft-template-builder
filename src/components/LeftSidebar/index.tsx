export default function LeftSidebar() {
    return (
        <aside className="w-64 border-r bg-gray-50">
            <div className="min-h-[44px] w-full px-2">
                <div className="space-y-4 py-4">
                    {/* Header */}
                    <div className="relative flex justify-between px-2">
                        <div className="ease flex min-h-[22px] items-center">
                            <h3 className="text-[13px] font-semibold text-gray-900">
                                Email styles
                            </h3>
                        </div>
                        <div className="flex items-center space-x-1"></div>
                    </div>

                    {/* Font */}
                    <div className="flex items-center justify-between space-x-2">
                        <div className="flex w-full flex-col gap-2">
                            <div className="flex px-2">
                                <div className="flex h-[26px] w-2/5 items-center gap-1 text-xs font-medium leading-[26px] text-gray-600">
                                    Font
                                </div>
                                <div className="flex-1">
                                    <div className="flex w-full items-center justify-between gap-2">
                                        <select className="outline-none w-full rounded border border-transparent bg-gray-100 px-2 py-1 text-xs transition hover:border-gray-200 focus:outline-none focus:ring-0 text-gray-600">
                                            <option value="Inter">Inter</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Fallback */}
                            <div className="flex px-2">
                                <div className="flex h-[26px] w-2/5 items-center gap-1 text-xs font-medium leading-[26px] text-gray-600">
                                    Fallback
                                </div>
                                <div className="flex-1">
                                    <div className="flex w-full items-center justify-between gap-2">
                                        <select className="outline-none w-full rounded border border-transparent bg-gray-100 px-2 py-1 text-xs transition hover:border-gray-200 focus:outline-none focus:ring-0 text-gray-600">
                                            <option value="sans-serif">Sans</option>
                                            <option value="serif">Serif</option>
                                            <option value="monospace">Mono</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Padding */}
                            <div className="flex px-2">
                                <div className="flex h-[26px] w-2/5 items-center gap-1 text-xs font-medium leading-[26px] text-gray-600">
                                    Padding
                                </div>
                                <div className="flex-1">
                                    <div className="flex space-x-2">
                                        <div className="flex-1">
                                            <div className="outline-none w-full cursor-text mt-0.5 flex items-center rounded border border-transparent bg-gray-100 pl-2 transition hover:border-gray-200">
                                                <svg
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 -2 15 15"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <line
                                                        x1="1.21737"
                                                        y1="0"
                                                        x2="1.21737"
                                                        y2="11"
                                                        strokeWidth="1.2"
                                                        className="stroke-gray-500"
                                                    />
                                                    <line
                                                        x1="12.1757"
                                                        y1="0"
                                                        x2="12.1757"
                                                        y2="11"
                                                        strokeWidth="1.2"
                                                        className="stroke-gray-500"
                                                    />
                                                    <rect
                                                        x="3.8"
                                                        y="2.8"
                                                        width="6"
                                                        height="6"
                                                        rx="2"
                                                        ry="2"
                                                        className="fill-gray-500"
                                                    />
                                                    <rect
                                                        x="4.8"
                                                        y="3.8"
                                                        width="3.8"
                                                        height="3.8"
                                                        rx="1"
                                                        ry="1"
                                                        className="fill-white"
                                                    />
                                                </svg>
                                                <input
                                                    type="number"
                                                    className="h-6 w-full min-w-[36px] cursor-text rounded border-0 bg-transparent pl-2 pr-1 text-xs transition-colors focus:outline-none text-gray-900"
                                                    defaultValue="0"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="outline-none w-full cursor-text mt-0.5 flex items-center rounded border border-transparent bg-gray-100 pl-2 transition hover:border-gray-200">
                                                <svg
                                                    width="15"
                                                    height="15"
                                                    viewBox="-3 -1 15 15"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <line
                                                        x1="-2"
                                                        y1="2"
                                                        x2="11"
                                                        y2="2"
                                                        strokeWidth="1.2"
                                                        className="stroke-gray-500"
                                                    />
                                                    <line
                                                        x1="-2"
                                                        y1="11.5"
                                                        x2="11"
                                                        y2="11.5"
                                                        strokeWidth="1.2"
                                                        className="stroke-gray-500"
                                                    />
                                                    <rect
                                                        x="1.8"
                                                        y="4"
                                                        width="5.4"
                                                        height="5.4"
                                                        rx="1"
                                                        ry="1"
                                                        className="fill-gray-500"
                                                    />
                                                    <rect
                                                        x="2.8"
                                                        y="5"
                                                        width="3.4"
                                                        height="3.4"
                                                        rx="1"
                                                        ry="1"
                                                        className="fill-white"
                                                    />
                                                </svg>
                                                <input
                                                    type="number"
                                                    className="h-6 w-full min-w-[36px] cursor-text rounded border-0 bg-transparent pl-2 pr-1 text-xs transition-colors focus:outline-none text-gray-900"
                                                    defaultValue="0"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Body */}
                            <div className="flex px-2">
                                <div className="flex h-[26px] w-2/5 items-center gap-1 text-xs font-medium leading-[26px] text-gray-600">
                                    Body
                                </div>
                                <div className="flex-1">
                                    <div className="relative w-full">
                                        <div className="outline-none w-full cursor-text relative">
                                            <div className="relative flex w-full items-center rounded border bg-gray-100 pl-2 hover:border-slate-200 border-transparent">
                                                <div className="cursor-pointer h-4 w-4 min-w-[1rem] overflow-hidden rounded outline-0 focus:outline-0">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                        className="h-full w-full stroke-[0.1] text-gray-400"
                                                    >
                                                        <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z"></path>
                                                    </svg>
                                                </div>
                                                <div className="relative flex items-center justify-center">
                                                    <div className="absolute left-1 top-1/2 flex -translate-y-1/2 items-center pr-0.5 text-xs">
                                                        <span className="absolute whitespace-nowrap pt-0.5 text-xs text-gray-500">
                                                            Color
                                                        </span>
                                                    </div>
                                                    <input
                                                        className="w-full rounded bg-transparent py-1 pl-2 pr-1 text-left text-xs uppercase transition-colors focus:outline-none text-gray-900"
                                                        defaultValue=""
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Margin */}
                            <div className="flex px-2">
                                <div className="flex h-[26px] w-2/5 items-center gap-1 text-xs font-medium leading-[26px] text-gray-600">
                                    Margin
                                </div>
                                <div className="flex-1">
                                    <div className="flex space-x-2">
                                        <div className="flex-1">
                                            <div className="outline-none w-full cursor-text mt-0.5 flex items-center rounded border border-transparent bg-gray-100 pl-2 transition hover:border-gray-200">
                                                <svg
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 -2 15 15"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <line
                                                        x1="1.21737"
                                                        y1="0"
                                                        x2="1.21737"
                                                        y2="11"
                                                        strokeWidth="1.2"
                                                        className="stroke-gray-500"
                                                    />
                                                    <line
                                                        x1="12.1757"
                                                        y1="0"
                                                        x2="12.1757"
                                                        y2="11"
                                                        strokeWidth="1.2"
                                                        className="stroke-gray-500"
                                                    />
                                                    <rect
                                                        x="3.8"
                                                        y="2.8"
                                                        width="6"
                                                        height="6"
                                                        rx="2"
                                                        ry="2"
                                                        className="fill-gray-500"
                                                    />
                                                    <rect
                                                        x="4.8"
                                                        y="3.8"
                                                        width="3.8"
                                                        height="3.8"
                                                        rx="1"
                                                        ry="1"
                                                        className="fill-white"
                                                    />
                                                </svg>
                                                <input
                                                    type="number"
                                                    className="h-6 w-full min-w-[36px] cursor-text rounded border-0 bg-transparent pl-2 pr-1 text-xs transition-colors focus:outline-none text-gray-900"
                                                    defaultValue="0"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="outline-none w-full cursor-text mt-0.5 flex items-center rounded border border-transparent bg-gray-100 pl-2 transition hover:border-gray-200">
                                                <svg
                                                    width="15"
                                                    height="15"
                                                    viewBox="-3 -1 15 15"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <line
                                                        x1="-2"
                                                        y1="2"
                                                        x2="11"
                                                        y2="2"
                                                        strokeWidth="1.2"
                                                        className="stroke-gray-500"
                                                    />
                                                    <line
                                                        x1="-2"
                                                        y1="11.5"
                                                        x2="11"
                                                        y2="11.5"
                                                        strokeWidth="1.2"
                                                        className="stroke-gray-500"
                                                    />
                                                    <rect
                                                        x="1.8"
                                                        y="4"
                                                        width="5.4"
                                                        height="5.4"
                                                        rx="1"
                                                        ry="1"
                                                        className="fill-gray-500"
                                                    />
                                                    <rect
                                                        x="2.8"
                                                        y="5"
                                                        width="3.4"
                                                        height="3.4"
                                                        rx="1"
                                                        ry="1"
                                                        className="fill-white"
                                                    />
                                                </svg>
                                                <input
                                                    type="number"
                                                    className="h-6 w-full min-w-[36px] cursor-text rounded border-0 bg-transparent pl-2 pr-1 text-xs transition-colors focus:outline-none text-gray-900"
                                                    defaultValue="0"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Background */}
                            <div className="flex px-2">
                                <div className="flex h-[26px] w-2/5 items-center gap-1 text-xs font-medium leading-[26px] text-gray-600">
                                    Background
                                </div>
                                <div className="flex-1">
                                    <div className="relative w-full">
                                        <div className="outline-none w-full cursor-text relative">
                                            <div className="relative flex w-full items-center rounded border bg-gray-100 pl-2 hover:border-slate-200 border-transparent">
                                                <div className="cursor-pointer h-4 w-4 min-w-[1rem] overflow-hidden rounded outline-0 focus:outline-0">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                        className="h-full w-full stroke-[0.1] text-gray-400"
                                                    >
                                                        <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z"></path>
                                                    </svg>
                                                </div>
                                                <div className="relative flex items-center justify-center">
                                                    <div className="absolute left-1 top-1/2 flex -translate-y-1/2 items-center pr-0.5 text-xs">
                                                        <span className="absolute whitespace-nowrap pt-0.5 text-xs text-gray-500">
                                                            Color
                                                        </span>
                                                    </div>
                                                    <input
                                                        className="w-full rounded bg-transparent py-1 pl-2 pr-1 text-left text-xs uppercase transition-colors focus:outline-none text-gray-900"
                                                        defaultValue=""
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Radius */}
                            <div className="flex px-2">
                                <div className="flex h-[26px] w-2/5 items-center gap-1 text-xs font-medium leading-[26px] text-gray-600">
                                    Radius
                                </div>
                                <div className="flex-1">
                                    <div className="outline-none w-full cursor-text mt-0.5 flex items-center rounded border border-transparent bg-gray-100 pl-2 transition hover:border-gray-200">
                                        <div className="relative size-3 overflow-hidden">
                                            <div
                                                className="left-0 top-0 h-6 w-6 border transition-colors border-gray-600"
                                                style={{ borderRadius: "0px" }}
                                            ></div>
                                        </div>
                                        <input
                                            type="number"
                                            className="h-6 w-full min-w-[36px] cursor-text rounded border-0 bg-transparent pl-2 pr-1 text-xs transition-colors focus:outline-none text-gray-900"
                                            defaultValue="0"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Border width */}
                            <div className="flex px-2">
                                <div className="flex h-[26px] w-2/5 items-center gap-1 text-xs font-medium leading-[26px] text-gray-600">
                                    Border width
                                </div>
                                <div className="flex-1">
                                    <div className="outline-none w-full cursor-text mt-0.5 flex items-center rounded border border-transparent bg-gray-100 pl-2 transition hover:border-gray-200">
                                        <div className="relative size-5 overflow-visible">
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 13 8"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-colors stroke-gray-500"
                                            >
                                                <line
                                                    x1="1"
                                                    y1="1"
                                                    x2="12"
                                                    y2="1"
                                                    strokeWidth="0.9"
                                                />
                                                <line
                                                    x1="1"
                                                    y1="3.6"
                                                    x2="12"
                                                    y2="3.6"
                                                    strokeWidth="1.4"
                                                />
                                                <line
                                                    x1="1"
                                                    y1="7"
                                                    x2="12"
                                                    y2="7"
                                                    strokeWidth="2"
                                                />
                                            </svg>
                                        </div>
                                        <input
                                            type="number"
                                            className="h-6 w-full min-w-[36px] cursor-text rounded border-0 bg-transparent pl-2 pr-1 text-xs transition-colors focus:outline-none text-gray-900"
                                            defaultValue="0"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Border color */}
                            <div className="flex px-2">
                                <div className="flex h-[26px] w-2/5 items-center gap-1 text-xs font-medium leading-[26px] text-gray-600">
                                    Border color
                                </div>
                                <div className="flex-1">
                                    <div className="relative w-full">
                                        <div className="outline-none w-full cursor-text relative">
                                            <div className="relative flex w-full items-center rounded border bg-gray-100 pl-2 hover:border-slate-200 border-transparent">
                                                <div className="cursor-pointer h-4 w-4 min-w-[1rem] overflow-hidden rounded outline-0 focus:outline-0">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                        className="h-full w-full stroke-[0.1] text-gray-400"
                                                    >
                                                        <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z"></path>
                                                    </svg>
                                                </div>
                                                <div className="relative flex items-center justify-center">
                                                    <div className="absolute left-1 top-1/2 flex -translate-y-1/2 items-center pr-0.5 text-xs">
                                                        <span className="absolute whitespace-nowrap pt-0.5 text-xs text-gray-500">
                                                            Color
                                                        </span>
                                                    </div>
                                                    <input
                                                        className="w-full rounded bg-transparent py-1 pl-2 pr-1 text-left text-xs uppercase transition-colors focus:outline-none text-gray-900"
                                                        defaultValue=""
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
