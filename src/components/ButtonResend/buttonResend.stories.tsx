import type { Meta, StoryObj } from '@storybook/react';
import { ButtonResend } from 'components';

const meta: Meta<typeof ButtonResend> = {
  title: 'Common/ButtonResend',
  component: ButtonResend,
  tags: ['autodocs'],
  argTypes: {
  },
};

export default meta;
type Story = StoryObj<typeof ButtonResend>;

export const Standard: Story = {
  args: {
  },
};
