import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useModal } from 'react-modal-hook';

import { Button, RevokeAPIKey } from 'components';
import { PageHead } from 'components/PageHead';
import { apiBaseUrl, routes } from 'appConstants';
import { profileSelectors } from 'store/profile/selectors';
import { profileCreateApiKey, profileDeleteApiKey, profileGetApiKey } from 'store/profile/actionCreators';
import { ProfileActionTypes } from 'store/profile/actionTypes';
import { RequestStatus } from 'types';

import styles from './styles.module.scss';

export const ProfileApiKey = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const apiKey = useSelector(profileSelectors.getProp('apiKey'));
  const statusGetKey = useSelector(
    profileSelectors.getStatus(ProfileActionTypes.GetApiKey),
  );
  const statusRevokeKey = useSelector(
    profileSelectors.getStatus(ProfileActionTypes.DeleteApiKey),
  );

  const onClickBack = useCallback(() => {
    router.push(routes.profile.root);
  }, [router]);

  const [showRevokeAPIKey, hideRevokeAPIKey] = useModal(
    () => (
      <RevokeAPIKey
        isLoading={statusRevokeKey === RequestStatus.REQUEST}
        onCloseModal={() => {
          hideRevokeAPIKey();
        }}
        onConfirm={() => {
          dispatch(profileDeleteApiKey({
            callback: hideRevokeAPIKey,
          }));
        }}
      />
    ),
    [statusRevokeKey],
  );

  const onClickGenerate = useCallback(() => {
    dispatch(profileCreateApiKey());
  }, [dispatch]);

  const onClickCopy = useCallback(() => {
    navigator.clipboard.writeText(apiKey);
  }, [apiKey]);

  useEffect(() => {
    dispatch(profileGetApiKey());
  }, [dispatch]);

  return (
    <>
      <PageHead
        title="API key configuration"
        headStyles={{
          background: 'transparent',
        }}
        btnWrap={(
          <Button
            theme="primary"
            className={styles.profile__head_button}
            onClick={onClickBack}
          >
            Back
          </Button>
        )}
      />
      <p>
        To use the PrivateAI public API, you should generate your personal API key.
        You will be required to provide it each time you use API for managing
        your data or configuring your profile.
      </p>
      <div className={styles.profile__container}>
        <p>{`Your Api key: ${apiKey}`}</p>
        <div className={styles.profile__buttons_wrap}>
          <Button onClick={onClickCopy} disabled={!apiKey}>Copy</Button>
          <Button
            onClick={onClickGenerate}
            isLoading={statusGetKey === RequestStatus.REQUEST}
            disabled={!!apiKey}
          >
            Generate
          </Button>
          <Button onClick={showRevokeAPIKey} disabled={!apiKey}>Revoke</Button>
        </div>

        <p>
          Please do not share this key with anyone to keep the privacy of your account consistent.
          if you suspect the leakage of your API key, you`d better generate a new one on this page.
          <br />
          <br />
          Please pay attention that ony one API key is permitted for a single PrivateAI account.
          Also, note that the throughout is limited to
          30 request per minute to minimize the server load.
          <br />
          <br />
          You can see the list of available API endpoint and their description here
          {' '}
          <Link href={`${apiBaseUrl}/swagger/api`}>Swagger Link</Link>
        </p>
      </div>
    </>
  );
};
