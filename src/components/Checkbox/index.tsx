import React, { memo, useCallback, FC } from 'react';
import cx from 'classnames';
import Image from 'next/image';

import { checkboxIcon, infoIcon } from 'assets';
import { Tooltip } from 'react-tooltip';
import styles from './styles.module.scss';

type CheckboxProps = {
  className?: string;
  checkboxClassName?: string;
  isChecked: boolean;
  onChange: (isChecked: boolean) => void;
  label?: string | JSX.Element;
  notify?: string;
  hasError?: boolean;
  disabled?: boolean;
};

export const Checkbox: FC<CheckboxProps> = memo<CheckboxProps>(({
  onChange,
  label,
  notify,
  isChecked,
  className,
  checkboxClassName,
  hasError,
  disabled = false,
}) => {
  const onChangeHandler = useCallback(() => {
    onChange(!isChecked);
  }, [onChange, isChecked]);

  return (
    <div className={cx(styles.checkbox_container, className)}>
      <button
        className={cx(
          styles.checkbox,
          {
            [styles.checkbox_checked]: isChecked,
            [styles.checkbox_error]: hasError,
            [styles.checkbox_disabled]: disabled,
          },
          checkboxClassName,
        )}
        onClick={onChangeHandler}
        type="button"
        disabled={disabled}
      >
        <Image
          src={checkboxIcon}
          alt="check"
          className={cx(styles.checkbox_icon, { [styles.checkbox_icon_checked]: isChecked })}
        />
      </button>
      
      {label !== undefined && (
        <div className={cx(styles.label, {
          [styles.label_disabled]: disabled,
        })}
        >
          {label}
        </div>
      )}

      {notify && (
        <>
          <Image
            src={infoIcon}
            alt=""
            width={14}
            height={14}
            className={cx(styles.checkbox_notify)}
            data-tooltip-id={notify}
          />
          <Tooltip
            id={notify}
            place="bottom"
            className={styles.tooltip_notify}
          >
            {notify}
          </Tooltip>
        </>
      )}
    </div>
  );
});
