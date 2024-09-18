import type { Meta, StoryObj } from "@storybook/react";
import Editor from "./Editor";

// Explicitly typing meta as Meta<typeof Editor>
const meta: Meta<typeof Editor> = {
  title: "UI/Editor",
  component: Editor,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { onChange: () => {}, onSubmit: () => {} },
};
