import React, {
  ChangeEvent,
  memo,
  useCallback,
  FC,
  RefObject,
} from 'react';
import cx from 'classnames';
import { Tooltip } from 'react-tooltip';
import Image from 'next/image';

import { useSetFocus } from 'hooks';
import { glassIcon } from 'assets/img';

import styles from './styles.module.scss';

type TextInputProps = {
  value: string
  defaultValue?: string
  name?: string
  isPassword?: boolean
  label?: string
  classNameInput?: string
  classNameLabel?: string
  classNameContainer?: string
  classNameInputError?: string
  disabled?: boolean
  autoFocus?: boolean
  isWithClear?: boolean
  onChangeValue?: (text: string, name?: string) => void
  placeholder?: string
  isTextOnly?: boolean
  isNumberOnly?: boolean
  isSearch?: boolean
  onSearchClick?: ()=> void
  onClick?: ()=> void
  description?: string,
  ref?: RefObject<HTMLInputElement>,
  errorId?: string;
  errors?: string[];
};

export const TextInput: FC<TextInputProps> = memo<TextInputProps>(
  ({
    value,
    defaultValue,
    name,
    label,
    classNameInput,
    classNameLabel,
    classNameContainer,
    disabled = false,
    autoFocus = false,
    onChangeValue,
    placeholder = '',
    isNumberOnly,
    isSearch,
    onSearchClick,
    onClick,
    description,
    ref,
    errorId,
    errors,
  }) => {
    const { ref: refRaw, setFocus } = useSetFocus();

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

    const pattern = isNumberOnly ? '^[0-9]*' : undefined;

    return (
      <div className={cx(styles.input__container, classNameContainer)}>
        {label && (
          <div
            className={cx(styles.input__label, classNameLabel)}
            onClick={setFocus}
            onKeyPress={undefined}
            role="button"
            tabIndex={0}
          >
            {label}
          </div>
        )}
        <div className={cx(styles.input__box, {
          [styles.input__box_error]: errors && errors?.length > 0,
        })}
        >
          <input
            onClick={onClick}
            ref={refRaw || ref}
            pattern={pattern}
            name={name}
            value={value}
            type={isNumberOnly ? 'number' : 'text'}
            className={cx(
              styles.input,
              { [styles.input_search]: isSearch },
              classNameInput,
            )}
            disabled={disabled}
            defaultValue={defaultValue}
            onChange={handleChange}
            placeholder={placeholder}
            min={isNumberOnly ? 0 : undefined}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus={autoFocus}
            data-tooltip-id={errorId}
          />
          {isSearch && (
            <button className={styles.glass} onClick={onSearchClick}>
              <Image src={glassIcon} width={20} height={20} alt="search" />
            </button>
          )}
        </div>
        {description && (
          <p className={styles.description}>{description}</p> 
        )}
        {(errors && errorId) && (
          <Tooltip
            id={errorId}
            place="bottom-end"
            className={styles.tooltip_error}
          >
            <ul className={styles.input_error}>
              Please check if you project name complies with the following requirements:
              {errors.map((err: string, index: number) => (
                // eslint-disable-next-line react/no-array-index-key
                <li key={index}>{err}</li>
              ))}
            </ul>
          </Tooltip>
        )}
      </div>
    );
  },
);
