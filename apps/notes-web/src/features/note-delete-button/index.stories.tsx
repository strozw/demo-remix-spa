import type { ClientActionFunctionArgs } from "@remix-run/react";
import { createRemixStub } from "@remix-run/testing";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import { $path } from "remix-routes";
import { NoteDeleteButton } from ".";

const meta = {
  component: NoteDeleteButton,
  decorators: [
    (Story, ctx) => {
      const RemixStub = createRemixStub([
        {
          path: $path("/notes/:noteId/destroy", { noteId: ":noteId" }),
          action: ctx.parameters.mocks.action,
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
      action: fn(async (_args: ClientActionFunctionArgs) => null),
    },
  },
  args: {
    noteId: "test",
  },
  play: async (ctx) => {
    const view = within(ctx.canvasElement);

    const button = view.getByRole("button");

    await userEvent.click(button);

    const { action } = Default.parameters.mocks;

    await expect(action).toHaveBeenCalled();

    const args = action.mock.lastCall?.at(0);

    await expect(args?.request.method).toBe("DELETE");

    await expect(args?.params.noteId).toBe(Default.args.noteId);
  },
} satisfies Story;
