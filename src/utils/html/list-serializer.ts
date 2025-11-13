/**
 * Custom HTML serializer for numbered lists.
 *
 * Converts TipTap's standard list structure:
 * <ol><li>Item 1</li><li>Item 2</li></ol>
 *
 * Into individual wrapped lists:
 * <ol start="1"><li value="1">Item 1</li></ol>
 * <ol start="2"><li value="2">Item 2</li></ol>
 *
 * This gives complete styling control over each list item
 * and avoids spacing/margin issues between items.
 */

/**
 * Converts a standard list HTML structure to individual wrapped lists.
 *
 * @param html - HTML string containing list elements
 * @returns Modified HTML with each list item wrapped in its own ol/ul
 */
export function serializeListsAsIndividualItems(html: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Process all ordered lists
    const orderedLists = doc.querySelectorAll("ol");
    orderedLists.forEach((ol) => {
        const listItems = Array.from(ol.querySelectorAll(":scope > li"));

        if (listItems.length === 0) return;

        // Get the start value and styles from the parent ol
        const startValue = parseInt(ol.getAttribute("start") || "1");
        const olId = ol.getAttribute("data-block-id");
        const olClass = ol.getAttribute("class");
        const olStyle = ol.getAttribute("style");

        // Create individual ol wrappers for each li
        const fragment = doc.createDocumentFragment();

        listItems.forEach((li, index) => {
            const currentValue = startValue + index;

            // Create a new ol wrapper
            const newOl = doc.createElement("ol");
            newOl.setAttribute("start", currentValue.toString());
            if (olClass) newOl.setAttribute("class", olClass);
            if (olStyle) newOl.setAttribute("style", olStyle);
            if (olId) newOl.setAttribute("data-block-id", `${olId}-${index}`);

            // Clone the li and set its value
            const newLi = li.cloneNode(true) as HTMLElement;
            newLi.setAttribute("value", currentValue.toString());

            // Append li to the new ol
            newOl.appendChild(newLi);
            fragment.appendChild(newOl);
        });

        // Replace the original ol with the fragment
        ol.replaceWith(fragment);
    });

    return doc.body.innerHTML;
}
