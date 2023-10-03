import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import { ForgotPassword } from 'containers';
import { authLogin, authLoginWallet } from 'store/auth/actionCreators';
import { routes } from 'appConstants';
import { Signin } from './Signin';

import styles from './styles.module.scss';

export const Login = () => {
  const dispatch = useDispatch();
  const [isShowForgotPassword, setIsShowForgotPassword] = useState(false);
  const router = useRouter();

  const successCallbackLogin = useCallback(() => {
    router.push(routes.home.root);
  }, [router]);

  const onLogin = useCallback(({ email, password }: { email: string, password: string }) => {
    dispatch(authLogin({
      email,
      password,
      successCallback: successCallbackLogin,
    }));
  }, [dispatch, successCallbackLogin]);
  
  const onConnectWallet = useCallback(() => {
    dispatch(authLoginWallet({
      successCallback: successCallbackLogin,
    }));
  }, [dispatch, successCallbackLogin]);

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
          onConfirm={onLogin}
          onResotre={() => setIsShowForgotPassword(true)}
          onConnectWallet={onConnectWallet}
        />
      )}
    </div>
  );
};
