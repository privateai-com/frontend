import { useCallback, useState } from 'react';
import Link from 'next/link';

import { routes } from 'appConstants';
import {
  AuthWrapper,
  Button,
  TextInput,
  Typography,
} from 'components';
import { emailValidator, passwordValidator } from 'utils';

import styles from './styles.module.scss';

export const CreateAccount = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const isNotError =
    !passwordError
      && !emailError
      && email
      && password
      && passwordConfirm
      && (password === passwordConfirm);

  const onCreateAccountClick = useCallback(() => {
    const currentPasswordError = passwordValidator(password);
    setPasswordError(currentPasswordError);
    const currentEmailError = emailValidator(email);
    setEmailError(currentEmailError);
  }, [email, password]);

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
        <TextInput
          label="Confirm password"
          value={passwordConfirm}
          onChangeValue={onConfirmPasswordChange}
          isPassword
          classNameContainer={styles.input__container}
        />
        <Button
          onClick={onCreateAccountClick}
          className={styles.button}
          disabled={!isNotError}
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
