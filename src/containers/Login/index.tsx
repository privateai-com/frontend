import { useState } from 'react';

import { ForgotPassword } from 'containers';
import { Signin } from './Signin';

import styles from './styles.module.scss';

export const Login = () => {
  const [isShowForgotPassword, setIsShowForgotPassword] = useState(false);

  return (
    <div className={styles.login__container}>
      {isShowForgotPassword && (
        <ForgotPassword
          onBack={() => setIsShowForgotPassword(false)}
          onSuccess={() => setIsShowForgotPassword(false)}
        />
      )}
      {!isShowForgotPassword && (
        <Signin
          onConfirm={() => {}}
          onResotre={() => setIsShowForgotPassword(true)}
        />
      )}
    </div>
  );
};
