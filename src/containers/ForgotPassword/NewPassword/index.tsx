import { FC, useCallback, useState } from 'react';

import {
  AuthWrapper, Button, TextInput, Typography, 
} from 'components';
import { passwordConfirmValidator, passwordValidator } from 'utils';

import styles from './styles.module.scss';

interface NewPasswordProps {
  isLoading: boolean;
  onConfirm: (password: string) => void;
}

export const NewPassword: FC<NewPasswordProps> = ({ onConfirm, isLoading }) => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  
  const [passwordError, setPasswordError] = useState('');

  const isNotError =
    passwordError === '' &&
    password &&
    passwordConfirm;

  const onConfirmClick = useCallback(() => {
    const currentPasswordError = passwordValidator(password);
    setPasswordError(currentPasswordError);
    const passwordConfirmError = passwordConfirmValidator(
      password,
      passwordConfirm,
    );
    if (passwordConfirmError) setPasswordError(passwordConfirmError);

    const isError = passwordError !== '' 
      || password === '' 
      || currentPasswordError !== '' 
      || passwordConfirmError;

    if (!isError) {
      onConfirm(password);
    }
  }, [password, passwordError, passwordConfirm, onConfirm]);

  const onPasswordChange = useCallback((value: string) => {
    setPasswordError('');
    setPassword(value.trim());
  }, []);

  const onConfirmPasswordChange = useCallback((value: string) => {
    setPasswordError('');
    setPasswordConfirm(value);
  }, []);

  return (
    <AuthWrapper>
      <form className={styles.new_password__container}>
        <Typography
          type="p"
          className={styles.description}
        >
          Set a new password for your account
        </Typography>
        <TextInput
          label="Password"
          value={password}
          onChangeValue={onPasswordChange}
          isPassword
          classNameContainer={styles.input__container}
          isError={passwordError !== ''}
        />
        <TextInput
          label="Confirm password"
          value={passwordConfirm}
          onChangeValue={onConfirmPasswordChange}
          isPassword
          classNameContainer={styles.input__container}
          isError={passwordError !== ''}
        />
        {passwordError !== '' && (
          <div className={styles.error}>
            {passwordError}
          </div>
        )}
        <Button
          onClick={onConfirmClick}
          className={styles.button}
          disabled={!isNotError}
          type="submit"
          isLoading={isLoading}
        >
          Confirm
        </Button>
      </form>
    </AuthWrapper>
  );
};
