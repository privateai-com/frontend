import type { Meta, StoryObj } from '@storybook/react';
import { SwiperSlide } from 'swiper/react';

import { Carousel } from './index';

const meta: Meta<typeof Carousel> = {
  title: 'Common/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  argTypes: {
  },
};

export default meta;
type Story = StoryObj<typeof Carousel>;

export const Standard: Story = {
  args: {
    children: (
      <>
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </>
    ),
  },
};
