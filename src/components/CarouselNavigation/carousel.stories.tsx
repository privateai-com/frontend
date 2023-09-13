import type { Meta, StoryObj } from '@storybook/react';
import { arrowSliderIcon } from 'assets';
import { CarouselNavigation } from './index';

const meta: Meta<typeof CarouselNavigation> = {
  title: 'Common/CarouselNavigation',
  component: CarouselNavigation,
  tags: ['autodocs'],
  argTypes: {
  },
};

export default meta;
type Story = StoryObj<typeof CarouselNavigation>;

export const Standard: Story = {
  args: {
    prefixNavigation: 'thumbs',
    urlImage: arrowSliderIcon,
  },
};
