import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from '.';

const meta: Meta<typeof Pagination> = {
  title: 'Common/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {

  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Standard: Story = {
  args: {
    pageCount: 5,
  },
};

export const MorePage: Story = {
  args: {
    pageCount: 50,
  },
};
