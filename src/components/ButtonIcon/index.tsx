import React, { MouseEvent, forwardRef } from 'react';
import Image from 'next/image';
import cx from 'classnames';
import styles from './styles.module.scss';

interface ButtonIconProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: (event?: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  isDisabled?: boolean;
  classNameIsDisabled?: string;
  width?: number;
  height?:number;
  image: string;
  children? : React.ReactNode;
}

export const ButtonIcon =
forwardRef<HTMLButtonElement, ButtonIconProps>(({
  onClick,
  className = '',
  isDisabled = false,
  classNameIsDisabled = '',
  image,
  width,
  height,
  children,
}, ref) => (
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
    ref={ref}
  >
    <Image
      src={image}
      alt="button icon"
      priority 
      width={width}
      height={height}
    />
    {children}
  </button>
));
