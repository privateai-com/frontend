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
        // isNotebook1280 ? '18%': '25%',
        accessor: 'name',
        Cell: ({
          row: {
            original: { title, articleId },
          },
        }: ItemRowProps<RequestsType>) =>
          (title ? (
            <Link className={styles.link} href={`${routes.storage.root}/${articleId}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="21" viewBox="0 0 18 21" fill="none"><path d="M15.714 5.08998C16.3476 5.67521 16.6644 5.96783 16.8322 6.35121C17 6.7346 17 7.16587 17 8.02842L17 16C17 17.8856 17 18.8284 16.4142 19.4142C15.8284 20 14.8856 20 13 20H5C3.11438 20 2.17157 20 1.58579 19.4142C1 18.8284 1 17.8856 1 16L1 5C1 3.11438 1 2.17157 1.58579 1.58579C2.17157 1 3.11438 1 5 1H9.72111C10.4941 1 10.8806 1 11.232 1.13742C11.5833 1.27483 11.8672 1.53708 12.4351 2.06157L15.714 5.08998Z" stroke="#BDC5DC" strokeWidth="2" strokeLinejoin="round" /></svg>
              <span>
                {title}
              </span>
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
              // requester={requester}
              profileId={requesterId}
              onConfirmButton={handleProvide(id)}
              onCancelButton={handleDecline(id)}
              isHideButtonsRequester={!!approve}
              id={index}
            >
              {requester}
            </RequestCell>
          ) : (
            '-'
          )),
      },
      {
        Header: 'Access action',
        accessor: 'id',
        // width: isNotebook1280 ? '13vw' : '15vw',
        Cell: ({
          row: {
            original: { id, approve },
          },
        }: ItemRowProps<RequestsType>) =>
          // eslint-disable-next-line no-nested-ternary
          (approve === null ? (
            <div className={styles.table_block_btn}>
              <Button
                theme="primary"
                onClick={handleProvide(id)}
                isLoading={
                  statusAnswer === RequestStatus.REQUEST 
                  && id === activeRequestId 
                  && isProvided === true
                }
              >
                Grant access
              </Button>
              <Button
                theme="secondary"
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
            <div className={styles.td5_status}>
              {approve === true ? 'Provided' : 'Declined'}
            </div>
            
          ),
      },
    ],
    [activeRequestId, handleDecline, handleProvide, isNotebook1280, 
      isProvided, onChangeSortingField, onToggleDirection, statusAnswer],
  );
};
