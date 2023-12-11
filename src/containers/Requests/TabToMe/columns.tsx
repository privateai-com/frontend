import { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';

import { Button } from 'components';
import { RequestCell } from 'containers';
import { ItemRowProps, RequestStatus } from 'types';
import { ScreenWidth, routes } from 'appConstants';
import { useScreenWidth } from 'hooks';
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
  const isNotebook1280 = useScreenWidth(ScreenWidth.notebook1280); 

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
              onChangeSortingField('article.title');
              onToggleDirection();
            }}
          />),
        width: isNotebook1280 ? '18vw' : '22vw',
        accessor: 'name',
        Cell: ({
          row: {
            original: { title, articleId },
          },
        }: ItemRowProps<RequestsType>) =>
          (title ? (
            <Link href={`${routes.storage.root}/${articleId}`}>
              {title}
            </Link>
          ) : (
            '-'
          )),
      },
      {
        Header: <TitleWithArrows
          title="Request date"
          onClick={() => {
            onChangeSortingField('createdAt');
            onToggleDirection();
          }}
        />,
        accessor: 'date',
        // width: '187px',
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
            onChangeSortingField('requester.id');
            onToggleDirection();
          }}
        />,
        accessor: 'requester',
        Cell: ({
          row: {
            original: {
              id, requester, approve, requesterId,
            },
            index,
          },
        }: ItemRowProps<RequestsType>) =>
          (requester ? (
            <RequestCell
              requester={requester}
              profileId={requesterId}
              onConfirmButton={handleProvide(id)}
              onCancelButton={handleDecline(id)}
              isHideButtonsRequester={!!approve}
              id={index}
            >
              See the profile details
            </RequestCell>
          ) : (
            '-'
          )),
      },
      {
        Header: 'Access action',
        accessor: 'id',
        width: isNotebook1280 ? '13vw' : '15vw',
        Cell: ({
          row: {
            original: { id, approve },
          },
        }: ItemRowProps<RequestsType>) =>
          // eslint-disable-next-line no-nested-ternary
          (approve === null ? (
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
    [activeRequestId, handleDecline, handleProvide, isNotebook1280, 
      isProvided, onChangeSortingField, onToggleDirection, statusAnswer],
  );
};
