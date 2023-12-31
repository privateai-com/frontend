import cx from 'classnames';
import Image from 'next/image';
import { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { Typography } from 'components';
import { profileGetProfile } from 'store/profile/actionCreators';
import { profileSelectors } from 'store/profile/selectors';
import { normalizeUserInfo } from 'utils';
import styles from './styles.module.scss';
import { Footer } from '../Footer';

export const ProfileInfo = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(profileGetProfile());
  }, [dispatch]);

  const {
    avatarUrl,
    username,
    fullName,
    country,
    city,
    email,
    socialLink,
    organization,
    position,
    researchFields,
  } = useSelector(profileSelectors.getProp('accountInfo'), shallowEqual);

  return (
    <>
      <div className={cx(styles.wrapper, styles.info)}>
        <div className={styles.containerAvatar}>
          {avatarUrl && avatarUrl !== '' ? (
            <div className={styles.info_avatar}>
              <Image
                src={avatarUrl}
                alt=""
                className={styles.info_avatar}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          ) : (
            <div className={styles.no_avatar} />
          )}
        </div>
        <div className={styles.info_wrapper}>
          <div className={styles.info_item}>
            <Typography type="h4">
              User name/Real name 
              {' '}
              <span>*</span>
            </Typography>
            {normalizeUserInfo(fullName, username)}
          </div>
          <div className={styles.info_item}>
            <Typography type="h4">Location (Country and/or City)</Typography>
            {normalizeUserInfo(city, country)}
          </div>
        </div>
      </div>
      <div className={cx(styles.wrapper, styles.info2)}>
        <Typography type="h2" className={styles.subTitle}>Contact information</Typography>
        <div className={styles.info_item}>
          <Typography type="h4">
            Email address 
            {' '}
            <span>*</span>
          </Typography>
          {email}
        </div>
        <div className={styles.info_item}>
          <Typography type="h4">Social media</Typography>
          {socialLink}
        </div>
      </div>
      <div className={cx(styles.wrapper, styles.info3)}>
        <Typography type="h2" className={styles.subTitle}>Field of activity</Typography>
        <div className={styles.info_item}>
          <Typography type="h4">
            Organisation/Institute 
            {' '}
            <span>*</span>
          </Typography>
          {organization}
        </div>
        <div className={styles.info_item}>
          <Typography type="h4">
            Position 
            {' '}
            <span>*</span>
          </Typography>
          {position}
        </div>
        <div className={styles.info_item}>
          <Typography type="h4">
            Research fields 
            {' '}
            <span>*</span>
          </Typography>
          {researchFields}
        </div>
      </div>
      <Footer isEditProfile={false} className={styles.footer} />
    </>
  );
};
