import type { Meta, StoryObj } from '@storybook/react';
import { Button } from 'components';

const meta: Meta<typeof Button> = {
  title: 'Common/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Standard: Story = {
  args: {
    children: 'Confirm',
  },
};

export const Link: Story = {
  args: {
    children: 'Move to',
    href: '/',
  },
};
