import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import { ForgotPassword } from 'containers';
import { authLogin, authLoginWallet } from 'store/auth/actionCreators';
import { errorsNotification, routes } from 'appConstants';
import { AuthErrorTransformResult } from 'types';
import { Sign } from './Sign';

export const Login = () => {
  const dispatch = useDispatch();
  
  const [localEmail, setLocalEmail] = useState('');
  const [isShowForgotPassword, setIsShowForgotPassword] = useState(false);

  const [loginError, setLoginError] = useState({
    emailError: '',
    passwordError: '',
  });
  const [walletError, setWalletError] = useState('');

  const router = useRouter();

  const successCallback = useCallback(() => {
    router.push(routes.profile.root);
  }, [router]);

  const errorCallback = useCallback(
    (error: AuthErrorTransformResult) =>
      setLoginError({
        emailError: localEmail
          ? error.fields.email || ''
          : errorsNotification.authError,
        passwordError: error.fields.password || '',
      }),
    [localEmail],
  );

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
    <>
      {isShowForgotPassword && (
        <ForgotPassword
          onBack={() => setIsShowForgotPassword(false)}
          onSuccess={() => setIsShowForgotPassword(false)}
        />
      )}
      {!isShowForgotPassword && (
        <Sign
          onConfirm={onLogin}
          onRestore={() => setIsShowForgotPassword(true)}
          onConnectWallet={onConnectWallet}
          loginError={loginError}
          walletError={walletError}
          email={localEmail}
          setEmail={setLocalEmail}
        />
      )}
    </>
  );
};
