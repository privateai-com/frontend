import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { Loader } from 'components';
import { itemsOnPageQuantity } from 'appConstants';
import { usePagination, useVipUser } from 'hooks';

import { articlesGetAll, articlesSearch } from 'store/articles/actionCreators';
import { ArticlesActionTypes } from 'store/articles/actionTypes';
import { articlesSelectors } from 'store/articles/selectors';
import { RequestStatus } from 'types';
import { PageHead } from 'components/PageHead';
import Link from 'next/link';
import { Item } from './Item';
import styles from './styles.module.scss';
import { TableHead } from './TableHead';

export const KnowledgeBase: React.FC = () => {
  const dispatch = useDispatch();
  // const isMobile = useScreenWidth(ScreenWidth.bigMobile);
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
      <PageHead title="Knowledge base" />
      <div className={styles.items}>
        <div className={styles.items_wrapper}>
          <TableHead 
            props={['File name', 'Core entities', 'Created', 'Modified', 'Status']}
          />
          <div className={styles.items_container} ref={rootRef}>
            <div className={`${styles.items_container_inner} ${articles.length === 0 && styles.items_container_inner_empty}`}>
            
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
              
              { 
              (!articles || articles.length === 0) && !isLoading && (
                <div className={styles.noData}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="142" height="142" viewBox="0 0 142 142" fill="none">
                    <circle cx="71" cy="71" r="71" fill="#4659FE" fillOpacity="0.08" />
                    <path d="M40 42.5H57L63 47.5H98.5C102.918 47.5 106.5 51.0817 106.5 55.5V56.5V65.5H56L43 100H40C36.6863 100 34 97.3137 34 94V48.5C34 45.1863 36.6863 42.5 40 42.5Z" fill="white" />
                    <path d="M106.632 65.2V53.4588C106.632 50.1451 103.946 47.4588 100.632 47.4588H62.6437L59.5311 44.3446C58.0307 42.8434 55.9953 42 53.8728 42H40C36.6863 42 34 44.6863 34 48V93C34 96.866 37.134 100 41 100H42.8659M106.632 65.2H121.6C122.286 65.2 122.768 65.8753 122.546 66.5244L111.992 97.2976C111.438 98.9142 109.917 100 108.208 100H42.8659M106.632 65.2H58.6026C56.9319 65.2 55.4371 66.2385 54.8541 67.8042L42.8659 100" stroke="#7C859E" strokeWidth="3" />
                  </svg>
                  <h3>
                    Nothing here yet...
                  </h3>
                  <p>
                    This list is currently empty. 
                    Check out the 
                    {' '}
                    <Link href="/knowledge">Knowledge base</Link>
                    {' '}
                    and feel free to upload your research data in the 
                    &quot;
                    <Link href="/storage">My storage</Link>
                    &quot; section to discover more features.
                  </p>
            
                </div>
              )
}

              {isLoading && (
              <div className={styles.containerLoader}>
                <Loader size={64} className={styles.loader} />
              </div>
              )}
            </div>
            {endElementForScroll}
          </div>
        </div>
      </div>
    </div>
  );
};
