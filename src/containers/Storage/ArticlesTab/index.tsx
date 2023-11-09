import {
  useCallback, useEffect, useMemo, useState, 
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AdaptivePaginationTable } from 'components';
import { itemsOnPageQuantity } from 'appConstants';
import { SortingDirection } from 'types';
import { getTopCoreEntities } from 'utils';

import { ArticlesActionTypes } from 'store/articles/actionTypes';
import { articlesGetMy } from 'store/articles/actionCreators';
import { articlesSelectors } from 'store/articles/selectors';

import { useColumns } from './columns';
import styles from './styles.module.scss';

const itemsMobile = [
  {
    title: 'Status',
    key: 'uploadStatus',
  },
  {
    title: 'Core entities',
    key: 'core',
  },
];

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

  useEffect(() => {
    const payload = {
      limit: itemsOnPageQuantity,
      offset: offset * itemsOnPageQuantity,
      sortingDirection: selectSortingDirection,
      sortingField: selectSortingField,
    };
    dispatch(articlesGetMy(payload));
  }, [dispatch, offset, selectSortingDirection, selectSortingField]);

  const pagination = useMemo(() => ({
    total,
    changeOffset: setOffset,
    status: statusGetMyArticles, 
  }), [statusGetMyArticles, total]);

  const data = useMemo(() => articles.map((item) => ({
    ...item,
    core: getTopCoreEntities(item.graph.length > 0 ? item.graph : item.graphDraft) || '-',
  })), [articles]);

  return (
    <AdaptivePaginationTable
      columns={columns}
      content={data}
      classNameTableContainer={styles.table}
      pagination={pagination}
      itemsMobile={itemsMobile}
    />
  );
};
