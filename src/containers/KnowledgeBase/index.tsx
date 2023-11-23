import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Typography } from 'components';
import { itemsOnPageQuantity } from 'appConstants';
import { usePagination, useVipUser } from 'hooks';

import { articlesGetAll } from 'store/articles/actionCreators';
import { ArticlesActionTypes } from 'store/articles/actionTypes';
import { articlesSelectors } from 'store/articles/selectors';
import { Item } from './Item';
import styles from './styles.module.scss';

export const KnowledgeBase: React.FC = () => {
  const dispatch = useDispatch();
  const isVipUser = useVipUser();

  const [offset, setOffset] = useState(0);
  
  const increaseOffset = useCallback(() => {
    setOffset((value) => {
      const newValue = value + 1;
      return newValue;
    });
  }, []);

  const total = useSelector(articlesSelectors.getProp('total'));
  const articles = useSelector(articlesSelectors.getProp('articles'));
  const statusGetArticles = useSelector(
    articlesSelectors.getStatus(ArticlesActionTypes.GetArticles),
  );
  
  const {
    rootRef, endElementForScroll,
  } = usePagination({
    total, status: statusGetArticles, offset, increaseOffset, 
  });

  useEffect(() => {
    const payload = {
      limit: itemsOnPageQuantity,
      offset: offset * itemsOnPageQuantity,
    };
    dispatch(articlesGetAll(payload));
  }, [dispatch, offset]);

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
              />
            ))}
            {endElementForScroll}
          </div>
        </div>
      </div>
    </div>
  );
};
