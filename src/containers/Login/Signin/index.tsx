import {
  FC, FormEvent, useCallback, useEffect, useState, 
} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import cx from 'classnames';

import {
  AuthWrapper, Button, TextInput, Typography, 
} from 'components';
import { walletIcon } from 'assets';
import { routes } from 'appConstants';
import { RequestStatus } from 'types';
import { emailValidator, passwordValidator } from 'utils';

import { authSelectors } from 'store/auth/selectors';
import { AuthActionTypes } from 'store/auth/actionTypes';

import styles from './styles.module.scss';

interface SignInProps {
  onConfirm: ({ email, password }: { email: string; password: string }) => void;
  onConnectWallet: () => void;
  onRestore: () => void;
  loginError: { emailError: string; passwordError: string };
  walletError?: string;
  email: string;
  setEmail: (email: string) => void;
}

export const SignIn: FC<SignInProps> = ({
  onConfirm,
  onConnectWallet,
  onRestore,
  loginError,
  walletError,
  email,
  setEmail,
}) => {
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const status = useSelector(authSelectors.getStatus(AuthActionTypes.Login));

  const isNotError = !passwordError && !emailError && email && password;

  const handleSignInClick = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentPasswordError = passwordValidator(password);
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
      onConfirm({ email, password });
    }
  }, [email, emailError, onConfirm, password, passwordError]);

  const onEmailChange = useCallback(
    (value: string) => {
      setEmailError('');
      setEmail(value);
    },
    [setEmail],
  );

  const onPasswordChange = useCallback((value: string) => {
    setEmailError('');
    setPasswordError('');
    setPassword(value);
  }, []);

  useEffect(() => {
    if (loginError.emailError) setEmailError(loginError.emailError);
    if (loginError.passwordError) setPasswordError(loginError.passwordError);
  }, [loginError.emailError, loginError.passwordError]);

  const errors = passwordError || emailError || walletError;

  return (
    <AuthWrapper>
      <form className={styles.signin__container} onSubmit={handleSignInClick}>
        <Typography type="h4">Sign in</Typography>
        <Button
          className={styles.button_connect}
          onClick={onConnectWallet}
          type="button"
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
        />
        <TextInput
          label="Password"
          value={password}
          onChangeValue={onPasswordChange}
          isPassword
          classNameContainer={styles.input__container}
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
