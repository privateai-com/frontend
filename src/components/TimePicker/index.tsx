import React, { FC, useCallback, useState } from 'react';
import TimePickerRaw from 'rc-time-picker';
import cx from 'classnames';
import moment, { Moment } from 'moment';
import { clockIcon } from 'assets';
import { ButtonIcon } from 'components';
import styles from './styles.module.css';

interface TimePickerProps {
  className?: string
  onChangeValue?: (newValue: Moment) => void;
  value?: Moment;
  error?: boolean;
}

export const TimePicker: FC<TimePickerProps> = ({
  className = '',
  onChangeValue,
  value,
  error = false,
}) => {
  const [open, setOpen] = useState({ open: false });
  const handleClick = useCallback(() => {
    setOpen({ open: !open.open });
  }, [open]);

  return (
    <div className={cx(styles.timePicker, className)}>
      <TimePickerRaw 
        defaultValue={moment()} 
        showSecond={false} 
        minuteStep={15}
        open={open.open}
        onOpen={setOpen}
        onClose={setOpen}
        focusOnOpen
        onChange={onChangeValue}
        value={value}
        className={cx({
          [styles.error]: error,
        })}
      />
      <ButtonIcon image={clockIcon} onClick={handleClick} className={styles.icon} />
    </div>
  );
};
