import type { Preview } from "@storybook/react";
import { UiProvider } from "../src/provider";

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
      return <UiProvider>{storyFn()}</UiProvider>;
    },
  ],
};

export default preview;
