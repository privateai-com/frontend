import React, { useCallback } from 'react';
import cx from 'classnames';

import { RadioButtonProps } from './types';

import styles from './styles.module.scss';

export const RadioButtons = <T extends string>({
  options,
  onChange,
  currentValue,
  disabled,
  containerClassName,
}: RadioButtonProps<T>) => {
  const onButtonClick = useCallback(
    (value: T) => () => {
      onChange(value);
    },
    [onChange],
  );

  return (
    <div className={cx(styles.radio_button_container, containerClassName)}>
      {options.map(({ value, label }) => {
        const isActiveCircle = currentValue === value && !disabled;
        return (
          <button
            className={cx(styles.radio_button)}
            onClick={onButtonClick(value)}
            disabled={disabled}
            key={label}
          >
            <div className={cx(styles.radio_circle)}>
              {isActiveCircle && <div className={styles.active_circle} />}
            </div>
            <div>{label}</div>
          </button>
        );
      })}
    </div>
  );
};
