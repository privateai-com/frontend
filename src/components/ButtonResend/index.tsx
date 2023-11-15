import React, {
  memo, useCallback, useEffect, useState, useRef, 
} from 'react';
import cx from 'classnames';

import styles from './styles.module.scss';

const secondsToWaiting = 60;

interface ButtonResendProps {
  className?: string;
  onClick: () => void;
}

export const ButtonResend = memo<ButtonResendProps>(({
  className,
  onClick,
}) => {
  const [timer, setTimer] = useState(secondsToWaiting);
  const [disabled, setDisabled] = useState(true);
  const intervalRef = useRef<number | null>(null);

  const startTimer = useCallback(() => {
    setDisabled(true);
    let countdown = secondsToWaiting;
    intervalRef.current = window.setInterval(() => {
      countdown -= 1;
      setTimer((state) => state - 1);
      if (countdown <= 0) {
        clearInterval(intervalRef.current!); // Очищаем интервал
        intervalRef.current = null;
        setDisabled(false);
        countdown = secondsToWaiting;
        setTimer(0);
      }
    }, 1000);
  }, []);

  useEffect(() => {
    startTimer();

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleResendClick = useCallback(() => {
    onClick();
    setTimer(secondsToWaiting);
    startTimer();
  }, [onClick, startTimer]);

  return (
    <button
      className={cx(styles.buttonResend_container, className)}
      onClick={handleResendClick}
      disabled={disabled}
      type="button"
      tabIndex={0}
    >
      Resend the code 
      {' '}
      {timer > 0 && `(${timer}s)` }
    </button>
  );
});
