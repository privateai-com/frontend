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
import { routes } from 'appConstants';
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
          (title ? <Link href={`${routes.storage.root}/${articleId}`}>{title}</Link> : '-'),
      },
      {
        Header: 'Core entities',
        accessor: 'core',
        Cell: ({
          row: {
            original: { core },
          },
        }: ItemRowProps<RequestedDataType>) =>
          (core ? <p className={styles.columns_core}>{core}</p> : '-'),
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
          },
        }: ItemRowProps<RequestedDataType>) =>
          <RequestCell isHideButtonsRequester profileId={ownerId} titleModal="Owner">{owner}</RequestCell> || '-',
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
              <div className={styles.mock} />
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
