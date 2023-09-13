import React, { memo } from 'react';
import SwiperCore from 'swiper';
import cx from 'classnames';
import 'swiper/css';
import 'swiper/css/navigation';

import { ButtonIcon } from 'components';
import styles from './styles.module.scss';

interface CarouselNavigationProps {
  classNameContainer?: string,
  swiper?: SwiperCore,
  arrowLeftClassName?: string,
  arrowRightClassName?: string,
  // arrowIconLeftClassName?: string,
  // arrowIconRightClassName?: string,
  urlImage: string,
  prefixNavigation?: string,
}

const CarouselNavigation = memo(({
  classNameContainer,
  swiper,
  arrowLeftClassName,
  urlImage,
  arrowRightClassName,
  prefixNavigation = '',
}: CarouselNavigationProps) => (
  <div className={classNameContainer}>
    <ButtonIcon
      onClick={() => swiper?.slidePrev()}
      className={cx(
        styles.arrow,
        styles.left_arrow_button,
        arrowLeftClassName,
        `${prefixNavigation}-prev`,
      )}
      image={urlImage}
    />
    <ButtonIcon
      onClick={() => swiper?.slideNext()}
      className={cx(
        styles.arrow,
        styles.right_arrow_button,
        arrowRightClassName,
        `${prefixNavigation}-next`,
      )}
      image={urlImage}
    />
  </div>
));

export { CarouselNavigation };
