import {
  FC, FormEvent, useCallback, useState, 
} from 'react';

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

const msgError = 'Entered verification code is wrong. Please check it and try one more time.';

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
  error = '',
  setError,
  onBack,
  onConfirm,
  onResend,
}) => {
  const [otp, setOtp] = useState('');
  const [isShowResend, setIsShowResend] = useState(true);

  const isNotError = !error && otp;

  const onConfirmClick = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
      <form className={styles.confirmEmail__container} onSubmit={onConfirmClick}>
        <div className={styles.confirmEmail__head}>
          <Typography
            type="h4"
          >
            Sign In
          </Typography>

          <Typography
            type="p"
            className={styles.description}
          >
            Please enter the verification code we sent to
            {/* <br /> */}
            <strong>{` ${email}`}</strong>
          </Typography>

        </div>

        <div className={styles.containerInputs}>
          <InputOtp
            value={otp}
            onChangeValue={onOtpChange}
            label={(
              <>
                Verification code
                {isShowResend && (
                <ButtonResend
                  className={styles.resender}
                  onClick={onResendCodeClick}
                />
                )}
              </>
)} 
            classNameContainer={styles.otp_container}
            isError={error !== ''}
          />
          
        </div>

        <div style={{ width: '100%' }}>
         
          {error !== '' && (
          <div className={styles.error}>
            {error.includes('Verification code incorrect!') ? msgError : error}
          </div>
          )}

          <Button
            className={cx(styles.button, { [styles.button_margin]: error })}
            type="submit"
            disabled={!isNotError || otp.length < 6}
          >
            Confirm
          </Button>
         
        </div>
      </form>
    </AuthWrapper>
  );
};
