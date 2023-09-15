/* eslint-disable react/no-unstable-nested-components */
import React, {
  FC, useState, forwardRef, RefObject, useCallback, useRef, memo, 
} from 'react';
import DatePickerRaw from 'react-datepicker';
import cx from 'classnames';
import { calendarIcon } from 'assets';
import { TextInput, ButtonIcon } from 'components';
import styles from './styles.module.css';

interface DatePickerProps {
  className?: string;
  onChangeValue?: (date: Date) => void;
  errors?: string[];
}

const ExampleCustomInput = forwardRef(
  (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { value, onClick, errors }: any, 
    ref,
  ): JSX.Element => (
    <div className={styles.container}>
      <TextInput 
        value={value} 
        onClick={onClick} 
        ref={ref as RefObject<HTMLInputElement>} 
        classNameContainer={styles.containerInput} 
        classNameInput={styles.input}
        error={errors}
      />
      <ButtonIcon image={calendarIcon} onClick={onClick} className={styles.icon} />
    </div>
  ),
);

export const DatePicker: FC<DatePickerProps> = memo(({
  className = '',
  onChangeValue,
  errors,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const inputRef = useRef<RefObject<HTMLInputElement>>(null);
  
  const onChange = useCallback((date: Date | null) => {
    setStartDate(date);
    if (onChangeValue && date) {
      onChangeValue(date);
    }
  }, [onChangeValue]);

  return (
    <div className={cx(styles.datePicker, className)}>
      <DatePickerRaw 
        customInput={<ExampleCustomInput errors={errors} inputRef={inputRef} />}
        selected={startDate} 
        onChange={onChange}
        calendarClassName={styles.calendar}
      />
    </div>
  );
});
