import reactPlugin from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { externalizeDeps } from "vite-plugin-externalize-deps";
import happyCssModules from "vite-plugin-happy-css-modules";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    reactPlugin(),
    happyCssModules({ pattern: "./src/**/*.module.css" }),
    dts(),
    externalizeDeps(),
  ],
  build: {
    target: false,
    emptyOutDir: true,
    copyPublicDir: false,
    lib: {
      entry: {
        index: "src/index.ts",
        icons: "src/icons.ts",
      },
      formats: ["es"],
    },
  },
});
