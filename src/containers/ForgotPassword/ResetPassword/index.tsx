import {
  FC, FormEvent, useCallback, useState,
} from 'react';

import {
  AuthWrapper, Button, TextInput, Typography, 
} from 'components';
import { emailValidator } from 'utils';

import { useSelector } from 'react-redux';
import { authSelectors } from 'store/auth/selectors';
import { AuthActionTypes } from 'store/auth/actionTypes';
import { RequestStatus } from 'types';
import styles from './styles.module.scss';

interface ResetPasswordProps {
  onConfirm: (email: string) => void;
  onBack: () => void;
  emailError: string;
  setEmailError: (email: string) => void;
}

const msgError = `
Entered email address is not attached to any account. 
Please check it and try once more.`;

export const ResetPassword: FC<ResetPasswordProps> = ({
  onConfirm,
  onBack,
  emailError,
  setEmailError,
}) => {
  const [email, setEmail] = useState('');
  const isLoading =
    useSelector(authSelectors.getStatus(AuthActionTypes.ConfirmCode)) ===
    RequestStatus.REQUEST;
  const isNotError = !emailError && !!email;

  const onConfirmClick = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentEmailError = emailValidator(email);

    setEmailError(currentEmailError);

    const isNoError = !currentEmailError && !emailError && !!email;

    if (isNoError) {
      onConfirm(email);
    }
  }, [email, setEmailError, emailError, onConfirm]);

  const onEmailChange = useCallback(
    (value: string) => {
      setEmailError('');
      setEmail(value.trim());
    },
    [setEmailError],
  );

  return (
    <AuthWrapper onClickBack={onBack}>
      <form className={styles.reset__container} onSubmit={onConfirmClick}>
        <Typography
          type="p"
          className={styles.description}
        >
          Enter the email attached to your account
        </Typography>
        <TextInput
          label="Email address"
          value={email}
          onChangeValue={onEmailChange}
          classNameContainer={styles.input__container}
          isError={emailError !== ''}
        />
        {emailError !== '' && (
          <div className={styles.error}>
            {emailError.includes('Email not found!') ? msgError : emailError}
          </div>
        )}
        <Button
          className={styles.button}
          disabled={!isNotError}
          isLoading={isLoading}
          type="submit"
        >
          Confirm
        </Button>
      </form>
    </AuthWrapper>
  );
};
