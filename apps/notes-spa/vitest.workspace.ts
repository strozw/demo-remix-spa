import tsconfigPaths from "vite-tsconfig-paths";
import { defineWorkspace } from "vitest/config";

import { storybookTest } from "@storybook/experimental-addon-test/vitest-plugin";

export default defineWorkspace([
  {
    plugins: [tsconfigPaths()],
    test: {
      name: "unit",
      include: ["src/**/*.test.?(m)[jt]s?(x)"],
    },
  },
  {
    plugins: [
      tsconfigPaths(),
      storybookTest({
        storybookScript: "yarn storybook --ci",
      }),
    ],
    test: {
      name: "component",
      include: ["src/**/*.stories.?(m)[jt]s?(x)"],
      environment: "happy-dom",
      browser: {
        enabled: false,
        name: "chromium",
        provider: "playwright",
        headless: true,
      },
      // isolate: false,
      setupFiles: ["./.storybook/vitest.setup.ts"],
    },
  },
]);
