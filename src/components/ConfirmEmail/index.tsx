import { FC, useCallback, useState } from 'react';

import {
  AuthWrapper,
  Button,
  ButtonResend,
  InputOtp,
  Typography,
} from 'components';
import { otpValidator } from 'utils';
import cx from 'classnames';

import styles from './styles.module.scss';

interface ConfirmEmailProps {
  email: string;
  error?: string;
  setError?: (err: string) => void;
  onBack?: () => void;
  onConfirm?: (code: string) => void;
  onResend?: () => void;
}

export const ConfirmEmail: FC<ConfirmEmailProps> = ({
  email,
  error,
  setError,
  onBack,
  onConfirm,
  onResend,
}) => {
  const [otp, setOtp] = useState('');
  const [isShowResend, setIsShowResend] = useState(false);

  const isNotError = !error && otp;

  const onConfirmClick = useCallback(() => {
    const currentOtpError = otpValidator(otp);
    if (setError) setError(currentOtpError);
    setIsShowResend(true);

    const isError = !isNotError && !currentOtpError;

    if (!isError && onConfirm) {
      onConfirm(otp);
    }
  }, [isNotError, onConfirm, otp, setError]);

  const onOtpChange = useCallback(
    (value: string) => {
      if (setError) setError('');
      setOtp(value);
    },
    [setError],
  );

  const onResendCodeClick = useCallback(() => {
    if (onResend) onResend();
  }, [onResend]);

  return (
    <AuthWrapper onClickBack={onBack}>
      <div className={styles.confirmEmail__container}>
        <Typography
          type="p"
          className={styles.description}
        >
          Please enter the verification code we sent to
          <br />
          <strong>{` ${email}`}</strong>
        </Typography>
        <InputOtp
          value={otp}
          onChangeValue={onOtpChange}
          label="Verification code"
          error={error}
          classNameContainer={styles.otp_container}
        />

        {isShowResend && (
          <ButtonResend
            className={styles.resender}
            onClick={onResendCodeClick}
          />
        )}

        <Button
          onClick={onConfirmClick}
          className={cx(styles.button, { [styles.button_margin]: error })}
        >
          Confirm
        </Button>
      </div>
    </AuthWrapper>
  );
};
