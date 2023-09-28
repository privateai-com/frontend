import { useState } from 'react';
import cx from 'classnames';

import { Button, Typography } from 'components';
import { stringLongShortcut } from 'utils';
import { UpdateProfile } from './UpdateProfile';
import { ProfileInfo } from './ProfileInfo';

import styles from './styles.module.scss';

export const Profile = () => {
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [isAuthWallet, setIsAuthWallet] = useState(true);
  const address = '0x0806E6A81DB5Fa3B54bB99f8D36C5041b678d564';

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
          {isAuthWallet ? (
            <>
              {`Linked wallet: ${stringLongShortcut(address, 6, 3)}`}
              <Button
                className={styles.profile__head_button}
                theme="secondary"
                onClick={() => setIsAuthWallet(false)}
              >
                Disconnect wallet
              </Button>
            </>
          ) : (
            <Button
              className={styles.profile__head_button}
              onClick={() => setIsAuthWallet(true)}
            >
              Link your wallet
            </Button>
          )}
        </div>
      </div>

      {isEditProfile ? <UpdateProfile /> : <ProfileInfo />}

      <div className={styles.footer}>
        <ul
          className={cx(styles.footer_list, {
            [styles.footer_list_edit]: isEditProfile,
          })}
        >
          <li>
            <span>*</span>
            Data owners like to see who they share their data with. Fill in as
            much information as you can to maximize your chances of being
            granted data access upon request.
          </li>
          <li>
            <span>*</span>
            Publishing to Archon requires full user information.
          </li>
        </ul>
        {isEditProfile && (
          <>
            <Button
              theme="secondary"
              className={styles.footer_button}
            >
              Fill in later
            </Button>
            <Button
              className={styles.footer_button}
              onClick={() => setIsEditProfile(false)}
            >
              Save
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
