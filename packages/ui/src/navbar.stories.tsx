import type { Meta, StoryObj } from "@storybook/react";
import { Navbar } from "./navbar";

const meta = {
  component: Navbar,
} satisfies Meta;

export default meta;

export const Default = {
  args: {
    children: ["child1", "child2", "child3"],
  },
} satisfies StoryObj;
