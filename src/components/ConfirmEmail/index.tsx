import {
  FC,
  useCallback,
  useEffect,
  useState, 
} from 'react';

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
  error?: string;
  onBack?: () => void;
  onConfirm?: (code: string) => void;
  onResend?: () => void;
}

export const ConfirmEmail: FC<ConfirmEmailProps> = ({
  email,
  error,
  onBack,
  onConfirm,
  onResend,
}) => {
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [isShowResend, setIsShowResend] = useState(false);

  const isNotError = !otpError && otp;

  const onConfirmClick = useCallback(() => {
    const currentOtpError = otpValidator(otp);
    setOtpError(currentOtpError);
    setIsShowResend(true);

    const isError = !isNotError && !currentOtpError;

    if (!isError && onConfirm) {
      onConfirm(otp);
    }
  }, [isNotError, onConfirm, otp]);

  const onOtpChange = useCallback((value: string) => {
    setOtpError('');
    setOtp(value);
  }, []);

  const onResendCodeClick = useCallback(() => {
    if (onResend) onResend();
  }, [onResend]);

  useEffect(() => {
    if (error) setOtpError(error);
  }, [error]);
  
  return (
    <AuthWrapper onClickBack={onBack}>
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
