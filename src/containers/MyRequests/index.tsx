import {
  ReactNode,
  useCallback, useEffect, useMemo, useState, 
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AdaptivePaginationTable, ButtonIcon, RequestCell, 
} from 'components';
import { itemsOnPageQuantity } from 'appConstants';
import { requestSelectors } from 'store/request/selectors';
import { RequestActionTypes } from 'store/request/actionsTypes';
import { requestGetMyRequests } from 'store/request/actionCreators';
import { SortingDirection } from 'types';
import { normalizeUserInfo } from 'utils';
import { getStatusImg, getStatusStyle } from './utils';
import { useColumns } from './columns';
import styles from './styles.module.scss';
import { RequestedDataType } from './types';

const itemsMobile = [
  {
    title: 'Core entities',
    key: 'core',
  },
  {
    title: 'Owner',
    key: 'owner',
    cell: (value: RequestedDataType | ReactNode): ReactNode => {
      if (value && typeof value === 'object') {
        const { ownerId, owner } = value as RequestedDataType;
        return (
          <RequestCell
            className={styles.requesterMobile}
            profileId={ownerId}
            isHideButoonsRequester
          >
            {owner}
          </RequestCell>
        );
      }
      return value;
    },
  },
  {
    title: null,
    key: 'status',
    cell: (value: RequestedDataType | ReactNode): ReactNode => (
      <div className={styles.containerStatus}>
        <div>
          <div className={styles.title}>Status:</div>
          <div className={getStatusStyle(value as string, styles)}>
            {(value && typeof value === 'string') ? value : '-'}
          </div>
        </div>
        <ButtonIcon
          className={styles.columns_img}
          image={getStatusImg(value as string)}
          onClick={() => {}}
        />
      </div>
    ),
  },
];

export const MyRequests = () => {
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

  const requestsToMe = useSelector(requestSelectors.getProp('myRequests'));
  const total = useSelector(requestSelectors.getProp('total'));
  const statusGetMyRequests = useSelector(
    requestSelectors.getStatus(RequestActionTypes.GetMyRequests),
  );

  const content = useMemo(() => requestsToMe.map((item) => {
    const status = 'Access request pending';
    return {
      id: item.id,
      articleId: item.article.id, 
      ownerId: item.article.owner.id,
      title: item.article.title,
      core: item.article.field,
      owner: normalizeUserInfo(item.article.owner.fullName, item.article.owner.username) || `Archonaut#${item.article.owner.id}`,
      isOwnerViewed: item.isOwnerViewed, 
      approve: item.approve,
      status,
      other: (
        <div className={styles.table_mobile_block_status}>
          <div>
            <div className={styles.table_mobile_title}>Status:</div>
            <div className={getStatusStyle(status, styles)}>
              {status}
            </div>
          </div>
          <ButtonIcon
            className={styles.columns_img}
            image={getStatusImg(status)}
            onClick={() => {}}
          />
          {' '}
        </div>
      ),
    };
  }), [requestsToMe]);

  useEffect(() => {
    const payload = {
      limit: itemsOnPageQuantity,
      offset: offset * itemsOnPageQuantity,
      sortingDirection: selectSortingDirection,
      sortingField: selectSortingField,
    };
    dispatch(requestGetMyRequests(payload));
  }, [dispatch, offset, selectSortingDirection, selectSortingField]);

  const pagination = useMemo(() => ({
    total,
    changeOffset: setOffset,
    status: statusGetMyRequests, 
  }), [statusGetMyRequests, total]);
  
  return (
    <div>
      <AdaptivePaginationTable
        columns={columns}
        content={content}
        classNameTableContainer={styles.table}
        itemsMobile={itemsMobile}
        pagination={pagination}
      />
    </div>
  );
};
