import { FC, useCallback, useState } from 'react';

import {
  AuthWrapper,
  Button,
  ButtonResend,
  InputOtp,
  Typography,
} from 'components';
import { otpValidator } from 'utils';

import styles from './styles.module.scss';

interface ConfirmEmailProps {
  email: string;
  onBack?: () => void;
  onConfirm?: () => void;
}

export const ConfirmEmail: FC<ConfirmEmailProps> = ({
  email,
  onBack,
  onConfirm,
}) => {
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [isShowResend, setIsShowResend] = useState(true);

  const isNotError = !otpError && otp;

  const onConfirmClick = useCallback(() => {
    const currentOtpError = otpValidator(otp);
    setOtpError(currentOtpError);
    setIsShowResend(true);

    const isError = !isNotError && !currentOtpError;

    if (!isError && onConfirm) {
      onConfirm();
    }
  }, [isNotError, onConfirm, otp]);

  const onOtpChange = useCallback((value: string) => {
    setOtpError('');
    setOtp(value);
  }, []);

  const onResendCodeClick = useCallback(() => {

  }, []);
  
  return (
    <AuthWrapper onClickBack={onBack}>
      <div className={styles.confirmEmail__container}>
        <Typography
          type="p"
          className={styles.description}
        >
          Please enter the verification code we sent to<br/>
          <strong>{` ${email}`}</strong>
        </Typography>
        <InputOtp
          value={otp}
          onChangeValue={onOtpChange}
          label="Verification code"
          error={otpError}
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
          className={styles.button}
          disabled={!isNotError}
        >
          Confirm
        </Button>
      </div>
    </AuthWrapper>
  );
};
