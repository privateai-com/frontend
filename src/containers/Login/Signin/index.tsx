import { FC, useCallback, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import {
  AuthWrapper,
  Button,
  TextInput,
  Typography,
} from 'components';
import { walletIcon } from 'assets';
import { emailValidator, passwordValidator } from 'utils';
import { routes } from 'appConstants';
import { useWallet } from 'hooks';

import styles from './styles.module.scss';

interface SigninProps {
  onConfirm: () => void;
}

export const Signin: FC<SigninProps> = ({ onConfirm }) => {
  const { onConnectWallet } = useWallet();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const isNotError =
    !passwordError
      && !emailError
      && email
      && password;

  const onSigninClick = useCallback(() => {
    const currentPasswordError = passwordValidator(password);
    setPasswordError(currentPasswordError);
    const currentEmailError = emailValidator(email);
    setEmailError(currentEmailError);

    const isError = !isNotError 
     && !currentPasswordError
     && !currentEmailError;

    if (!isError) {
      onConfirm();
    }
  }, [email, isNotError, onConfirm, password]);

  const onEmailChange = useCallback((value: string) => {
    setEmailError('');
    setEmail(value);
  }, []);

  const onPasswordChange = useCallback((value: string) => {
    setPasswordError('');
    setPassword(value);
  }, []);

  return (
    <AuthWrapper>
      <div className={styles.signin__container}>
        <Typography type="h4">Sign in</Typography>
        <Button
          className={styles.button_connect}
          onClick={onConnectWallet}
        >
          Sign in with your wallet
          <Image src={walletIcon} alt="wallet" />
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
          error={emailError}
        />
        <TextInput
          label="Password"
          value={password}
          onChangeValue={onPasswordChange}
          isPassword
          classNameContainer={styles.input__container}
          error={passwordError}
        />
        <Typography
          type="p"
          className={styles.forgot_password}
        >
          Forgot your password?
          <button>Restore</button>
        </Typography>
        <Button
          onClick={onSigninClick}
          className={styles.button}
          disabled={!isNotError}
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
      </div>
    </AuthWrapper>
  );
};
