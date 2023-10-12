import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import { ConfirmEmail } from 'components';
import { routes } from 'appConstants';
import {
  authConfirmEmail,
  authResendConfCode,
} from 'store/auth/actionCreators';
import { AuthErrorTransformResult } from 'types';
import { CreateAccount } from './CreateAccount';

import styles from './styles.module.scss';

export const Registration = () => {
  const [email, setEmail] = useState('');
  const [errorCode, setErrorCode] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();

  const successCallback = useCallback(() => {
    router.push({
      pathname: routes.home.root,
      query: { showModal: 'true' },
    });
  }, [router]);

  const errorCallback = useCallback((error: AuthErrorTransformResult) => {
    if (error.fields.code || error.fields.email) {
      setErrorCode(
        'Entered verification code is wrong. Please check it and try one more time.',
      );
    }
  }, []);

  const onConfirmEmail = useCallback(
    (code: string) => {
      dispatch(
        authConfirmEmail({
          email,
          code,
          successCallback,
          errorCallback,
        }),
      );
    },
    [dispatch, email, errorCallback, successCallback],
  );

  const onResend = useCallback(() => {
    dispatch(authResendConfCode({ email }));
  }, [dispatch, email]);

  return (
    <div className={styles.registration__container}>
      {email ? (
        <ConfirmEmail
          email={email}
          onConfirm={onConfirmEmail}
          onResend={onResend}
          error={errorCode}
          setError={setErrorCode}
        />
      ) : (
        <CreateAccount onConfirmEmail={setEmail} />
      )}
    </div>
  );
};
