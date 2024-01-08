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
import { TableHead } from './TableHead';
import { PageHead } from 'components/PageHead';

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

  const isHideArticles = !(isLoading && offset === 0 && isNewSearch && articles?.length); 

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

  // useEffect(() => () => {
  //   if (isMobile) dispatch(articlesSetState({ articlesAll: [] }));
  // }, [dispatch, isMobile]);

  return (
    <div className={styles.knowledge}>
      <PageHead props={{
        title:'Knowledge base'
      }} > </PageHead>
      <div className={styles.items}>
        <div className={styles.items_wrapper}>
          <TableHead 
              props={['File name','Core entities', 'Created', 'Modified', 'Status']}
            />
          <div className={styles.items_container} ref={rootRef}>
            {isHideArticles && articles.map((item) => (
              <Item
                key={item.id} 
                article={item}
                isDisabled={isVipUser}
                search={search as string}
                isMobile={false}
                // isMobile={isMobile}
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
