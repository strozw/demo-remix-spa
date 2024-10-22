import type { Preview } from "@storybook/react";
import { AppShell } from "src/app/app-shell";

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
