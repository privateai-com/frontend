import type { Meta, StoryObj } from '@storybook/react';
import { TextInput } from '.';

const meta: Meta<typeof TextInput> = {
  title: 'Common/Input',
  component: TextInput,
  tags: ['autodocs'],
  argTypes: {

  },
};

export default meta;
type Story = StoryObj<typeof TextInput>;

export const Standard: Story = {
  args: {
    value: 'value',
    placeholder: 'Search project',
  },
};

export const WithPassword: Story = {
  args: {
    value: 'value',
    placeholder: 'Search project',
    isPassword: true,
  },
};

export const Search: Story = {
  args: {
    value: 'value',
    placeholder: 'Search project', 
    isSearch: true,
  },
};
