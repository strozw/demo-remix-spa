import { resolve } from "node:path";
import { defineConfig, loadEnv } from "vite";
import happyCssModules from "vite-plugin-happy-css-modules";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, resolve("../"), "") };

  return {
    plugins: [
      tsconfigPaths(),
      happyCssModules({ pattern: "src/**/*.module.{css,scss,less}" }),
    ],
  };
});
