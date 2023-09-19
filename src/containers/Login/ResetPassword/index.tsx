import { FC, useCallback, useState } from 'react';

import {
  AuthWrapper,
  Button,
  TextInput,
  Typography,
} from 'components';
import { emailValidator } from 'utils';

import styles from './styles.module.scss';

interface ResetPasswordProps {
  onConfirm: (email: string) => void;
  onBack: () => void;
}

export const ResetPassword: FC<ResetPasswordProps> = ({
  onConfirm, onBack,
}) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const isNotError = !emailError && email;

  const onConfirmClick = useCallback(() => {
    const currentEmailError = emailValidator(email);
    setEmailError(currentEmailError);

    const isError = !isNotError && !currentEmailError;

    if (!isError) {
      onConfirm(email);
    }
  }, [email, isNotError, onConfirm]);

  const onEmailChange = useCallback((value: string) => {
    setEmailError('');
    setEmail(value);
  }, []);

  return (
    <AuthWrapper onClickBack={onBack}>
      <div className={styles.reset__container}>
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
          error={emailError}
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
