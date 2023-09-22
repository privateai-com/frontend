import cx from 'classnames';
import Image from 'next/image';

import { avatarImage } from 'assets';
import { Typography } from 'components';

import styles from './styles.module.scss';

export const ProfileInfo = () => {
  const {
    avatarUrl,
    fullName,
    country,
    city,
    email,
    facebookLink,
    organization,
    position,
    researchFields,
  } = {
    avatarUrl: avatarImage,
    fullName: 'John Doe',
    country: 'UK',
    city: 'London',
    email: 'JohnDoe@gmail.com',
    facebookLink: 'https:/facebook.com/profile',
    organization: 'London Institute of Medical Sciences',
    position: 'Head of neurosurgery laboratory',
    researchFields: 'Neurobiology, neurosurgery, neuropathology',
  };

  return (
    <>
      <div className={cx(styles.wrapper, styles.info)}>
        <Image
          src={avatarUrl}
          alt="avatar"
          className={styles.info_avatar}
        />
        <div className={styles.info_wrapper}>
          <div className={styles.info_item}>
            <Typography type="h4">
              Username/name
              {' '}
              <span>*</span>
            </Typography>
            {fullName}
          </div>
          <div className={styles.info_item}>
            <Typography type="h4">
              Location (Country and/or City)
            </Typography>
            {`${city}, ${country}`}
          </div>
        </div>
      </div>
      <div className={cx(styles.wrapper, styles.info2)}>
        <Typography type="h2">Contact information</Typography>
        <div className={styles.info_item}>
          <Typography type="h4">
            Email address
            {' '}
            <span>*</span>
          </Typography>
          {email}
        </div>
        <div className={styles.info_item}>
          <Typography type="h4">
            Social media links
          </Typography>
          {facebookLink}
        </div>
      </div>
      <div className={cx(styles.wrapper, styles.info3)}>
        <Typography type="h2">Field of activity</Typography>
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
    </>
  );
};
