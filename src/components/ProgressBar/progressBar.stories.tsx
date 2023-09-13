import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from './index';

const meta: Meta<typeof ProgressBar> = {
  title: 'Common/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  argTypes: {
  },
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Progress0: Story = {
  args: {
    progress: 0,
  },
};

export const Progress50: Story = {
  args: {
    progress: 50,
  },
};

export const Progress100: Story = {
  args: {
    progress: 100,
  },
};
