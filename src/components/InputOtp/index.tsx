import React, { memo } from 'react';
import cx from 'classnames';
import OtpInput from 'react-otp-input';

import styles from './styles.module.scss';

type InputOtpProps = {
  value: string;
  numInputs?: number;
  label?: any;
  classNameContainer?: string;
  classNameLabel?: string;
  classNameInput?: string;
  error?: string | undefined;
  isError?: boolean;
  onChangeValue: (otp: string) => void;
};

export const InputOtp = memo<InputOtpProps>(({
  value,
  numInputs = 6,
  onChangeValue,
  error,
  label,
  classNameContainer,
  classNameLabel,
  classNameInput,
  isError,
}) => (
  <div className={cx(styles.input_otp__container, classNameContainer)}>
    {label !== undefined && (
      <div className={cx(
        styles.input_otp__label, 
        classNameLabel, 
        { [styles.labelError]: isError },
      )}
      >
        {label}
      </div>
    )}
    <OtpInput
      containerStyle={cx(styles.input_otp, classNameInput)}
      inputStyle={cx(styles.input_otp__input, {
        [styles.input_otp__input_error]: error,
        [styles.input_otp__input_error]: isError,
      })}
      value={value}
      onChange={onChangeValue}
      numInputs={numInputs}
      renderInput={(props) => <input {...props} />}
      inputType="number"
    />
    {error && (
      <span className={styles.input_otp__container_error}>
        {error}
      </span>
    )}
  </div>
));
