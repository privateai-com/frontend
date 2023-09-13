import type { Meta, StoryObj } from '@storybook/react';
import { TextArea } from './index';

const meta: Meta<typeof TextArea> = {
  title: 'Common/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  argTypes: {
  },
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Standard: Story = {
  args: {
  },
};
