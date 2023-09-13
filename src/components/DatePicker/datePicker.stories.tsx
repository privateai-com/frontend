import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from './index';

const meta: Meta<typeof DatePicker> = {
  title: 'Common/DatePicker',
  component: DatePicker,
  argTypes: {
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Standard: Story = {
  args: {
  },
};
