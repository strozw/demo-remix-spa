import { createRemixStub } from "@remix-run/testing";
import type { Meta, StoryObj } from "@storybook/react";
import { NotesTable } from ".";

const meta = {
  component: NotesTable,
  decorators: [
    (Story) => {
      const RemixStub = createRemixStub([
        {
          path: "/",
          Component: () => <Story initialEntries={["/"]} />,
        },
      ]);

      return <RemixStub />;
    },
  ],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    data: [
      {
        id: "id-1",
        title: "Test1",
        createdAt: new Date().toISOString(),
      },
    ],
  },
} satisfies Story;
