import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [dts()],
  build: {
    target: "esnext",

    emptyOutDir: true,

    copyPublicDir: false,

    lib: {
      entry: {
        index: "./src/index.ts",
      },
      formats: ["es"],
    },
  },
});
