import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { Loader, Typography } from 'components';
import { ScreenWidth, itemsOnPageQuantity } from 'appConstants';
import { usePagination, useScreenWidth, useVipUser } from 'hooks';

import { articlesGetAll, articlesSearch, articlesSetState } from 'store/articles/actionCreators';
import { ArticlesActionTypes } from 'store/articles/actionTypes';
import { articlesSelectors } from 'store/articles/selectors';
import { RequestStatus } from 'types';
import { Item } from './Item';
import styles from './styles.module.scss';

export const KnowledgeBase: React.FC = () => {
  const dispatch = useDispatch();
  const isMobile = useScreenWidth(ScreenWidth.bigMobile);
  const router = useRouter();
  const { search } = router.query;

  const isVipUser = useVipUser();

  const [offset, setOffset] = useState(0);
  
  const increaseOffset = useCallback(() => {
    setOffset((value) => {
      const newValue = value + 1;
      return newValue;
    });
  }, []);

  const total = useSelector(articlesSelectors.getProp('total'));
  const pagination = useSelector(articlesSelectors.getProp('pagination'));
  const articles = useSelector(articlesSelectors.getProp('articlesAll'));
  const statusGetArticles = useSelector(
    articlesSelectors.getStatus(ArticlesActionTypes.GetArticles),
  );
  const statusSearchArticles = useSelector(
    articlesSelectors.getStatus(ArticlesActionTypes.SearchArticles),
  );
  
  const {
    rootRef, endElementForScroll,
  } = usePagination({
    total, status: search ? statusSearchArticles : statusGetArticles, offset, increaseOffset, 
  });

  const isNewSearch = pagination?.search !== search;

  const isLoading = statusGetArticles === RequestStatus.REQUEST 
  || statusSearchArticles === RequestStatus.REQUEST;

  const isHideArticles = !(isLoading && offset === 0 && isNewSearch); 

  useEffect(() => {
    if (isNewSearch) setOffset(0);
  }, [isNewSearch, search]);

  useEffect(() => {
    const payload = {
      limit: itemsOnPageQuantity,
      offset: isNewSearch ? 0 : offset * itemsOnPageQuantity,
      search,
    };
    if (search && search.length > 0) {
      if (isNewSearch || offset !== 0) {
        dispatch(articlesSearch(payload));
      }
    }
  }, [dispatch, isNewSearch, offset, search]);

  useEffect(() => {
    const payload = {
      limit: itemsOnPageQuantity,
      offset: offset * itemsOnPageQuantity,
    };
    if (!search && !(isNewSearch && offset !== 0)) {
      dispatch(articlesGetAll(payload));
    }
  }, [dispatch, isNewSearch, offset, search]);

  useEffect(() => () => {
    if (isMobile) dispatch(articlesSetState({ articlesAll: [] }));
  }, [dispatch, isMobile]);

  return (
    <div className={styles.knowledge}>
      <div className={styles.knowledge_header}>
        <Typography
          className={styles.knowledge_title}
          type="h3"
        >
          Knowledge base
        </Typography>
      </div>
      <div className={styles.items}>
        <div className={styles.items_wrapper}>
          <div className={styles.items_container} ref={rootRef}>
            {isHideArticles && articles.map((item) => (
              <Item
                key={item.id} 
                article={item}
                isDisabled={isVipUser}
                search={search as string}
                isMobile={isMobile}
              />
            ))}
            {isLoading && (
            <div className={styles.containerLoader}>
              <Loader size={64} className={styles.loader} />
            </div>
            )}
            {endElementForScroll}
          </div>
        </div>
      </div>
    </div>
  );
};
