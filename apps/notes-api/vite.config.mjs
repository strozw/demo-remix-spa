import build from "@hono/vite-build/node";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    build({
      entry: "./src/index.ts",
    }),
    dts({ rollupTypes: false }),
  ],
  build: {
    target: "esnext",
  },
});
