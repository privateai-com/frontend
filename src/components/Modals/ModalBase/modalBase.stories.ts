import type { Meta, StoryObj } from '@storybook/react';
import { ModalBase } from './index';

const meta: Meta<typeof ModalBase> = {
  title: 'Modal/ModalBase',
  component: ModalBase,
  // tags: ['autodocs'],
  argTypes: {
  },
};

export default meta;
type Story = StoryObj<typeof ModalBase>;

export const Standard: Story = {
  args: {
  },
};
