import { defineConfig } from "tsup";

export default defineConfig({
  // Entry point of the library
  entry: {
    index: "src/index.ts",
    ["content-builder"]: "src/components/content-builder/index.ts",
  },
  // entry: ["src/**/index.ts"],
  format: ["cjs", "esm"],
  // Generate TypeScript declaration files
  dts: true,
  // Clean the output directory before building
  clean: true,
  // Generate source maps for easier debugging
  sourcemap: true,
  // Enable minification (optional but useful for production)
  minify: true,
  // Allow tree-shaking by not bundling dependencies (for ESM)
  splitting: true,
  // Enable code splitting, important for tree-shaking
  treeshake: true,
  // Specify the output directory
  outDir: "dist",
});
