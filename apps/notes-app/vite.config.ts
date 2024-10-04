import { vitePlugin as remix } from "@remix-run/dev";
import { remixDevTools } from "remix-development-tools";
import { remixRoutes } from "remix-routes/vite";
import { type PluginOption, defineConfig } from "vite";
import happyCssModules from "vite-plugin-happy-css-modules";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    happyCssModules({ pattern: "src/**/*.module.{css,scss,less}" }),
    // `remix` より前に追加が必要
    remixDevTools(),
    remix({
      ssr: false,
      appDirectory: "src/app",
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    remixRoutes({ outDir: "./" }),
  ] as PluginOption[],
});
