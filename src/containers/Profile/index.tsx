import { useCallback, useEffect, useState } from 'react';
import { useModal } from 'react-modal-hook';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { Button, ProfileSuccess, Typography } from 'components';
import { stringLongShortcut } from 'utils';
import { profileSelectors } from 'store/profile/selectors';
import { ProfileActionTypes } from 'store/profile/actionTypes';
import { RequestStatus } from 'types';
import {
  profileDeleteWallet,
  profileLinkWallet,
} from 'store/profile/actionCreators';
import { routes } from 'appConstants';
import { UpdateProfile } from './UpdateProfile';
import { ProfileInfo } from './ProfileInfo';

import styles from './styles.module.scss';

export const Profile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  
  const [isEditProfile, setIsEditProfile] = useState(false);
  
  const walletAddress = useSelector(profileSelectors.getPropAccountInfo('walletAddress'));
  const status = useSelector(
    profileSelectors.getStatus(ProfileActionTypes.LinkWallet),
  );
  const statusDeleteWallet = useSelector(
    profileSelectors.getStatus(ProfileActionTypes.DeleteWallet),
  );

  const onClickUpload = useCallback(() => {
    router.push(routes.uploadActivity.root);
  }, [router]);

  const onClickBrowse = useCallback(() => {
    router.push(routes.knowledge.root);
  }, [router]);

  const [showSuccess, hideSuccess] = useModal(
    () => (
      <ProfileSuccess
        onClickCancel={hideSuccess}
        onClickUpload={onClickUpload}
        onClickBrowse={onClickBrowse}
      />
    ),
    [],
  );

  useEffect(() => {
    const { showModal } = router.query;

    if (showModal === 'true') {
      router.replace(router.pathname, undefined, { shallow: true });
      showSuccess();
    }
  }, [router, router.query, showSuccess]);

  const onLinkWalletClick = useCallback(() => {
    dispatch(profileLinkWallet());
  }, [dispatch]);

  const onDisconnectLinkWalletClick = useCallback(() => {
    dispatch(profileDeleteWallet());
  }, [dispatch]);

  const isDeleteLoading = statusDeleteWallet === RequestStatus.REQUEST;

  return (
    <div className={styles.profile__container}>
      <div className={styles.profile__head}>
        <div className={styles.profile__head_title}>
          <Typography type="h1">My profile</Typography>
          {!isEditProfile && (
            <Button
              className={styles.profile__head_button}
              onClick={() => setIsEditProfile(true)}
            >
              Edit
            </Button>
          )}
        </div>

        <div className={styles.profile__head_auth}>
          {walletAddress ? (
            <>
              {!isEditProfile &&
                `Linked wallet: ${stringLongShortcut(walletAddress, 6, 3)}`}
              <Button
                className={styles.profile__head_button}
                theme="secondary"
                onClick={onDisconnectLinkWalletClick}
                isLoading={isDeleteLoading}
              >
                Disconnect wallet
              </Button>
            </>
          ) : (
            <Button
              className={styles.profile__head_button}
              onClick={onLinkWalletClick}
              isLoading={status === RequestStatus.REQUEST}
            >
              Link your wallet
            </Button>
          )}
        </div>
      </div>

      {isEditProfile ? (
        <UpdateProfile
          setIsEditProfile={setIsEditProfile}
          isEditProfile={isEditProfile}
        />
      ) : (
        <ProfileInfo />
      )}
    </div>
  );
};
