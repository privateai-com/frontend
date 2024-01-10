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
import Link from 'next/link';
import { CreateAccount } from './CreateAccount';

import styles from './styles.module.scss';

export const Registration = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [errorCode, setErrorCode] = useState('');

  const successCallback = useCallback(() => {
    router.push({
      pathname: routes.profile.root,
      query: { editProfile: 'true' },
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
    <>
      <Link
        href="/"
        className="logo"
        style={{
          position: 'absolute', textDecoration: 'none', left: 30, top: 30, display: 'flex', gap: 10, alignItems: 'center', fontSize: 22, fontWeight: 500, color: '#4659FE', 
        }}
      >
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M33.5635 18.8136C35.9262 20.2752 37.9328 22.256 39.4233 24.5962C37.8968 26.993 35.8291 29.0126 33.3918 30.4838C32.4944 31.6947 31.3309 32.7264 29.9784 33.5083C34.3893 32.081 38.1193 29.1466 40.5584 25.3165C40.8385 24.877 40.8385 24.3155 40.5584 23.8759C38.2101 20.1883 34.6649 17.331 30.4677 15.8496C31.6974 16.6432 32.7508 17.6509 33.5635 18.8136ZM16.9962 15.9599C12.9321 17.4702 9.50142 20.2779 7.20995 23.8759C6.93002 24.3155 6.93002 24.877 7.20995 25.3165C9.59105 29.0553 13.2022 31.9407 17.476 33.4038C16.1434 32.6019 15.0024 31.5545 14.1293 30.3318C11.7994 28.8748 9.81976 26.9115 8.34527 24.5962C9.78481 22.3358 11.7058 20.4109 13.9642 18.9651C14.754 17.7922 15.786 16.7709 16.9962 15.9599Z" fill="#4659FE" />
          <path fillRule="evenodd" clipRule="evenodd" d="M31.3939 21.5316C30.5454 19.3925 28.8069 17.6204 26.4631 16.8043C22.2161 15.3254 17.5773 17.5407 16.0498 21.7567L14.6254 21.7776C14.6624 21.6559 14.7021 21.5343 14.7443 21.413C16.4791 16.4313 21.9238 13.7991 26.9055 15.5338C29.8051 16.5435 31.9087 18.8101 32.8186 21.5107L31.3939 21.5316Z" fill="#4659FE" />
          <path d="M16.5566 22.7569C16.2878 23.5287 15.4443 23.9365 14.6725 23.6677C13.9007 23.399 13.4928 22.5554 13.7616 21.7836C14.0303 21.0118 14.8739 20.604 15.6457 20.8727C16.4175 21.1415 16.8254 21.9851 16.5566 22.7569Z" fill="#4659FE" />
          <path fillRule="evenodd" clipRule="evenodd" d="M15.9845 27.2412C16.8331 29.3803 18.5715 31.1523 20.9153 31.9685C25.1624 33.4473 29.8011 31.232 31.3286 27.016L32.7531 26.9951C32.716 27.1169 32.6763 27.2384 32.6341 27.3597C30.8994 32.3414 25.4547 34.9736 20.4729 33.2389C17.5734 32.2292 15.4697 29.9627 14.5599 27.2621L15.9845 27.2412Z" fill="#4659FE" />
          <path d="M30.8218 26.016C31.0906 25.2442 31.9342 24.8364 32.706 25.1052C33.4778 25.3739 33.8856 26.2175 33.6168 26.9893C33.3481 27.7611 32.5045 28.1689 31.7327 27.9001C30.9609 27.6314 30.5531 26.7878 30.8218 26.016Z" fill="#4659FE" />
          <path fillRule="evenodd" clipRule="evenodd" d="M23.8854 31.0303C27.3929 31.0303 30.2363 28.1175 30.2363 24.5244C30.2363 20.9313 27.3929 18.0186 23.8854 18.0186C20.3779 18.0186 17.5344 20.9313 17.5344 24.5244C17.5344 28.1175 20.3779 31.0303 23.8854 31.0303ZM25.9544 22.7705C25.9544 23.5528 25.5369 24.2353 24.9177 24.5969L25.4309 27.6554C25.4864 27.9866 25.2374 28.2893 24.9092 28.2893H22.8283C22.5001 28.2893 22.2511 27.9866 22.3067 27.6554L22.8263 24.5584C22.242 24.1882 21.8528 23.5259 21.8528 22.7705C21.8528 21.6102 22.771 20.6696 23.9036 20.6696C25.0362 20.6696 25.9544 21.6102 25.9544 22.7705Z" fill="#4659FE" />
        </svg>
        Private AI
      </Link>
      <div className="footer" style={{ position: 'absolute', left: 30, bottom: 30 }}>
        <p style={{
          color: '#7C859E', fontSize: 12, fontStyle: 'normal', fontWeight: 400, 
        }}
        >
          Web3 Foundation LLC. 2024
          <br />
          {' '}
          All rights reserved.
        </p>
      </div>
    
      <div className={styles.registration__container}>
        {email ? (
          <ConfirmEmail
            email={email}
            onConfirm={onConfirmEmail}
            onResend={onResend}
            error={errorCode}
            setError={setErrorCode}
            onBack={router.back}
          />
        ) : (
          <CreateAccount onConfirmEmail={setEmail} />
        )}
      </div>
    </>
  );
};
