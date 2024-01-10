import {
  ReactNode,
  useCallback, useEffect, useMemo, useState, 
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AdaptivePaginationTable, ButtonIcon, Loader, 
} from 'components';
import { RequestCell } from 'containers';
import { itemsOnPageQuantity, queryTab, routes } from 'appConstants';
import { requestSelectors } from 'store/request/selectors';
import { RequestActionTypes } from 'store/request/actionsTypes';
import { requestGetMyRequests } from 'store/request/actionCreators';
import { RequestStatus, SortingDirection } from 'types';
import { convertTitleFile, getName } from 'utils';
import cx from 'classnames';
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
        const { ownerId, owner, id } = value as RequestedDataType;
        return (
          <RequestCell
            className={styles.requesterMobile}
            profileId={ownerId}
            titleModal="Owner"
            isHideButtonsRequester
            id={id}
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

export const MyRequests = ({ isMobile }: { isMobile: boolean }) => {
  const dispatch = useDispatch();
  
  const [offset, setOffset] = useState(0);
  
  const increaseOffset = useCallback(() => {
    setOffset((value) => {
      const newValue = value + 1;
      return newValue;
    });
  }, []);

  const itemsOnPageQuantityCurrent = isMobile ? 16 : itemsOnPageQuantity;

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

  const myRequests = useSelector(requestSelectors.getProp('myRequests'));
  const total = useSelector(requestSelectors.getProp('total'));
  const statusGetMyRequests = useSelector(
    requestSelectors.getStatus(RequestActionTypes.GetMyRequests),
  );
  const isLoading = statusGetMyRequests === RequestStatus.REQUEST;
  const isHideRequests = !(isLoading && offset === 0); 

  const content = useMemo(() => myRequests.map((item) => {
    function getStatus() {
      if(item.isOwnerViewed) {
        if (item.approve === true) return 'Access granted'; 
        if (item.approve === null) return 'Access request pending'; 
        if (item.approve === false) return 'Access denied'; 
      }
      return 'Access request pending';
    }
    const status = getStatus();
    return {
      id: item.id,
      articleId: item.article.id, 
      ownerId: item.article.owner.id,
      title: convertTitleFile(item.article.title, 15),
      core: item.article.topCoreEntities ?? '-',
      owner: getName(
        item.article.owner.fullName, 
        item.article.owner.username, 
        item.article.owner.id,
      ),
      isOwnerViewed: item.isOwnerViewed, 
      approve: item.approve,
      status,
      href: `${routes.storage.root}/${item.id}?storageTab=${queryTab.storageRequestedData}`,
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
  }), [myRequests]);

  useEffect(() => {
    const payload = {
      limit: itemsOnPageQuantityCurrent,
      offset: offset * itemsOnPageQuantityCurrent,
      sortingDirection: selectSortingDirection,
      sortingField: selectSortingField,
    };
    dispatch(requestGetMyRequests(payload));
  }, [dispatch, itemsOnPageQuantityCurrent, offset, selectSortingDirection, selectSortingField]);

  const pagination = useMemo(() => ({
    total,
    increaseOffset,
    status: statusGetMyRequests, 
    offset,
  }), [increaseOffset, offset, statusGetMyRequests, total]);
  
  return (
    <>
      {isHideRequests && (
        <AdaptivePaginationTable
          columns={columns}
          content={content}
          classNameTableContainer={styles.table}
          itemsMobile={itemsMobile}
          pagination={pagination}
          isMobile={isMobile}
          classNameMobile={styles.tableMobile}
        />
      )}
      {isLoading && (
        <>
          <AdaptivePaginationTable
            columns={columns}
            content={[]}
            // classNameTableContainer={styles.table}
            classNameTableContainer={cx(styles.table, styles.emptyTable)}
            itemsMobile={itemsMobile}
            pagination={pagination}
            isMobile={isMobile}
            classNameMobile={styles.tableMobile}
          />
          <div className={styles.containerLoader}>
            <Loader size={64} />
          </div>
        </>
      )}
    </>
  );
};
