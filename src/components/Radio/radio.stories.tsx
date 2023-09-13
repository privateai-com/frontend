import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from './index';

const meta: Meta<typeof Radio> = {
  title: 'Common/Radio',
  component: Radio,
  tags: ['autodocs'],
  argTypes: {
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Standard: Story = {
  args: {
    label: 'label',
  },
};
