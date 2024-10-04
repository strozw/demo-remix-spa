import { resolve } from "node:path";
import reactPlugin from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { externalizeDeps } from "vite-plugin-externalize-deps";
import happyCssModules from "vite-plugin-happy-css-modules";

export default defineConfig({
  plugins: [
    reactPlugin(),
    happyCssModules({ pattern: "./src/**/*.module.css" }),
    dts(),
    externalizeDeps(),
  ],
  build: {
    target: false,
    emptyOutDir: false,
    // cssCodeSplit: true,
    copyPublicDir: false,
    lib: {
      entry: {
        index: resolve(__dirname, "src/index.ts"),
        icons: resolve(__dirname, "src/icons.ts"),
      },
      formats: ["es"],
      //fileName: "index",
    },
  },
});
