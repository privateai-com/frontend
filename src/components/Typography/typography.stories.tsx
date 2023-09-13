import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from './index';

const meta: Meta<typeof Typography> = {
  title: 'Common/Typography',
  component: Typography,
  tags: ['autodocs'],
  argTypes: {
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const H1: Story = {
  args: {
    children: 'Typography H1 ',
    type: 'h1',
  },
};

export const H2: Story = {
  args: {
    children: 'Typography H2 ',
    type: 'h2',
  },
};

export const H3: Story = {
  args: {
    children: 'Typography H3 ',
    type: 'h3',
  },
};
