import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './index';

const meta: Meta<typeof Select> = {
  title: 'Common/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Standard: Story = {
  args: {
    defaultValue: 'Select',
    options: [
      {
        label: 'label',
        value: 'value',
      },
    ],
  },
};
