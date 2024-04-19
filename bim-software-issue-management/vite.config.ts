import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsConfigPaths()],
  base: "./",
  build: {
    rollupOptions: {
      output: {
        dir: "dist",
        entryFileNames: "index.js",
        chunkFileNames: "chunk.js",
        assetFileNames: "asset.css",
        manualChunks: undefined,
      },
    },
  },
});
