import type { Meta, StoryObj } from '@storybook/react';
import { Navigation } from './index';

const meta: Meta<typeof Navigation> = {
  title: 'Common/Navigation',
  component: Navigation,
  tags: ['autodocs'],
  argTypes: {
  },
};

export default meta;
type Story = StoryObj<typeof Navigation>;

export const Standart: Story = {
  args: {
  },
};
