import React, { forwardRef, memo } from 'react';
import cx from 'classnames';
import Link from 'next/link';

import { useHoverEvent } from 'hooks';
import { Loader } from '../Loader';
import { ButtonProps, ButtonRef } from './types';

import styles from './styles.module.scss';

const ButtonTransparent = memo(
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
          isMobileAdaptive,
          isHrefBlank,
          type,
        }: ButtonProps,
        ref: ButtonRef,
      ) => {
        const { onMouseEnter, onMouseLeave } = useHoverEvent();
  
        if (href && !disabled) {
          return (
            <Link
              href={href}
              className={cx(
                styles.button,
                styles[theme],
                {
                  [styles.full_width]: isFullWidth,
                  [styles.disabled]: disabled,
                  [styles.mobile]: isMobileAdaptive,
                },
                className,
              )}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              target={isHrefBlank && !disabled ? '_blank' : '_self'}
            >
              <div className={cx({ [styles.children_while_loading]: isLoading })}>
                {children}
              </div>
              {isLoading && <Loader className={styles.loader} />}
            </Link>
          );
        }
  
        return (
          <button
            ref={ref}
            type={type}
            className={cx(
              styles.button,
              styles[theme],
              {
                [styles.full_width]: isFullWidth,
                [styles.disabled]: disabled,
                [styles.mobile]: isMobileAdaptive,
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
  
  export { ButtonTransparent };