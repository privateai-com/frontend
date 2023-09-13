import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './index';

const meta: Meta<typeof Checkbox> = {
  title: 'Common/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Standard: Story = {
  args: {
    label: 'label',
  },
};
