import type { ClientActionFunctionArgs } from "@remix-run/react";
import { createRemixStub } from "@remix-run/testing";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import { $path } from "remix-routes";
import { FolderCreationForm } from ".";

const meta = {
  component: FolderCreationForm,
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
  args: {
    onSubmit: fn(() => {}),
  },
  play: async (ctx) => {
    const view = within(ctx.canvasElement);

    const input = view.getByRole("textbox");

    await userEvent.type(input, "test");

    const button = view.getByRole("button");

    await userEvent.click(button);

    const { foldersAction } = Default.parameters.mocks;

    await expect(foldersAction).toHaveBeenCalled();

    const args = foldersAction.mock.lastCall?.at(0);

    await expect(args?.request.method).toBe("POST");

    const formData = await args?.request.formData();

    await expect(formData?.get("name")).toBe("test");

    await expect(Default.args.onSubmit).toBeCalled();
  },
} satisfies Story;
