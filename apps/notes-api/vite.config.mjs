import build from "@hono/vite-build/node";
import devServer from "@hono/vite-dev-server";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
	plugins: [
		build({
			entry: "./src/index.ts",
		}),
		devServer({
			entry: "./src/index.ts",
		}),
		dts({ rollupTypes: false }),
	],
	build: {
		target: "esnext",
	},
});
