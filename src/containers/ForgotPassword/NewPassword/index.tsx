import { FC, useCallback, useState } from 'react';

import {
  AuthWrapper, Button, TextInput, Typography, 
} from 'components';
import { passwordValidator } from 'utils';

import styles from './styles.module.scss';

interface NewPasswordProps {
  onConfirm: (password: string) => void;
}

export const NewPassword: FC<NewPasswordProps> = ({ onConfirm }) => {
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const isNotError =
    !passwordError &&
    password &&
    passwordConfirm &&
    password === passwordConfirm;

  const onConfirmClick = useCallback(() => {
    const currentPasswordError = passwordValidator(password);
    setPasswordError(currentPasswordError);

    const isError = !isNotError || currentPasswordError;

    if (!isError) {
      onConfirm(password);
    }
  }, [isNotError, onConfirm, password]);

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
      <div className={styles.new_password__container}>
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
          onClick={onConfirmClick}
          className={styles.button}
          disabled={!isNotError}
        >
          Confirm
        </Button>
      </div>
    </AuthWrapper>
  );
};
