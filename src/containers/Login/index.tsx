import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import { ForgotPassword } from 'containers';
import { authLogin, authLoginWallet } from 'store/auth/actionCreators';
import { routes } from 'appConstants';
import { AuthErrorTransformResult } from 'types';
import { Signin } from './Signin';

import styles from './styles.module.scss';

export const Login = () => {
  const dispatch = useDispatch();
  const [isShowForgotPassword, setIsShowForgotPassword] = useState(false);
  const [loginError, setLoginError] = useState({
    emailError: '',
    passwordError: '',
  });
  const [walletError, setWalletError] = useState('');
  const router = useRouter();

  const successCallback = useCallback(() => {
    router.push(routes.home.root);
  }, [router]);

  const errorCallback = useCallback((error: AuthErrorTransformResult) => {
    setLoginError({
      emailError: error.fields.email || '',
      passwordError: error.fields.password || '',
    });
  }, []);

  const onLogin = useCallback(
    ({ email, password }: { email: string; password: string }) => {
      dispatch(
        authLogin({
          email,
          password,
          successCallback,
          errorCallback,
        }),
      );
    },
    [dispatch, errorCallback, successCallback],
  );

  const walletErrorCallback = useCallback((e: string) => {
    setWalletError(e);
  }, []);

  const onConnectWallet = useCallback(() => {
    dispatch(
      authLoginWallet({
        successCallback,
        errorCallback: walletErrorCallback,
      }),
    );
  }, [dispatch, successCallback, walletErrorCallback]);

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
          loginError={loginError || walletError}
        />
      )}
    </div>
  );
};
