import React, {
  ChangeEvent,
  memo,
  useCallback,
  FC,
} from 'react';
import { Tooltip } from 'react-tooltip';
import cx from 'classnames';

import { useAutosize } from 'hooks';

import styles from './styles.module.scss';

type TextAreaProps = {
  autoSize?: boolean;
  hasError?: boolean;
  value?: string;
  classNameContainer?: string;
  onChangeValue?: (text: string) => void;
  maxLength?: number;
  placeholder?: string;
  errorId?: string;
  errors?: string[];
};

const TextArea: FC<TextAreaProps> = memo<TextAreaProps>(({
  autoSize,
  hasError,
  value,
  onChangeValue,
  maxLength,
  classNameContainer,
  placeholder,
  errorId,
  errors,
  ...props
}) => {
  const ref = useAutosize(!!autoSize);

  const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    if (onChangeValue !== undefined) {
      onChangeValue(e.target.value);
    }
  }, [onChangeValue]);
  return (
    <div className={styles.container}> 
      <textarea
        {...props}
        ref={ref}
        maxLength={maxLength}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={cx(
          styles.textarea__container, 
          {
            [styles.error]: errors && errors?.length > 0,
          },
          classNameContainer,
        )}
        data-tooltip-id={errorId}
      />
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
});

export { TextArea };
