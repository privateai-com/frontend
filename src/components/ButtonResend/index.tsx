import React, { memo, useEffect, useState } from 'react';
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

  const startTimer = () => {
    setDisabled(true);
    let countdown = timer;
    const interval = setInterval(() => {
      countdown -= 1;
      setTimer(countdown);
      if (countdown === 0) {
        clearInterval(interval);
        setDisabled(false);
      }
    }, 1000);
  };

  const handleResendClick = () => {
    onClick();
    startTimer();
  };

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
