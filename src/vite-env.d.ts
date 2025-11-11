/// <reference types="vite/client" />

/**
 * Type declarations for CSS module imports.
 * Allows importing .css files without TypeScript errors.
 */
declare module "*.css" {
    const content: string;
    export default content;
}
