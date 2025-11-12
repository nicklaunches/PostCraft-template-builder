/**
 * Example component demonstrating block factory usage.
 *
 * This file shows practical examples of using the block factory functions
 * to create email template blocks programmatically.
 */

import {
    createTextBlock,
    createHeadingBlock,
    createButtonBlock,
    createImageBlock,
    createDividerBlock,
    cloneBlock,
    createDefaultBlock,
    createBlocksFromTypes,
    blockBuilder,
    // Simplified convenience functions
    text,
    heading,
    button,
    divider,
} from "@/utils/factories/blockFactory";
import type { Block } from "@/types";

/**
 * Example: Simple template using the new simplified API
 * This demonstrates the reduced verbosity for common cases.
 */
export function createSimpleWelcomeEmail(): Block[] {
    return [
        heading("Welcome!", 1),
        text("Thanks for joining us."),
        divider(),
        button("Get Started", "https://example.com/start"),
        text("Need help? Contact support anytime."),
    ];
}

/**
 * Example: Using the builder pattern for complex styling
 */
export function createStyledWelcomeEmail(): Block[] {
    return [
        blockBuilder("heading")
            .withContent({ text: "Welcome to PostCraft!", level: 1 })
            .withStyles({
                alignment: "center",
                marginBottom: 20,
                paddingTop: 10,
                paddingBottom: 10,
            })
            .build(),

        text("Thank you for signing up! We're excited to have you on board."),

        blockBuilder("divider")
            .withStyles({
                marginTop: 20,
                marginBottom: 20,
            })
            .build(),

        heading("Get Started", 2),
        text("Explore our powerful email template builder."),

        blockBuilder("button")
            .withContent({
                text: "Start Building",
                url: "https://postcraft.dev/dashboard",
            })
            .withStyles({
                alignment: "center",
                marginTop: 20,
                marginBottom: 20,
            })
            .build(),
    ];
}

/**
 * Example: Create a welcome email template (original full-featured API)
 */
export function createWelcomeEmailTemplate(): Block[] {
    return [
        // Header with custom styling
        createHeadingBlock("Welcome to PostCraft!", 1, {
            styles: {
                alignment: "center",
                marginBottom: 20,
                paddingTop: 10,
                paddingBottom: 10,
            },
        }),

        // Introduction paragraph
        createTextBlock("Thank you for signing up! We're excited to have you on board."),

        // Divider for visual separation
        createDividerBlock(
            {},
            {
                styles: {
                    marginTop: 20,
                    marginBottom: 20,
                },
            }
        ) as Block,

        // Feature section
        createHeadingBlock("Get Started", 2),
        createTextBlock(
            "Explore our powerful email template builder with drag-and-drop functionality."
        ),

        // Call-to-action button
        createButtonBlock(
            {
                text: "Start Building",
                url: "https://postcraft.dev/dashboard",
            },
            {
                styles: {
                    alignment: "center",
                    marginTop: 20,
                    marginBottom: 20,
                },
            }
        ),

        // Footer
        createTextBlock("Need help? Contact our support team anytime.", {
            styles: {
                alignment: "center",
                paddingTop: 20,
            },
        }),
    ];
}

/**
 * Example: Create a product announcement template
 */
export function createProductAnnouncementTemplate(): Block[] {
    return [
        createHeadingBlock("Introducing Our Latest Feature", 1, {
            styles: { alignment: "center", marginBottom: 16 },
        }),

        createImageBlock(
            {
                src: "https://example.com/product-hero.jpg",
                alt: "New Product Feature",
                width: 600,
                height: 400,
            },
            {
                styles: { alignment: "center", marginBottom: 20 },
            }
        ),

        createTextBlock("We're thrilled to announce a game-changing addition to PostCraft..."),

        createDividerBlock() as Block,

        createHeadingBlock("Key Benefits", 2),
        createTextBlock("• Faster template creation"),
        createTextBlock("• Enhanced customization options"),
        createTextBlock("• Better collaboration tools"),

        createButtonBlock(
            { text: "Learn More", url: "/features" },
            { styles: { alignment: "center", marginTop: 24 } }
        ),
    ];
}

/**
 * Example: Clone and modify existing blocks
 */
export function demonstrateBlockCloning(): Block[] {
    // Create an original block with custom styling
    const originalBlock = createTextBlock("Original content", {
        styles: {
            alignment: "center",
            paddingLeft: 20,
            paddingRight: 20,
            backgroundColor: "#f0f0f0",
        },
    });

    // Clone it with different content but same styling
    const clonedBlock = cloneBlock(originalBlock, {
        content: { text: "Cloned content with same styles" },
    });

    // Clone with modified styles
    const modifiedClone = cloneBlock(originalBlock, {
        content: { text: "Modified content" },
        styles: {
            alignment: "left",
            paddingLeft: 10,
            paddingRight: 10,
        },
    });

    return [originalBlock, clonedBlock, modifiedClone];
}

/**
 * Example: Create empty template structure for users to fill in
 */
export function createEmptyTemplateStructure(): Block[] {
    // Quick way to create multiple empty blocks
    return createBlocksFromTypes(["heading", "text", "image", "button", "divider"]);
}

/**
 * Example: Programmatically build a newsletter template
 */
export function createNewsletterTemplate(
    articles: Array<{ title: string; excerpt: string; url: string; image?: string }>
): Block[] {
    const blocks: Block[] = [
        createHeadingBlock("Monthly Newsletter", 1, {
            styles: { alignment: "center", marginBottom: 24 },
        }),
        createTextBlock("Here's what's new this month:", {
            styles: { marginBottom: 20 },
        }),
    ];

    // Add article sections dynamically
    articles.forEach((article, index) => {
        if (index > 0) {
            blocks.push(
                createDividerBlock(
                    {},
                    {
                        styles: { marginTop: 30, marginBottom: 30 },
                    }
                ) as Block
            );
        }

        blocks.push(createHeadingBlock(article.title, 2));

        if (article.image) {
            blocks.push(
                createImageBlock(
                    { src: article.image, alt: article.title },
                    { styles: { marginBottom: 12 } }
                )
            );
        }

        blocks.push(createTextBlock(article.excerpt));

        blocks.push(
            createButtonBlock(
                { text: "Read More", url: article.url },
                { styles: { marginTop: 12, marginBottom: 12 } }
            )
        );
    });

    // Add footer
    blocks.push(
        createDividerBlock(
            {},
            {
                styles: { marginTop: 40, marginBottom: 20 },
            }
        ) as Block,
        createTextBlock("Thank you for reading!", {
            styles: { alignment: "center" },
        })
    );

    return blocks;
}

/**
 * Example: Create blocks with validation
 */
export function createBlockWithValidation(
    type: "text" | "heading" | "button",
    content: string,
    additionalData?: Record<string, unknown>
): Block | null {
    try {
        switch (type) {
            case "text": {
                return createTextBlock(content);
            }

            case "heading": {
                const level = (additionalData?.level as 1 | 2 | 3 | 4 | 5 | 6) || 1;
                return createHeadingBlock(content, level);
            }

            case "button": {
                const url = additionalData?.url as string;
                if (!url) {
                    console.error("Button requires a URL");
                    return null;
                }
                return createButtonBlock({ text: content, url });
            }

            default:
                return null;
        }
    } catch (error) {
        console.error("Failed to create block:", error);
        return null;
    }
}

/**
 * Example: Batch create blocks for A/B testing
 */
export function createVariantBlocks(baseText: string, variantCount: number): Block[] {
    const variants: Block[] = [];

    for (let i = 0; i < variantCount; i++) {
        const variant = createTextBlock(`${baseText} (Variant ${i + 1})`, {
            styles: {
                paddingTop: 10,
                paddingBottom: 10,
            },
        });
        variants.push(variant);
    }

    return variants;
}

/**
 * Example: Create default placeholder block by type string
 */
export function createPlaceholderBlock(
    type: "text" | "heading" | "button" | "image" | "divider"
): Block {
    return createDefaultBlock(type, {
        styles: {
            backgroundColor: "#f9f9f9",
            paddingTop: 10,
            paddingBottom: 10,
        },
    });
}

/**
 * Utility: Convert legacy block format to use factory
 * (Example of migrating existing code)
 */
export function migrateBlockToFactory(legacyBlock: {
    type: "text" | "heading" | "button";
    content: string;
    url?: string;
    level?: number;
}): Block {
    switch (legacyBlock.type) {
        case "text":
            return createTextBlock(legacyBlock.content);

        case "heading":
            return createHeadingBlock(
                legacyBlock.content,
                (legacyBlock.level as 1 | 2 | 3 | 4 | 5 | 6) || 1
            );

        case "button":
            return createButtonBlock({
                text: legacyBlock.content,
                url: legacyBlock.url || "#",
            });

        default:
            return createTextBlock(legacyBlock.content);
    }
}
