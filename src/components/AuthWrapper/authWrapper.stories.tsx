import type { Meta, StoryObj } from '@storybook/react';
import { AuthWrapper } from './index';

const meta: Meta<typeof AuthWrapper> = {
  title: 'Common/AuthWrapper',
  component: AuthWrapper,
  tags: ['autodocs'],
  argTypes: {
  },
};

export default meta;
type Story = StoryObj<typeof AuthWrapper>;

export const Standard: Story = {
  args: {
  },
};
