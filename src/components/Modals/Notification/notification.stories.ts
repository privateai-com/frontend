import type { Meta, StoryObj } from '@storybook/react';
import { Notification } from './index';

const meta: Meta<typeof Notification> = {
  title: 'Modal/Notification',
  component: Notification,
  // tags: ['autodocs'],
  argTypes: {
  },
};

export default meta;
type Story = StoryObj<typeof Notification>;

export const Standard: Story = {
  args: {
    description: 'Wrong network, please, select Polygon blockchain.',
  },
};
