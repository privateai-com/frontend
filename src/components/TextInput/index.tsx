import React, {
  ChangeEvent,
  ChangeEventHandler,
  RefObject,
  memo,
  useCallback,
  useState,
} from 'react';
import cx from 'classnames';
import Image from 'next/image';

import { useSetFocus } from 'hooks';
import {
  eyeCrossedIcon,
  eyeIcon,
  notificationIcon,
  searchIcon,
} from 'assets';

import { ButtonIcon } from 'components';
import styles from './styles.module.scss';

type TextInputProps = {
  value: string;
  defaultValue?: string;
  name?: string;
  isPassword?: boolean;
  label?: string;
  labelRight?: string;
  suffix?: string;
  tokenSymbol?: string;
  classNameInput?: string;
  classNameLabel?: string;
  classNameContainer?: string;
  classNameInputBox?: string;
  classNameSuffix?: string;
  classNameInputError?: string;
  classNameNotification?: string;
  disabled?: boolean;
  isWithClear?: boolean;
  onChangeValue?: (text: string, name?: string) => void;
  placeholder?: string;
  isClearable?: boolean;
  isTextOnly?: boolean;
  isNumberOnly?: boolean;
  isRequired?: boolean;
  isError?: boolean;
  tagName?: string;
  tooltipId?: string;
  error?: string | undefined;
  onBlur?: ChangeEventHandler<HTMLInputElement>;
  onFocus?: ChangeEventHandler<HTMLInputElement>;
  isSearch?: boolean;
  onClick?: () => void;
  ref?: RefObject<HTMLInputElement>;
  autoComplete?: boolean;
};

export const TextInput = memo<TextInputProps>(({
  value,
  defaultValue,
  name,
  label,
  labelRight,
  suffix,
  classNameInput,
  classNameLabel = '',
  classNameContainer,
  classNameInputBox,
  classNameSuffix,
  classNameInputError,
  classNameNotification,
  disabled = false,
  onChangeValue,
  placeholder = '',
  isError,
  isClearable,
  isNumberOnly,
  isPassword,
  isRequired,
  tooltipId,
  error,
  onBlur,
  onFocus,
  onClick,
  isSearch,
  ref,
  autoComplete = false,
}) => {
  const { ref: refRaw, setFocus } = useSetFocus();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const inputType = isPassword && !isPasswordVisible ? 'password' : 'text';

  const formatInputToNumber = (input: string) => {
    let index = 0;
    // eslint-disable-next-line no-plusplus
    const inputReplaced = input.replace(/[^\d.,]+/g, '').replace(',', '.').replace(/\./g, (item) => (!index++ ? item : ''));

    let inputNext = inputReplaced;

    if (inputNext.startsWith('.')) {
      inputNext = `0${inputNext}`;
    }
    if (inputNext.startsWith('00')) {
      inputNext = inputNext.replace('00', '0');
    }

    return inputNext;
  };

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (onChangeValue !== undefined) {
      const nextValue = isNumberOnly ? formatInputToNumber(e.target.value) : e.target.value;
      onChangeValue(nextValue, name);
    }
  }, [onChangeValue, isNumberOnly, name]);

  const onPasswordToggleClick = useCallback(() => {
    setIsPasswordVisible(!isPasswordVisible);
  }, [isPasswordVisible]);

  const onClearClick = () => {
    if (onChangeValue !== undefined) {
      onChangeValue('');
    }
  };

  const pattern = isNumberOnly ? '[0-9]*' : undefined;

  const isLabel = label !== undefined || labelRight !== undefined;

  return (
    <div className={cx(styles.input__container, classNameContainer)}>
      {isLabel && (
        <div
          className={styles.label_container}
          onClick={setFocus}
          onKeyPress={undefined}
          role="button"
          tabIndex={-1}
        >
          {label !== undefined && (
            <div className={cx(
              styles.input__label, 
              { [classNameLabel]: !isError }, 
              { [styles.errorLabel]: isError },
            )}
            >
              {label}
              {isRequired && <span className={styles.required}>*</span>}
            </div>
          )}
          {labelRight !== undefined && (
            <div className={cx(styles.input__label_right)}>{labelRight}</div>
          )}
        </div>
      )}
      <div
        className={cx(styles.input__box, classNameInputBox, {
          [styles.input__box_error]: error,
          [styles.errorInput]: isError,
        })}
      >
        {isSearch && (
          <Image
            src={searchIcon}
            alt="search icon"
            className={styles.search_icon}
          />
        )}
        <input
          ref={refRaw || ref}
          pattern={pattern}
          name={name}
          value={value}
          type={inputType}
          className={classNameInput}
          disabled={disabled}
          defaultValue={defaultValue}
          onChange={handleChange}
          placeholder={placeholder}
          onBlur={onBlur}
          onFocus={onFocus}
          onClick={onClick}
          autoComplete={autoComplete ? 'on' : 'off'}
        />
        {isPassword && (
          <ButtonIcon
            image={isPasswordVisible ? eyeCrossedIcon : eyeIcon}
            className={cx(styles.input_icon)}
            onClick={onPasswordToggleClick}
            width={20}
            height={20}
          />
        )}
        {isClearable && !!value && (
          <button
            className={styles.input_btn_clear}
            onClick={onClearClick}
            type="button"
            tabIndex={0}
          >
            <div className={cx(styles.input_cross, { [styles.errorCross]: isError })} />
            <div className={cx(styles.input_cross, { [styles.errorCross]: isError })} />
          </button>
        )}
        {suffix !== undefined && (
          <div className={cx(styles.input__suffix, classNameSuffix)}>
            {suffix}
          </div>
        )}
        {tooltipId && (
          <button
            className={cx(styles.input__notification, classNameNotification)}
            data-for={tooltipId}
            data-tip
            data-event="click"
            type="button"
            tabIndex={-1}
          >
            <Image
              src={notificationIcon}
              alt="notification"
            />
          </button>
        )}
      </div>
      {error && (
        <span className={cx(styles.input__error, classNameInputError)}>
          {error}
        </span>
      )}
    </div>
  );
});
