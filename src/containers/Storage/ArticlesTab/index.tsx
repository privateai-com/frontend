import {
  useCallback, useEffect, useMemo, useState, 
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AdaptivePaginationTable } from 'components';
import { itemsOnPageQuantity } from 'appConstants';
import { convertTitleFile } from 'utils';
import { SortingDirection } from 'types';

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
    key: 'topCoreEntities',
  },
];

export const ArticlesTab = () => {
  const dispatch = useDispatch();

  const [offset, setOffset] = useState(0);

  const increaseOffset = useCallback(() => {
    setOffset((value) => {
      const newValue = value + 1;
      return newValue;
    });
  }, []);

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

  const data = useMemo(() => articles.map((item) => ({
    ...item,
    title: convertTitleFile(item.title, 15),
  })), [articles]);

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
    increaseOffset,
    status: statusGetMyArticles, 
    offset,
  }), [increaseOffset, offset, statusGetMyArticles, total]);

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
