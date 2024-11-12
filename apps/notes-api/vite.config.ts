import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { externalizeDeps } from "vite-plugin-externalize-deps";

export default defineConfig({
  plugins: [externalizeDeps(), dts({ rollupTypes: true })],
  build: {
    target: false,
    emptyOutDir: true,
    copyPublicDir: false,
    lib: {
      entry: {
        index: "src/index.ts",
        lambda: "src/lambda.ts",
        bin: "src/bin.ts",
      },
      formats: ["es"],
    },
  },
});
