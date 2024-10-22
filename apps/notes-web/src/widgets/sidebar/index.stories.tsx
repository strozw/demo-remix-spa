import { createRemixStub } from "@remix-run/testing";
import type { Meta, StoryObj } from "@storybook/react";
import { Sidebar } from ".";

const meta = {
  component: Sidebar,
  decorators: [
    (Story) => {
      const RemixStub = createRemixStub([
        {
          path: "/",
          Component: () => <Story />,
        },
      ]);

      return (
        <RemixStub
          initialEntries={["/"]}
          hydrationData={{
            loaderData: {
              root: {
                folders: [{ id: "abc", name: "test" }],
              },
            },
          }}
        />
      );
    },
  ],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
