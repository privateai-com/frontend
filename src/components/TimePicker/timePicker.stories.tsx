import type { Meta, StoryObj } from '@storybook/react';
import { TimePicker } from './index';

const meta: Meta<typeof TimePicker> = {
  title: 'Common/TimePicker',
  component: TimePicker,
  argTypes: {
  },
};

export default meta;
type Story = StoryObj<typeof TimePicker>;

export const Standard: Story = {
  args: {
  },
};
