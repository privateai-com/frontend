import React, { forwardRef, memo } from 'react';
import cx from 'classnames';
import Link from 'next/link';

import { useHoverEvent } from 'hooks';
import { Loader } from '../Loader';
import { ButtonProps, ButtonRef } from './types';

import styles from './styles.module.scss';

const Button = memo(
  forwardRef(
    (
      {
        theme = 'primary',
        isFullWidth,
        onClick,
        className,
        children,
        disabled,
        isLoading,
        href,
      }: ButtonProps,
      ref: ButtonRef,
    ) => {
      const { onMouseEnter, onMouseLeave } = useHoverEvent();

      if (href) {
        return (
          <Link
            href={href}
            className={cx(
              styles.button,
              styles[theme],
              {
                [styles.full_width]: isFullWidth,
                [styles.disabled]: disabled,
              },
              className,
            )}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <div
              className={cx({ [styles.children_while_loading]: isLoading })}
            >
              {children}
            </div>
            {isLoading && <Loader className={styles.loader} />}
          </Link>
        );
      }

      return (
        <button
          ref={ref}
          type="button"
          className={cx(
            styles.button,
            styles[theme],
            {
              [styles.full_width]: isFullWidth,
              [styles.disabled]: disabled,
            },
            className,
          )}
          onClick={onClick}
          disabled={disabled || isLoading}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <div className={cx({ [styles.children_while_loading]: isLoading })}>
            {children}
          </div>
          {isLoading && <Loader className={styles.loader} />}
        </button>
      );
    },
  ),
);

export { Button };