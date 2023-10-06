import {
  FC,
  useCallback,
  useEffect,
  useState,
} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';

import {
  AuthWrapper,
  Button,
  TextInput,
  Typography,
} from 'components';
import { walletIcon } from 'assets';
import { emailValidator, passwordValidator } from 'utils';
import { routes } from 'appConstants';
import { authSelectors } from 'store/auth/selectors';
import { AuthActionTypes } from 'store/auth/actionTypes';
import { RequestStatus } from 'types';

import styles from './styles.module.scss';

interface SigninProps {
  onConfirm: ({ email, password }: { email: string, password: string }) => void;
  onConnectWallet: () => void;
  onResotre: () => void;
  loginError: { emailError: string, passwordError: string },
}

export const Signin: FC<SigninProps> = ({
  onConfirm,
  onConnectWallet,
  onResotre,
  loginError,
}) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const status = useSelector(authSelectors.getStatus(AuthActionTypes.Login));

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

  const onEmailChange = useCallback((value: string) => {
    setEmailError('');
    setEmail(value);
  }, []);

  const onPasswordChange = useCallback((value: string) => {
    setPasswordError('');
    setPassword(value);
  }, []);

  useEffect(() => {
    if (loginError.emailError) setEmailError(loginError.emailError);
    if (loginError.passwordError) setPasswordError(loginError.passwordError);
  }, [loginError.emailError, loginError.passwordError]);

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
          <button onClick={onResotre}>Restore</button>
        </Typography>
        <Button
          onClick={onSigninClick}
          className={styles.button}
          disabled={!isNotError}
          isLoading={status === RequestStatus.REQUEST}
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
