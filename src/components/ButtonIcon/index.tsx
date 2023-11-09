import { memo, MouseEvent, FC } from 'react';
import Image from 'next/image';
import cx from 'classnames';
import styles from './styles.module.scss';

type ButtonIconProps = {
  onClick: (event?: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  isDisabled?: boolean;
  classNameIsDisabled?: string;
  width?: number;
  height?:number;
  image: string;
};

export const ButtonIcon: FC<ButtonIconProps> = memo(({
  onClick,
  className = '',
  isDisabled = false,
  classNameIsDisabled = '',
  image,
  width,
  height,
}) => (
  <button
    className={cx(
      styles.button_icon__container,
      {
        [styles.button_icon__disabled]: isDisabled,
        [classNameIsDisabled]: isDisabled,
      },
      className,
    )}
    onClick={isDisabled ? () => {} : onClick}
    disabled={isDisabled}
    type="button"
  >
    <Image
      src={image}
      alt="button icon"
      width={width}
      height={height}
    />
  </button>
));
