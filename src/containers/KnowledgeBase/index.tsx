import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInfiniteScroll from 'react-infinite-scroll-hook';

import { Typography } from 'components';
import { itemsOnPageQuantity } from 'appConstants';
import { RequestStatus } from 'types';
import { articlesGetAll } from 'store/articles/actionCreators';
import { ArticlesActionTypes } from 'store/articles/actionTypes';
import { articlesSelectors } from 'store/articles/selectors';
import { Item } from './Item';
import styles from './styles.module.scss';

export const KnowledgeBase: React.FC = () => {
  const dispatch = useDispatch();

  const [offset, setOffset] = useState(0);

  const total = useSelector(articlesSelectors.getProp('total'));
  const articles = useSelector(articlesSelectors.getProp('articles'));
  const statusGetArticles = useSelector(
    articlesSelectors.getStatus(ArticlesActionTypes.GetArticles),
  );
  
  const increaseOffset = useCallback(() => setOffset((value) => value + 1), []);

  useEffect(() => {
    const payload = {
      limit: itemsOnPageQuantity,
      offset: offset * itemsOnPageQuantity,
    };
    dispatch(articlesGetAll(payload));
  }, [dispatch, offset]);

  const isHasNextPage = (offset + 1) * itemsOnPageQuantity < total; 

  const isLoading = statusGetArticles === RequestStatus.REQUEST; 

  const [sentryRef, { rootRef }] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: isHasNextPage ?? true,
    onLoadMore: increaseOffset,
    disabled: statusGetArticles === RequestStatus.ERROR,
    rootMargin: '0px 0px 40px 0px',
  });
  
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
            {articles.map(
              (item) => (
                <Item
                  key={item.id} 
                  article={item}
                />
              ),
            )}
            {(isLoading || isHasNextPage) && (
              <div ref={sentryRef} />
            )}
          </div>
        </div>
      </div>
      {' '}
    </div>
  );
};
