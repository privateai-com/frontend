import { useState } from 'react';
import { Signin } from './Signin';

import styles from './styles.module.scss';
import { ResetPassword } from './ResetPassword';

export const Login = () => {
  const [isShowResetPassword, setIsShowResetPassword] = useState(true);
  return (
    <div className={styles.login__container}>
      {isShowResetPassword ? (
        <ResetPassword
          onConfirm={() => {}}
          onBack={() => setIsShowResetPassword(false)}
        />
      ) : (
        <Signin
          onConfirm={() => {}}
          onResotre={() => setIsShowResetPassword(true)}
        />
      )}
    </div>
  );
};
