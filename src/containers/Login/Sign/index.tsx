import {
  FC, FormEvent, useCallback, useEffect, useState, 
} from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import {
  AuthWrapper, Button, TextInput, Typography, 
} from 'components';
import { errorsNotification, routes } from 'appConstants';
import { AuthErrorTransformResult, RequestStatus } from 'types';
import { emailValidator, passwordValidator } from 'utils';

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
  // const isMobile = useScreenWidth(ScreenWidth.notebook1024); 
  
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
        <Typography type="h4">Sign In</Typography>
        {/* <Typography
          type="p"
          className={styles.description_wallet}
        >
          (Available for accounts with attached wallets)
        </Typography> */}
        {/* <Typography
          type="p"
          className={styles.description}
        >
          Or use your email to sign up
        </Typography> */}
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
        {/* <Typography
          type="p"
          className={cx(styles.forgot_password, {
            [styles.forgot_password_margin]: passwordError || emailError,
          })}
        >
          Forgot your password?
          <button onClick={onRestore} type="button">Restore</button>
        </Typography> */}
        {errors ? <div className={styles.error}>{errors}</div> : null}
        <div className={styles.signin__btn_container}>
          <Button
            className={`${styles.button} ${styles.signin__btn}`}
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
            or
          </Typography>
          <Button
            className={styles.button_connect}
            onClick={onConnectWallet}
            type="button"
            theme="secondary"
            isLoading={statusConnect === RequestStatus.REQUEST && walletError === ''}
            // disabled={isMobile || walletError !== ''}
          >
            Sign in with your wallet
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 8C3 7.06812 3 6.60218 3.15224 6.23463C3.35523 5.74458 3.74458 5.35523 4.23463 5.15224C4.60218 5 5.06812 5 6 5V5H18V5C18.9319 5 19.3978 5 19.7654 5.15224C20.2554 5.35523 20.6448 5.74458 20.8478 6.23463C21 6.60218 21 7.06812 21 8V16C21 16.9319 21 17.3978 20.8478 17.7654C20.6448 18.2554 20.2554 18.6448 19.7654 18.8478C19.3978 19 18.9319 19 18 19V19H6V19C5.06812 19 4.60218 19 4.23463 18.8478C3.74458 18.6448 3.35523 18.2554 3.15224 17.7654C3 17.3978 3 16.9319 3 16V8Z" stroke="white" strokeWidth="2" strokeLinejoin="round" />
              <path d="M14 13H21M3 9V6.8427C3 6.03059 3.49108 5.2991 4.24273 4.99161L12.6781 1.54078C13.4689 1.21727 14.3779 1.43185 14.9405 2.07487L17.5 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            {/* <Image
              src={walletIcon}
              alt="wallet"
            /> */}
          </Button>
        </div>
        <div className={styles.auth_form__footer}>
          <Typography
            type="p"
            className={styles.footer_text}
          >
            Available for accounts with attached wallets
          </Typography>
          <Typography
            type="p"
            className={styles.forgot_password}
          >
            Do not have an account yet? 
            {' '}
            <Link href={routes.registration.root}>Sign up</Link>
            .&nbsp;
            {/* </Typography>
          <Typography
            type="p"
            className={cx(styles.forgot_password, {
              [styles.forgot_password_margin]: passwordError || emailError,
            })}
          > */}
            Forgot your password?
            <button onClick={onRestore} type="button">Restore</button>
            .
          </Typography>
             
        </div>
      </form>
    </AuthWrapper>
  );
};
