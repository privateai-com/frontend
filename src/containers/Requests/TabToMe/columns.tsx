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
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="21" viewBox="0 0 18 21" fill="none"><path d="M15.714 5.08998C16.3476 5.67521 16.6644 5.96783 16.8322 6.35121C17 6.7346 17 7.16587 17 8.02842L17 16C17 17.8856 17 18.8284 16.4142 19.4142C15.8284 20 14.8856 20 13 20H5C3.11438 20 2.17157 20 1.58579 19.4142C1 18.8284 1 17.8856 1 16L1 5C1 3.11438 1 2.17157 1.58579 1.58579C2.17157 1 3.11438 1 5 1H9.72111C10.4941 1 10.8806 1 11.232 1.13742C11.5833 1.27483 11.8672 1.53708 12.4351 2.06157L15.714 5.08998Z" stroke="#BDC5DC" strokeWidth="2" strokeLinejoin="round"></path></svg>
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
                className={styles.table_provide}
                onClick={handleProvide(id)}
                isLoading={
                  statusAnswer === RequestStatus.REQUEST 
                  && id === activeRequestId 
                  && isProvided === true
                }
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <g clip-path="url(#clip0_192_111)">
                  <path d="M9 12L11 14L15 10" stroke="#3AB393" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 12C3 13.1819 3.23279 14.3522 3.68508 15.4442C4.13738 16.5361 4.80031 17.5282 5.63604 18.364C6.47177 19.1997 7.46392 19.8626 8.55585 20.3149C9.64778 20.7672 10.8181 21 12 21C13.1819 21 14.3522 20.7672 15.4442 20.3149C16.5361 19.8626 17.5282 19.1997 18.364 18.364C19.1997 17.5282 19.8626 16.5361 20.3149 15.4442C20.7672 14.3522 21 13.1819 21 12C21 10.8181 20.7672 9.64778 20.3149 8.55585C19.8626 7.46392 19.1997 6.47177 18.364 5.63604C17.5282 4.80031 16.5361 4.13738 15.4442 3.68508C14.3522 3.23279 13.1819 3 12 3C10.8181 3 9.64778 3.23279 8.55585 3.68508C7.46392 4.13738 6.47177 4.80031 5.63604 5.63604C4.80031 6.47177 4.13738 7.46392 3.68508 8.55585C3.23279 9.64778 3 10.8181 3 12Z" stroke="#3AB393" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>
                  <defs>
                  <clipPath id="clip0_192_111">
                  <rect width="24" height="24" fill="white"/>
                  </clipPath>
                  </defs>
                </svg>
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
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <g clip-path="url(#clip0_4066_3027)">
                  <path d="M3 12C3 13.1819 3.23279 14.3522 3.68508 15.4442C4.13738 16.5361 4.80031 17.5282 5.63604 18.364C6.47177 19.1997 7.46392 19.8626 8.55585 20.3149C9.64778 20.7672 10.8181 21 12 21C13.1819 21 14.3522 20.7672 15.4442 20.3149C16.5361 19.8626 17.5282 19.1997 18.364 18.364C19.1997 17.5282 19.8626 16.5361 20.3149 15.4442C20.7672 14.3522 21 13.1819 21 12C21 10.8181 20.7672 9.64778 20.3149 8.55585C19.8626 7.46392 19.1997 6.47177 18.364 5.63604C17.5282 4.80031 16.5361 4.13738 15.4442 3.68508C14.3522 3.23279 13.1819 3 12 3C10.8181 3 9.64778 3.23279 8.55585 3.68508C7.46392 4.13738 6.47177 4.80031 5.63604 5.63604C4.80031 6.47177 4.13738 7.46392 3.68508 8.55585C3.23279 9.64778 3 10.8181 3 12Z" stroke="#FF0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 9L15 15" stroke="#FF0000" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M15 9L9 15" stroke="#FF0000" strokeWidth="2" strokeLinecap="round"/>
                  </g>
                  <defs>
                  <clipPath id="clip0_4066_3027">
                  <rect width="24" height="24" fill="white"/>
                  </clipPath>
                  </defs>
                </svg>
                {/* Decline */}
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
