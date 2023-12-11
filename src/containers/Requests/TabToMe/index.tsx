/* eslint-disable react/no-unstable-nested-components */
import {
  ReactNode,
  useCallback, useEffect, useMemo, useState, 
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AdaptivePaginationTable, Loader } from 'components';
import { ScreenWidth, itemsOnPageQuantity } from 'appConstants';
import { RequestCell } from 'containers/RequestCell';
import { RequestedDataType } from 'containers/Storage/MyRequests/types';
import { requestSelectors } from 'store/request/selectors';
import { requestAnswer, requestSetState, requestToMe } from 'store/request/actionCreators';
import { RequestActionTypes } from 'store/request/actionsTypes';
import { useScreenWidth } from 'hooks';
import { RequestStatus, SortingDirection } from 'types';
import { convertTitleFile, formatDate, getName } from 'utils';
import { useColumns } from './columns';

import styles from './styles.module.scss';

export const TabToMe = () => {
  const dispatch = useDispatch();
  const isMobile = useScreenWidth(ScreenWidth.bigMobile); 
  
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

  const requestsToMe = useSelector(requestSelectors.getProp('requestsToMe'));
  const total = useSelector(requestSelectors.getProp('total'));
  const statusGetRequestsToMe = useSelector(
    requestSelectors.getStatus(RequestActionTypes.GetRequestsToMe),
  );

  const isLoading = statusGetRequestsToMe === RequestStatus.REQUEST;

  const isHideRequests = !(isLoading && offset === 0); 

  const content = useMemo(() => requestsToMe.map((item) => ({
    id: item.id,
    articleId: item.article.id,
    ownerId: item.article.owner.id,
    requesterId: item.requester.id,
    title: convertTitleFile(item.article.title),
    date: formatDate(new Date(item.createdAt)),
    requester: getName(item.requester.fullName, item.requester.username, item.requester.id),
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
    increaseOffset,
    status: statusGetRequestsToMe, 
    offset,
  }), [increaseOffset, offset, statusGetRequestsToMe, total]);
  
  const itemsMobile = useMemo(() => {
    const handleDeclineMobile = (requestId: number) => () => {
      dispatch(requestAnswer({
        requestId,
        isApprove: false,
      }));
    };
  
    const handleProvideMobile = (requestId: number) => () => {
      dispatch(requestAnswer({
        requestId,
        isApprove: true,
      }));
    };

    return [
      {
        title: 'Request date',
        key: 'date', 
      },
      {
        title: 'Requester',
        key: 'owner', 
        cell: (value: RequestedDataType | ReactNode): ReactNode => {
          if (value && typeof value === 'object') {
            const { 
              ownerId, requester, approve, id,
            } = value as RequestedDataType;
            return (
              <RequestCell
                className={styles.requesterMobile}
                classNameRequester={styles.requesterMobile}
                profileId={ownerId}
                requester={requester}
                onConfirmButton={handleProvideMobile(id)}
                onCancelButton={handleDeclineMobile(id)}
                isHideButtonsRequester={!!approve}
              >
                See the profile details
              </RequestCell>
            );
          }
          return value;
        },
      },
    ];
  }, [dispatch]);

  useEffect(() => () => {
    if (isMobile) dispatch(requestSetState({ requestsToMe: [] }));
  }, [dispatch, isMobile]);
  
  return (
    <>
      {isHideRequests && (
        <AdaptivePaginationTable
          columns={columns}
          content={content}
          itemsMobile={itemsMobile}
          classNameTableContainer={styles.table}
          pagination={pagination}
          isMobile={isMobile}
        />
      )}
      {isLoading && (
        <div className={styles.containerLoader}>
          <Loader size={64} />
        </div>
      )}
    </>
  );
};
