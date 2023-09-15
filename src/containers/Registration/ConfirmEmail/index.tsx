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
}

export const ConfirmEmail: FC<ConfirmEmailProps> = ({ email }) => {
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [isShowResend, setIsShowResend] = useState(false);

  const isNotError = !otpError && otp;

  const onCreateAccountClick = useCallback(() => {
    const currentOtpError = otpValidator(otp);
    setOtpError(currentOtpError);

    setIsShowResend(true);
  }, [otp]);

  const onOtpChange = useCallback((value: string) => {
    setOtpError('');
    setOtp(value);
  }, []);

  const onResendCodeClick = useCallback(() => {

  }, []);
  
  return (
    <AuthWrapper>
      <div className={styles.confirmEmail__container}>
        <Typography
          type="p"
          className={styles.description}
        >
          Please enter the verification code we sent to 
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
            onClick={onResendCodeClick}
          />
        )}

        <Button
          onClick={onCreateAccountClick}
          className={styles.button}
          disabled={!isNotError}
        >
          Confirm
        </Button>
      </div>
    </AuthWrapper>
  );
};
