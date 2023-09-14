import type { Meta, StoryObj } from '@storybook/react';
import { ProfileSuccess } from './index';

const meta: Meta<typeof ProfileSuccess> = {
  title: 'Modal/ProfileSuccess',
  component: ProfileSuccess,
  // tags: ['autodocs'],
  argTypes: {
  },
};

export default meta;
type Story = StoryObj<typeof ProfileSuccess>;

export const Standart: Story = {
  args: {
  },
};
