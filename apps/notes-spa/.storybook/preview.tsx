import { AppShell } from "@/app/app-shell";
import type { Preview } from "@storybook/react";

import "@/app/global.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (storyFn) => {
      return <AppShell>{storyFn()}</AppShell>;
    },
  ],
};

export default preview;
