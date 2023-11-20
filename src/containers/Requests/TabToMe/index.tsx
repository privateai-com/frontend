import {
  useCallback, useEffect, useMemo, useState, 
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AdaptivePaginationTable } from 'components';
import { itemsOnPageQuantity } from 'appConstants';
import { requestSelectors } from 'store/request/selectors';
import { requestToMe } from 'store/request/actionCreators';
import { RequestActionTypes } from 'store/request/actionsTypes';
import { SortingDirection } from 'types';
import { formatDate, normalizeUserInfo } from 'utils';
import { useColumns } from './columns';

import styles from './styles.module.scss';

const itemsMobile = [
  {
    title: 'Request date',
    key: 'date', 
  },
  {
    title: 'Requester',
    key: 'requester', 
  },
];

export const TabToMe = () => {
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

  const requestsToMe = useSelector(requestSelectors.getProp('requestsToMe'));
  const total = useSelector(requestSelectors.getProp('total'));
  const statusGetRequestsToMe = useSelector(
    requestSelectors.getStatus(RequestActionTypes.GetRequestsToMe),
  );

  const content = useMemo(() => requestsToMe.map((item) => ({
    id: item.id,
    articleId: item.article.id,
    ownerId: item.article.owner.id,
    requesterId: item.requester.id,
    title: item.article.title,
    date: formatDate(new Date(item.createdAt)),
    requester: normalizeUserInfo(item.requester.fullName, item.requester.username) || `Archonaut#${item.requester.id}`,
    isOwnerViewed: item.isOwnerViewed, 
    approve: item.approve,
  })), [requestsToMe]);

  useEffect(() => {
    const payload = {
      limit: itemsOnPageQuantity,
      offset: offset * itemsOnPageQuantity,
      sortingDirection: selectSortingDirection,
      sortingField: selectSortingField,
    };
    dispatch(requestToMe(payload));
  }, [dispatch, offset, selectSortingDirection, selectSortingField]);

  const pagination = useMemo(() => ({
    total,
    changeOffset: setOffset,
    status: statusGetRequestsToMe, 
  }), [statusGetRequestsToMe, total]);
  
  return (
    <AdaptivePaginationTable
      columns={columns}
      content={content}
      itemsMobile={itemsMobile}
      classNameTableContainer={styles.table}
      pagination={pagination}
    />
  );
};
