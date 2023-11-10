import { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';

import { Button, RequestCell } from 'components';
import { ItemRowProps, RequestStatus } from 'types';
import { routes } from 'appConstants';
import { TitleWithArrows } from 'components/AdaptivePaginationTable/TitleWithArrows';
import { requestAnswer } from 'store/request/actionCreators';
import { RequestActionTypes } from 'store/request/actionsTypes';
import { requestSelectors } from 'store/request/selectors';
import { RequestsType } from './types';
import styles from './styles.module.scss';

export const useColumns = ({
  onChangeSortingField, onToggleDirection, 
}: {
  onChangeSortingField: (field: string) => void,
  onToggleDirection: () => void,
}) => {
  const dispatch = useDispatch();
  const [activeRequestId, setActiveRequestId] = useState(0);
  const [isProvided, setIsProvided] = useState(false);
  const statusAnswer = useSelector(requestSelectors.getStatus(RequestActionTypes.Answer));

  const handleDecline = useCallback((requestId: number) => () => {
    setActiveRequestId(requestId);
    setIsProvided(false);
    dispatch(requestAnswer({
      requestId,
      isApprove: false,
    }));
  }, [dispatch]);

  const handleProvide = useCallback((requestId: number) => () => {
    setActiveRequestId(requestId);
    setIsProvided(true);
    dispatch(requestAnswer({
      requestId,
      isApprove: true,
    }));
  }, [dispatch]);

  return useMemo(
    () => [
      {
        Header: (
          <TitleWithArrows
            title="File name"
            onClick={() => {
              onChangeSortingField('title');
              onToggleDirection();
            }}
          />),
        accessor: 'name',
        Cell: ({
          row: {
            original: { title, articleId },
          },
        }: ItemRowProps<RequestsType>) =>
          (title ? (
            <Link href={`${routes.storage.root}/${articleId}`}>{title}</Link>
          ) : (
            '-'
          )),
      },
      {
        Header: <TitleWithArrows
          title="Request date"
          onClick={() => {
            onChangeSortingField('date');
            onToggleDirection();
          }}
        />,
        accessor: 'date',
        Cell: ({
          row: {
            original: { date },
          },
        }: ItemRowProps<RequestsType>) => date || '-',
      },
      {
        Header: <TitleWithArrows
          title="Requester"
          onClick={() => {
            onChangeSortingField('requester');
            onToggleDirection();
          }}
        />,
        accessor: 'requester',
        Cell: ({
          row: {
            original: { requester },
          },
        }: ItemRowProps<RequestsType>) =>
          (requester ? (
            <RequestCell requester={requester}>
              See the profile details
            </RequestCell>
          ) : (
            '-'
          )),
      },
      {
        Header: 'Access action',
        accessor: 'id',
        Cell: ({
          row: {
            original: { id, isOwnerViewed, approve },
          },
        }: ItemRowProps<RequestsType>) =>
          // eslint-disable-next-line no-nested-ternary
          (!isOwnerViewed ? (
            <div className={styles.table_block_btn}>
              <Button 
                className={styles.table_provide}
                onClick={handleProvide(id)}
                isLoading={
                  statusAnswer === RequestStatus.REQUEST 
                  && id === activeRequestId 
                  && isProvided === true
                }
              >
                Provide
              </Button>
              <Button
                theme="grey"
                className={styles.table_decline}
                onClick={handleDecline(id)}
                isLoading={
                  statusAnswer === RequestStatus.REQUEST 
                  && id === activeRequestId 
                  && isProvided === false
                }
              >
                Decline
              </Button>
            </div>
          ) : 
            (approve === true ? 'Provided' : 'Declined')
          ),
      },
    ],
    [activeRequestId, handleDecline, handleProvide, isProvided, 
      onChangeSortingField, onToggleDirection, statusAnswer],
  );
};