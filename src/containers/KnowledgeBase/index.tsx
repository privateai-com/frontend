import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { Typography } from 'components';
import { itemsOnPageQuantity } from 'appConstants';
import { usePagination, useVipUser } from 'hooks';

import { articlesGetAll, articlesSearch } from 'store/articles/actionCreators';
import { ArticlesActionTypes } from 'store/articles/actionTypes';
import { articlesSelectors } from 'store/articles/selectors';
import { Item } from './Item';
import styles from './styles.module.scss';

export const KnowledgeBase: React.FC = () => {
  const dispatch = useDispatch();
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
  
  const {
    rootRef, endElementForScroll,
  } = usePagination({
    total, status: statusGetArticles, offset, increaseOffset, 
  });

  const isNewSearch = pagination?.search !== search;

  useEffect(() => {
    if (isNewSearch && search && search.length > 0) setOffset(0);
  }, [isNewSearch, search]);

  useEffect(() => {
    const payload = {
      limit: itemsOnPageQuantity,
      offset: isNewSearch ? 0 : offset * itemsOnPageQuantity,
      search,
    };
    if (search && search.length > 0) {
      dispatch(articlesSearch(payload));
    } else {
      dispatch(articlesGetAll(payload));
    }
  }, [dispatch, isNewSearch, offset, search]);

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
            {articles.map((item) => (
              <Item
                key={item.id} 
                article={item}
                isDisabled={isVipUser}
                search={search as string}
              />
            ))}
            {endElementForScroll}
          </div>
        </div>
      </div>
    </div>
  );
};
