import { createRemixStub } from "@remix-run/testing";
import type { Meta, StoryObj } from "@storybook/react";
import { FolderList } from ".";

const meta = {
  component: FolderList,
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
