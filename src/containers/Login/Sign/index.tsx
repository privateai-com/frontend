import {
  FC, FormEvent, useCallback, useEffect, useState, 
} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import cx from 'classnames';

import {
  AuthWrapper, Button, TextInput, Typography, 
} from 'components';
import { walletIcon } from 'assets';
import { ScreenWidth, errorsNotification, routes } from 'appConstants';
import { AuthErrorTransformResult, RequestStatus } from 'types';
import { emailValidator, passwordValidator } from 'utils';
import { useScreenWidth } from 'hooks';

import { authLogin, authLoginWallet } from 'store/auth/actionCreators';
import { authSelectors } from 'store/auth/selectors';
import { AuthActionTypes } from 'store/auth/actionTypes';

import styles from './styles.module.scss';

interface SignProps {
  onRestore: () => void;
  email: string;
  setEmail: (email: string) => void;
}

const initialLoginError = {
  emailError: '',
  passwordError: '',
};

export const Sign: FC<SignProps> = ({
  onRestore,
  email,
  setEmail,
}) => {
  const dispatch = useDispatch();
  const isMobile = useScreenWidth(ScreenWidth.notebook1024); 
  
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState(initialLoginError);
  const [walletError, setWalletError] = useState('');

  const status = useSelector(authSelectors.getStatus(AuthActionTypes.Login));
  const statusConnect = useSelector(authSelectors.getStatus(AuthActionTypes.LoginWallet));
  
  const isNotError = !passwordError && !emailError && email && password;
  
  const router = useRouter();

  const successCallback = useCallback(() => {
    router.push(routes.knowledge.root);
  }, [router]);
  const errorCallback = useCallback(
    (error: AuthErrorTransformResult) =>
      setLoginError({
        emailError: email
          ? error.fields.email || ''
          : errorsNotification.authError,
        passwordError: error.fields.password || '',
      }),
    [email],
  );

  const handleSignInClick = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentPasswordError = passwordValidator(password, true);
    setPasswordError(currentPasswordError);
    const currentEmailError = emailValidator(email);
    setEmailError(currentEmailError);

    const isNoErrors =
      !emailError &&
      !passwordError &&
      !currentEmailError &&
      !currentPasswordError &&
      email &&
      password;

    if (isNoErrors) {
      dispatch(
        authLogin({
          email,
          password,
          successCallback,
          errorCallback,
        }),
      );
    }
  }, [dispatch, email, emailError, errorCallback, password, passwordError, successCallback]);

  const onEmailChange = useCallback(
    (value: string) => {
      setEmailError('');
      setPasswordError('');
      setLoginError(initialLoginError);
      setEmail(value.trim());
    },
    [setEmail],
  );

  const onPasswordChange = useCallback((value: string) => {
    setEmailError('');
    setPasswordError('');
    setLoginError(initialLoginError);
    setPassword(value.trim());
  }, []);

  useEffect(() => {
    if (loginError.emailError) setEmailError(loginError.emailError);
    if (loginError.passwordError) setPasswordError(loginError.passwordError);
  }, [loginError.emailError, loginError.passwordError]);

  const errors = passwordError || emailError || walletError;

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
    <AuthWrapper>
      <form className={styles.signin__container} onSubmit={handleSignInClick}>
        <Typography type="h4">Sign in</Typography>
        <Button
          className={styles.button_connect}
          onClick={onConnectWallet}
          type="button"
          isLoading={statusConnect === RequestStatus.REQUEST}
          disabled={isMobile}
        >
          Sign in with your wallet
          <Image
            src={walletIcon}
            alt="wallet"
          />
        </Button>
        <Typography
          type="p"
          className={styles.description_wallet}
        >
          (Available for accounts with attached wallets)
        </Typography>
        <Typography
          type="p"
          className={styles.description}
        >
          Or use your email to sign up
        </Typography>
        <TextInput
          label="Email address"
          value={email}
          onChangeValue={onEmailChange}
          classNameContainer={styles.input__container}
          isError={emailError !== ''}
        />
        <TextInput
          label="Password"
          value={password}
          onChangeValue={onPasswordChange}
          isPassword
          classNameContainer={styles.input__container}
          isError={passwordError !== ''}
        />
        <Typography
          type="p"
          className={cx(styles.forgot_password, {
            [styles.forgot_password_margin]: passwordError || emailError,
          })}
        >
          Forgot your password?
          <button onClick={onRestore} type="button">Restore</button>
        </Typography>
        {errors ? <div className={styles.error}>{errors}</div> : null}
        <Button
          className={styles.button}
          disabled={!isNotError}
          isLoading={status === RequestStatus.REQUEST}
          type="submit"
        >
          Sign in
        </Button>
        <Typography
          type="p"
          className={styles.footer_text}
        >
          Do not have an account yet?
          <Link href={routes.registration.root}>Sign up</Link>
        </Typography>
      </form>
    </AuthWrapper>
  );
};
