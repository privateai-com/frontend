import { useCallback, useState } from 'react';

import { ConfirmEmail } from 'components';
import { Signin } from './Signin';
import { ResetPassword } from './ResetPassword';

import styles from './styles.module.scss';

export const Login = () => {
  const [isShowResetPassword, setIsShowResetPassword] = useState(false);
  const [isShowConfirmEmail, setIsShowConfirmEmail] = useState(false);
  const [email, setEmail] = useState('');

  const resetPasswordHandler = useCallback((value: string) => {
    setIsShowResetPassword(false);
    setIsShowConfirmEmail(true);
    setEmail(value);
  }, []);

  const resetPasswordBackHandler = useCallback(() => {
    setIsShowResetPassword(false);
    setIsShowConfirmEmail(false);
  }, []);

  const confirmEmailBackHandler = useCallback(() => {
    setIsShowResetPassword(true);
    setIsShowConfirmEmail(false);
  }, []);

  return (
    <div className={styles.login__container}>
      {isShowResetPassword && (
        <ResetPassword
          onConfirm={resetPasswordHandler}
          onBack={resetPasswordBackHandler}
        />
      )}

      {isShowConfirmEmail && (
        <ConfirmEmail
          email={email}
          onBack={confirmEmailBackHandler}
        />
      )}

      {!isShowResetPassword && !isShowConfirmEmail && (
        <Signin
          onConfirm={() => {}}
          onResotre={() => setIsShowResetPassword(true)}
        />
      )}
    </div>
  );
};
