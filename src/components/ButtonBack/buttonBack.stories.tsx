import type { Meta, StoryObj } from '@storybook/react';
import { ButtonBack } from 'components';

const meta: Meta<typeof ButtonBack> = {
  title: 'Common/ButtonBack',
  component: ButtonBack,
  tags: ['autodocs'],
  argTypes: {
  },
};

export default meta;
type Story = StoryObj<typeof ButtonBack>;

export const Standard: Story = {
  args: {
    title: 'Back to project page',
  },
};
