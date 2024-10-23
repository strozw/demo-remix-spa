import type { ClientActionFunctionArgs } from "@remix-run/react";
import { createRemixStub } from "@remix-run/testing";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { $path } from "remix-routes";
import { GlobalHeader } from ".";

const meta = {
  component: GlobalHeader,
  decorators: [
    (Story, ctx) => {
      const RemixStub = createRemixStub([
        {
          path: $path("/folders/new"),
          action: ctx.parameters.mocks.foldersAction,
        },
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
  parameters: {
    mocks: {
      foldersAction: fn(async (_args: ClientActionFunctionArgs) => null),
    },
  },
} satisfies Story;
