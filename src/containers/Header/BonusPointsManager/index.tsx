import React, { useEffect, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'next/image';

import { docs, star } from 'assets';

import { articlesSelectors } from 'store/articles/selectors';
import { articlesGetBonusPoints } from 'store/articles/actionCreators';
import { State } from 'types';

import styles from './styles.module.scss';

export const BonusPointsManager = memo(() => {
  const dispatch = useDispatch();
  const ratingPoints = useSelector(({ articles }: State) => articles.ratingPoints);
  const docsCount = useSelector(articlesSelectors.getProp('docsCount'));

  useEffect(() => {
    dispatch(articlesGetBonusPoints());
  }, [dispatch]);

  return (
    <div className={styles.experienceWrapper}>
      <div className={styles.experienceRow}>
        <span className={styles.experineceSpan}>
          {ratingPoints}
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
          {docsCount === 0 ? '-' : docsCount}
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
