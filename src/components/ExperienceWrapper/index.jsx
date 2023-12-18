import { useSelector, useDispatch } from 'react-redux';
import {
  useCallback, useEffect, useMemo, useState, 
} from 'react';
import { ArticlesActionTypes } from 'store/articles/actionTypes';
import { articlesSelectors } from 'store/articles/selectors';
import { usePagination } from 'hooks';
import { articlesGetMy } from 'store/articles/actionCreators';
import { itemsOnPageQuantity } from 'appConstants';
import Image from 'next/image';
import styles from './style.module.scss';
import docs from '../../assets/img/icons/docs.svg';
import star from '../../assets/img/icons/star.svg';

export const ExperienceWrapper = () => {
  const [rating, setRating] = useState(0);
  const [docCount, setDocCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const total = useSelector(articlesSelectors.getProp('total'));
  const myArticles = useSelector((state) => state.articles.myArticles);
  const isFetching = useSelector((state) => state.articles.isFetching);
  const statusGetMyArticles = useSelector(
    articlesSelectors.getStatus(ArticlesActionTypes.GetMyArticles),
  );
  const increaseOffset = useCallback(() => {
    setOffset((value) => {
      const newValue = value + 1;
      return newValue;
    });
  }, []);
  const { rootRef, endElementForScroll } = usePagination({ 
    offset,
    total, 
    status: statusGetMyArticles, 
    increaseOffset,
  });
  // const ProfileInfo = useSelector((state) => state.profile.accountInfo);
  const articles = useSelector(articlesSelectors.getProp('uploadArticles'));
  const dispatch = useDispatch();
  const queryParams = useMemo(() => ({
    limit: itemsOnPageQuantity,
    offset: offset * itemsOnPageQuantity,
    sortingDirection: 'DESC',
    sortingField: 'id',
    isHidden: false,
  }), [offset]);
  const setRatingFun = () => {
    let innerRating = 0;
    if(articles && articles.length > 0) {
      articles.forEach((article) => {
        const { isPublished } = article;
        if(isPublished) { innerRating += 100; }
      });
    }else{
      myArticles.forEach((article) => {
        const { isPublished } = article;
        if(isPublished) { innerRating += 100; }
      });
    }
    setRating(() => innerRating);
  };
  const setDocCountFun = () => {
    let count = 0;
    if(articles && articles.length > 0) {
      // from HZ, i think from DB
      articles.forEach((myArticle) => {
        if(myArticle.isPublished) { count += 1; }
      });
    }else{
      // from redux
      myArticles.forEach((myArticle) => {
        if(myArticle.isPublished) { count += 1; }
      });
    }
    setDocCount(() => count);
  };
  useEffect(() => {
    dispatch(articlesGetMy(queryParams));
  }, [dispatch, queryParams, isFetching]);
  useEffect(() => {
    setRatingFun();
    setDocCountFun();
  // eslint-disable-next-line
  }, [myArticles, articles, isFetching]);
  return (
    <div className={styles.experienceWrapper} ref={rootRef}>
      {/* endElementForScroll - element that causes the array to be updated. */}
      {endElementForScroll}
      {/* MY ARTICLE RATING */}
      <div className={styles.experienceRow}>
        <span className={styles.experineceSpan}>
          {rating}
        </span>
        <div className={styles.experienceRowImgWrap}>
          <Image width={20} height={20} className={`${styles.headerIcon} ${styles.iconStar}`} src={star.src} alt="rating star" />
        </div>
        <div className={styles.toolTipMessage}>
          <div>Get rewarded for uploading and processing your files.</div>
&nbsp;
          <div>For each provided document you will receive 100 bonus points.</div>
        </div>
      </div>
      {/* MY ARTICLE DOCS COUNT */}
      <div className={styles.experienceRow}>
        <span className={styles.experineceSpan}>
          {docCount === 0 ? '-' : docCount}
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
};
