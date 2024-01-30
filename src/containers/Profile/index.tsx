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
import {
  metamaskConnect,
} from 'store/metamask/actionCreators';
import { ScreenWidth, routes } from 'appConstants';
import { useScreenWidth, useVipUser } from 'hooks';
import { PageHead } from 'components/PageHead';
import { UpdateProfile } from './UpdateProfile';
import { ProfileInfo } from './ProfileInfo';

import styles from './styles.module.scss';
import commonStyles from './common.module.scss';

export const Profile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isVipUser = useVipUser();
  const isMobile = useScreenWidth(ScreenWidth.notebook1024);
  
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [isFirstEdit, setIsFirstEdit] = useState(false);
  
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
    const { editProfile } = router.query;

    if (editProfile === 'true') {
      router.replace(router.pathname, undefined, { shallow: true });
      setIsFirstEdit(true);
      setIsEditProfile(true);
    }
  }, [router, router.query, showSuccess]);

  const onLinkWalletClick = useCallback(() => {
    dispatch(metamaskConnect({
      callback: () => {
        dispatch(profileLinkWallet());
      },
    }));
  }, [dispatch]);

  const onDisconnectLinkWalletClick = useCallback(() => {
    dispatch(profileDeleteWallet());
  }, [dispatch]);

  const handleShoModalSuccess = useCallback(() => {
    setIsEditProfile(false);
    if (isFirstEdit) {
      showSuccess();
      setIsFirstEdit(false);
    }
  }, [isFirstEdit, showSuccess]);

  const isDeleteLoading = statusDeleteWallet === RequestStatus.REQUEST;

  return (
    <>
      <PageHead
        title="My profile"
        headStyles={{
          background: 'transparent',
        }}
        btnWrap={(
          <>
            {!isEditProfile && !isVipUser && (
            <Button
              theme="primary"
              className={styles.profile__head_button}
              onClick={() => setIsEditProfile(true)}
            >
              Edit
            </Button>
            )}
            {
          isEditProfile && (
          <Button
            className={styles.profile__head_button}
            onClick={() => setIsEditProfile(false)}
          >
            Back
          </Button>
          )
        }
            {!isVipUser === undefined && (
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
                  disabled={isMobile}
                >
                  Link your wallet
                </Button>
              )}
            </div>
            )}
            {/* eslint-disable-next-line */}
        </>
        )}
      />
      <div className={styles.profile__container}>
        {false && (
        <div className={styles.profile__head}>
          <div className={styles.profile__head_title}>

            <Typography type="h1" className={commonStyles.h1_style}>My profile</Typography>
            {!isEditProfile && !isVipUser && (
            <Button
              className={styles.profile__head_button}
              onClick={() => setIsEditProfile(true)}
            >
              Edit
            </Button>
            )}
            {
            isEditProfile && (
            <Button
              className={styles.profile__head_button}
              onClick={() => setIsEditProfile(false)}
            >
              Back
            </Button>
            )
          }
          </div>

          {!isVipUser === undefined && (
          <div className={styles.profile__head_auth}>
            {walletAddress ? (
              <>
                {
                  !isEditProfile && walletAddress &&
                  `Linked wallet: ${stringLongShortcut(walletAddress || '', 6, 3)}`
}
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
                disabled={isMobile}
              >
                Link your wallet
              </Button>
            )}
          </div>
          )}
        </div>
        )}
        {isEditProfile ? (
          <UpdateProfile
            callbackLater={onClickBrowse}
            callbackSuccess={handleShoModalSuccess}
          />
        ) : (
          <ProfileInfo />
        )}
      </div>
    </>
  );
};
