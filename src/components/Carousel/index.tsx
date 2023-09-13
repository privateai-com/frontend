import { NavigationOptions, PaginationOptions } from 'swiper/types';
import React, { FC, ReactNode } from 'react';
import SwiperCore, {
  Navigation,
  Pagination,
  Thumbs,
  Autoplay,
  SwiperOptions,
} from 'swiper';
import { Swiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import cx from 'classnames';

import styles from './styles.module.scss';

interface CarouselProps {
  classNameContainer?: string,
  disableClassName?: string,
  onSwiper?: (val: SwiperCore) => void,
  thumbsSwiper?: SwiperCore,
  slidesPerView: number | 'auto' | undefined,
  children: ReactNode,
  spaceBetween?: number,
  withPagination?: boolean,
  loop?: boolean,
  autoplayDelay?: number,
  prefixNavigation?: string
  breakpoints?: SwiperOptions['breakpoints'];
  classNameSlideActiveClass?: string;
}
export const Carousel: FC<CarouselProps> = ({
  classNameContainer,
  onSwiper,
  thumbsSwiper,
  slidesPerView,
  children,
  spaceBetween = 30,
  withPagination = false,
  breakpoints,
  disableClassName,
  loop = false,
  autoplayDelay,
  prefixNavigation = '',
  classNameSlideActiveClass,
}) => {
  const prev = `${prefixNavigation}-prev`;
  const next = `${prefixNavigation}-next`;
  const navigation: NavigationOptions = {
    disabledClass: `${disableClassName}`,
    prevEl: `.${prev}`,
    nextEl: `.${next}`,
  };

  const pagination: PaginationOptions = {
    bulletClass: `swiper-pagination-bullet ${styles.bullet_pagination}`,
    bulletActiveClass: styles.bullet_active,
    clickable: true,
    modifierClass: `${styles.pagination} `,
  };

  SwiperCore.use([Navigation, Pagination, Thumbs, Autoplay]);
  return (
    <Swiper
      className={cx(
        classNameContainer,
        withPagination && styles.carousel_pagination_container,
      )}
      onSwiper={onSwiper}
      thumbs={{
        swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
      }}
      breakpoints={breakpoints}
      slidesPerView={slidesPerView}
      spaceBetween={spaceBetween}
      navigation={navigation}
      autoplay={!!autoplayDelay && { delay: autoplayDelay }}
      loop={loop}
      pagination={withPagination && pagination}
      observeParents
      resizeObserver
      watchOverflow
      slideActiveClass={classNameSlideActiveClass}
    >
      {children}
    </Swiper>
  );
};
