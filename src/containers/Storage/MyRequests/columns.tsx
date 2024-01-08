import React, { useCallback, useMemo, useState } from 'react';
import Link from 'next/link';
import { useModal } from 'react-modal-hook';
import { useDispatch, useSelector } from 'react-redux';

import { ItemRowProps, RequestStatus } from 'types';
import {
  ButtonIcon,
  KeyPassword,
  SetKeyPassword,
} from 'components';
import { RequestCell } from 'containers';
import { TitleWithArrows } from 'components/AdaptivePaginationTable/TitleWithArrows';
import { queryTab, routes } from 'appConstants';
import { requestDelete, requestDownload } from 'store/request/actionCreators';
import { RequestActionTypes } from 'store/request/actionsTypes';
import { requestSelectors } from 'store/request/selectors';
import { RequestedDataType } from './types';
import { getStatusImg, getStatusStyle } from './utils';

import styles from './styles.module.scss';

export const useColumns = ({
  onChangeSortingField, onToggleDirection, 
}: {
  onChangeSortingField: (field: string) => void,
  onToggleDirection: () => void,
}) => {
  const dispatch = useDispatch();
  const [selectedId, setSelectedId] = useState(0);
  const [selectedArticleId, setSelectedArticleId] = useState(0);

  const statusDelete = useSelector(requestSelectors.getStatus(RequestActionTypes.Delete));
  const statusDownload = useSelector(requestSelectors.getStatus(RequestActionTypes.Download));

  const handleDeleteRequest = useCallback((requestId: number) => () => {
    setSelectedId(requestId);
    dispatch(requestDelete({
      requestId,
    }));
  }, [dispatch]);

  const handleDownloadRequest = useCallback((articleId: number) => () => {
    setSelectedArticleId(articleId);
    dispatch(requestDownload({
      articleId,
    }));
  }, [dispatch]);
  
  const [showKeyPassword, hideKeyPassword] = useModal(
    () => (
      <KeyPassword
        onClose={hideKeyPassword}
        onSubmit={() => {}}
        classNameModal={styles.modal_key_password}
      />
    ),
    [],
  );

  const [, hideSetKeyPassword] = useModal(
    () => (
      <SetKeyPassword
        onClose={hideSetKeyPassword}
        onSubmit={() => {
          showKeyPassword();
          hideSetKeyPassword();
        }}
        classNameModal={styles.modal_set_key_password}
      />
    ),
    [],
  );

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
          />
        ),
        accessor: 'title',
        Cell: ({
          row: {
            original: { title, articleId },
          },
        }: ItemRowProps<RequestedDataType>) =>
          (title ? <Link className={styles.link} href={`${routes.storage.root}/${articleId}?storageTab=${queryTab.storageRequestedData}`}>
            <svg xmlns="http://www.w3.org/2000/svg" style={{minWidth: 21}} width="18" height="21" viewBox="0 0 18 21" fill="none">
              <path d="M15.714 5.08998C16.3476 5.67521 16.6644 5.96783 16.8322 6.35121C17 6.7346 17 7.16587 17 8.02842L17 16C17 17.8856 17 18.8284 16.4142 19.4142C15.8284 20 14.8856 20 13 20H5C3.11438 20 2.17157 20 1.58579 19.4142C1 18.8284 1 17.8856 1 16L1 5C1 3.11438 1 2.17157 1.58579 1.58579C2.17157 1 3.11438 1 5 1H9.72111C10.4941 1 10.8806 1 11.232 1.13742C11.5833 1.27483 11.8672 1.53708 12.4351 2.06157L15.714 5.08998Z" stroke="#BDC5DC" strokeWidth="2" strokeLinejoin="round"/>
            </svg>
            <span>
            {title}
            </span>
          
            </Link> : '-'),
      },
      {
        Header: 'Core entities',
        accessor: 'core',
        Cell: ({
          row: {
            original: { core },
          },
        }: ItemRowProps<RequestedDataType>) => core ?? '-',
      },
      {
        Header: (
          <TitleWithArrows
            title="Owner"
            onClick={() => {
              onChangeSortingField('owner.username');
              onToggleDirection();
            }}
          />
        ),
        accessor: 'owner',
        Cell: ({
          row: {
            original: { owner, ownerId },
            index,
          },
        }: ItemRowProps<RequestedDataType>) =>
          <RequestCell
            isHideButtonsRequester
            profileId={ownerId}
            titleModal="Owner"
            id={index}
          >
            {owner}
          </RequestCell> || '-',
      },
      {
        Header: (
          <TitleWithArrows
            title="Status"
            onClick={() => {
              onChangeSortingField('approve');
              onToggleDirection();
            }}
          />
        ),
        accessor: 'status',
        Cell: ({
          row: {
            original: { status, id, articleId },
          },
        }: ItemRowProps<RequestedDataType>) =>
          (status ? (
            <div className={styles.ownerBlock}>
              {/* <div className={styles.mock} /> */}
              <div className={getStatusStyle(status, styles)}>{status}</div>
              <ButtonIcon
                className={styles.columns_img}
                image={getStatusImg(status)}
                onClick={status === 'Access granted' 
                  ? handleDownloadRequest(articleId) 
                  : handleDeleteRequest(id)}
                isDisabled={
                  (selectedId === id && statusDelete === RequestStatus.REQUEST)
                  || (selectedArticleId === articleId && statusDownload === RequestStatus.REQUEST)
                }
              />
            </div>
          ) : (
            '-'
          )),
      },
    ],
    [handleDeleteRequest, handleDownloadRequest, onChangeSortingField, 
      onToggleDirection, selectedArticleId, selectedId, statusDelete, statusDownload],
  );
};
