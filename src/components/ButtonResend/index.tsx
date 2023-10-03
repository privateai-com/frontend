import React, {
  memo, useCallback, useEffect, useState, useRef, 
} from 'react';
import cx from 'classnames';

import styles from './styles.module.scss';

interface ButtonResendProps {
  className?: string;
  onClick: () => void;
}

export const ButtonResend = memo<ButtonResendProps>(({
  className,
  onClick,
}) => {
  const [timer, setTimer] = useState(60);
  const [disabled, setDisabled] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const startTimer = useCallback(() => {
    setDisabled(true);
    let countdown = timer;
    intervalRef.current = window.setInterval(() => {
      countdown -= 1;
      setTimer(countdown);
      if (countdown === 0) {
        clearInterval(intervalRef.current!); // Очищаем интервал
        intervalRef.current = null;
        setDisabled(false);
      }
    }, 1000);
  }, [timer]);

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
    startTimer();
  }, [onClick, startTimer]);

  useEffect(() => {
    if (timer === 0) {
      setTimer(60);
    }
  }, [timer]);

  return (
    <button
      className={cx(styles.buttonResend_container, className)}
      onClick={handleResendClick}
      disabled={disabled}
    >
      Resend the code (
      {timer}
      s)
    </button>
  );
});
