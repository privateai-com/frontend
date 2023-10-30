import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AdaptivePaginationTable } from 'components';
import { itemsOnPageQuantity } from 'appConstants';
import { RequestStatus, SortingDirection } from 'types';

import { ArticlesActionTypes } from 'store/articles/actionTypes';
import { articlesGetMy } from 'store/articles/actionCreators';
import { articlesSelectors } from 'store/articles/selectors';

import { useColumns } from './columns';
import styles from './styles.module.scss';

export const ArticlesTab = () => {
  const dispatch = useDispatch();

  const [offset, setOffset] = useState(0);

  const [selectSortingField, setSelectSortingField] = useState('id');
  const [selectSortingDirection, setSelectSortingDirection] = useState<SortingDirection>('DESC');

  const handleToggleDirection = useCallback(() => {
    setOffset(0);
    setSelectSortingDirection(
      (state) => (state === 'ASC' ? 'DESC' : 'ASC'),
    );
  }, []);

  const handleChangeSortField = useCallback((field: string) => {
    setOffset(0);
    setSelectSortingField(field);
  }, []);

  const columns = useColumns({
    onChangeSortingField: handleChangeSortField,
    onToggleDirection: handleToggleDirection,
  });
  
  const total = useSelector(articlesSelectors.getProp('total'));
  const articles = useSelector(articlesSelectors.getProp('articles'));
  const statusGetMyArticles = useSelector(
    articlesSelectors.getStatus(ArticlesActionTypes.GetMyArticles),
  );

  const increaseOffset = useCallback(() => setOffset((value) => value + 1), []);

  useEffect(() => {
    const payload = {
      limit: itemsOnPageQuantity,
      offset: offset * itemsOnPageQuantity,
      sortingDirection: selectSortingDirection,
      sortingField: selectSortingField,
    };
    dispatch(articlesGetMy(payload));
  }, [dispatch, offset, selectSortingDirection, selectSortingField]);

  const isHasNextPage = (offset + 1) * itemsOnPageQuantity < total; 

  return (
    <AdaptivePaginationTable
      columns={columns}
      content={articles}
      mobileTitle1="Status"
      key1="status"
      mobileTitle2="Core entites"
      key2="core"
      classNameTableContainer={styles.table}
      pagination={{
        isHasNextPage,
        isLoading: statusGetMyArticles === RequestStatus.REQUEST,
        isError: statusGetMyArticles === RequestStatus.ERROR,
        onLoadMore: increaseOffset,
      }}
    />
  );
};
