import React, { ChangeEvent, FC, memo } from 'react';
import Form from 'react-bootstrap/Form';
import cx from 'classnames';
import styles from './styles.module.css';

type OptionSelect = {
  value: string,
  label: string,
};

type SelectProps = {
  className?: string,
  defaultValue?: string,
  options: OptionSelect[],
  onChangeValue?: (option: OptionSelect) => void
  isDisabled?: boolean;
};

export const Select: FC<SelectProps> = memo(({
  className = '',
  defaultValue,
  options,
  onChangeValue,
  isDisabled = false,
}) => (
  <Form.Select
    aria-label="Default select example"
    className={cx(styles.select, className)}
    onChange={(e: ChangeEvent<HTMLSelectElement>) => {
      if (onChangeValue) {
        const selectedOption = options.find((option) => option.value === e.target.value);
        if (selectedOption) {
          onChangeValue(selectedOption);
        }
      }
    }}
    disabled={isDisabled}
  >
    {defaultValue && <option>{defaultValue}</option>}
    {options && options.map(({ label, value }) => (
      <option value={value} key={value}>{label}</option>
    ))}
  </Form.Select>
));
