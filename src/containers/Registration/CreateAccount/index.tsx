import { FC, useCallback, useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

import { errorsNotification, routes } from 'appConstants';
import {
  AuthWrapper, Button, TextInput, Typography, 
} from 'components';
import {
  emailValidator,
  passwordConfirmValidator,
  passwordValidator,
} from 'utils';
import { authRegistration } from 'store/auth/actionCreators';
import { authSelectors } from 'store/auth/selectors';
import { AuthActionTypes } from 'store/auth/actionTypes';
import { AuthErrorTransformResult, RequestStatus } from 'types';

import styles from './styles.module.scss';

interface CreateAccountProps {
  onConfirmEmail: (email: string) => void;
}

export const CreateAccount: FC<CreateAccountProps> = ({ onConfirmEmail }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const status = useSelector(
    authSelectors.getStatus(AuthActionTypes.Registration),
  );

  const successCallback = useCallback(() => {
    onConfirmEmail(email);
  }, [email, onConfirmEmail]);

  const errorCallback = useCallback((error: AuthErrorTransformResult) => {
    if (error.fields.email) {
      setEmailError(errorsNotification.existEmailError);
    }
    if (error.fields.password) setPasswordError(error.fields.password);
  }, []);

  const onCreateAccountClick = useCallback(() => {
    const currentPasswordError = passwordValidator(password);
    setPasswordError(currentPasswordError);
    const currentEmailError = emailValidator(email);
    setEmailError(currentEmailError);
    const passwordConfirmError = passwordConfirmValidator(
      password,
      passwordConfirm,
    );
    if (passwordConfirmError) setPasswordError(passwordConfirmError);

    const isNoError =
      !currentPasswordError &&
      !currentEmailError &&
      !passwordError &&
      !passwordConfirmError &&
      !emailError &&
      !!email &&
      !!password;

    if (isNoError) {
      dispatch(
        authRegistration({
          email,
          password,
          successCallback,
          errorCallback,
        }),
      );
    }
  }, [
    dispatch,
    email,
    emailError,
    errorCallback,
    password,
    passwordError,
    successCallback,
    passwordConfirm,
  ]);

  const onEmailChange = useCallback((value: string) => {
    setEmailError('');
    setEmail(value);
  }, []);

  const onPasswordChange = useCallback((value: string) => {
    setPasswordError('');
    setPassword(value);
  }, []);

  const onConfirmPasswordChange = useCallback((value: string) => {
    setPasswordError('');
    setPasswordConfirm(value);
  }, []);

  return (
    <AuthWrapper>
      <div className={styles.createAccount__container}>
        <Typography type="h4">Welcome to PrivateAI app!</Typography>
        <Typography
          type="p"
          className={styles.description}
        >
          Please create a PrivateAI account to get access to platform features.
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
        <TextInput
          label="Confirm password"
          value={passwordConfirm}
          onChangeValue={onConfirmPasswordChange}
          isPassword
          classNameContainer={styles.input__container}
        />
        {passwordError || emailError ? (
          <div className={styles.error}>{passwordError || emailError}</div>
        ) : null}
        <Button
          onClick={onCreateAccountClick}
          className={styles.button}
          isLoading={status === RequestStatus.REQUEST}
        >
          Create account
        </Button>
        <Typography
          type="p"
          className={styles.footer_text}
        >
          Already have an account?
          <Link href={routes.login.root}>Sign in</Link>
        </Typography>
      </div>
    </AuthWrapper>
  );
};
