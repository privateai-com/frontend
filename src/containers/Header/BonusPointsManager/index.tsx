import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';

import { docs, star } from 'assets';
import { profileSelectors } from 'store/profile/selectors';

import styles from './styles.module.scss';

export const BonusPointsManager = memo(() => {
  const bonusCount = useSelector(profileSelectors.getPropAccountInfo('bonusCount'));
  const articlesCount = useSelector(profileSelectors.getPropAccountInfo('articlesCount'));

  return (
    <div className={styles.experienceWrapper}>
      <div className={styles.experienceRow}>
        <span className={styles.experineceSpan}>
          {bonusCount}
        </span>
        <div className={styles.experienceRowImgWrap}>
          <Image width={20} height={20} className={`${styles.headerIcon} ${styles.iconStar}`} src={star.src} alt="rating star" />
        </div>
        <div className={styles.toolTipMessage}>
          <div>Get rewarded for uploading and processing your files. </div>
          <div>For each provided document you will receive 100 bonus points.</div>
        </div>
      </div>

      <div className={styles.experienceRow}>
        <span className={styles.experineceSpan}>
          {articlesCount === 0 ? '-' : articlesCount}
        </span>
        <div className={styles.experienceRowImgWrap}>
          <Image width={20} height={20} className={`${styles.headerIcon} ${styles.iconDoc}`} src={docs.src} alt="rating doc" />
        </div>
        <div className={styles.toolTipMessage}>
          <div>
            Number of documents that have been published
          </div>
        </div>
      </div>
    </div>
  );
});
