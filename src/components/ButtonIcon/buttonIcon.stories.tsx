import type { Meta, StoryObj } from '@storybook/react';
import { ButtonIcon } from 'components';
import { glassIcon } from 'assets';

const meta: Meta<typeof ButtonIcon> = {
  title: 'Common/ButtonIcon',
  component: ButtonIcon,
  tags: ['autodocs'],
  argTypes: {
    // children: 'Button',
  },
};

export default meta;
type Story = StoryObj<typeof ButtonIcon>;

export const Standard: Story = {
  args: {
    image: glassIcon.src,
    width: 22,
    height: 22,
  },
};
