import {
  FC, FormEvent, useCallback, useState, 
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  AuthWrapper, Button, TextInput, Typography, 
} from 'components';
import { passwordConfirmValidator, passwordValidator } from 'utils';
import { AuthErrorTransformResult, RequestStatus } from 'types';
import { authConfirmCode } from 'store/auth/actionCreators';
import { authSelectors } from 'store/auth/selectors';
import { AuthActionTypes } from 'store/auth/actionTypes';

import styles from './styles.module.scss';

interface NewPasswordProps {
  onSuccess: (password: string) => void;
  onBack: () => void;
}

export const NewPassword: FC<NewPasswordProps> = ({
  onSuccess,
  onBack,
}) => {
  const dispatch = useDispatch();
  const statusChangePassword =
    useSelector(authSelectors.getStatus(AuthActionTypes.ChangePassword));
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const isNotError =
    passwordError === '' &&
    password &&
    passwordConfirm;

  const errorCallback = useCallback((error: AuthErrorTransformResult) => {
    if (error.fields.password) setPasswordError(error.fields.password);
  }, [setPasswordError]);

  const onConfirmClick = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      dispatch(authConfirmCode({
        password,
        successCallback: () => onSuccess(password),
        errorCallback,
      }));
    }
  }, [dispatch, errorCallback, onSuccess, password, passwordConfirm, passwordError]);

  const onPasswordChange = useCallback((value: string) => {
    setPasswordError('');
    setPassword(value.trim());
  }, [setPasswordError]);

  const onConfirmPasswordChange = useCallback((value: string) => {
    setPasswordError('');
    setPasswordConfirm(value.trim());
  }, [setPasswordError]);

  return (
    <AuthWrapper onClickBack={onBack}>
      <form className={styles.new_password__container} onSubmit={onConfirmClick}>
        <div className={styles.new_password__head}>
          <Typography
            type="h4"
          >
            Change password
          </Typography>
          <Typography
            type="p"
            className={styles.description}
          >
            Set a new password for your account

            <br />
            <br />
            If your email address was correct,
            you will receive an email with a link to reset your password
          </Typography>
        </div>
       
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
          className={styles.button}
          disabled={!isNotError}
          type="submit"
          isLoading={statusChangePassword === RequestStatus.REQUEST}
        >
          Confirm
        </Button>
      </form>
    </AuthWrapper>
  );
};
