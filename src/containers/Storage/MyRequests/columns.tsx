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
import cx from 'classnames'

import styles from './styles.module.scss';
import { MultiDrop } from 'components/MultiDrop';

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
          (title ? (
            <Link className={styles.link} href={`${routes.storage.root}/${articleId}?storageTab=${queryTab.storageRequestedData}`}>
              <svg xmlns="http://www.w3.org/2000/svg" style={{ minWidth: 21 }} width="18" height="21" viewBox="0 0 18 21" fill="none">
                <path d="M15.714 5.08998C16.3476 5.67521 16.6644 5.96783 16.8322 6.35121C17 6.7346 17 7.16587 17 8.02842L17 16C17 17.8856 17 18.8284 16.4142 19.4142C15.8284 20 14.8856 20 13 20H5C3.11438 20 2.17157 20 1.58579 19.4142C1 18.8284 1 17.8856 1 16L1 5C1 3.11438 1 2.17157 1.58579 1.58579C2.17157 1 3.11438 1 5 1H9.72111C10.4941 1 10.8806 1 11.232 1.13742C11.5833 1.27483 11.8672 1.53708 12.4351 2.06157L15.714 5.08998Z" stroke="#BDC5DC" strokeWidth="2" strokeLinejoin="round" />
              </svg>
              <span>
                {title}
              </span>
          
            </Link>
          ) : '-'),
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
              <div className={cx(styles.statusWrap,getStatusStyle(status, styles))}>
                {
                  status === 'Access granted' && <svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 12 16" fill="none">
                    <path d="M2.33594 15.9375C1.14844 15.9375 0.53125 15.3047 0.53125 14.0234V8.49219C0.53125 7.35938 1.02344 6.73438 1.96094 6.60938V4.75C1.96094 1.86719 3.86719 0.375 6 0.375C8.13281 0.375 10.0391 1.86719 10.0391 4.75V6.60938C10.9766 6.73438 11.4609 7.35938 11.4609 8.49219V14.0234C11.4609 15.3047 10.8438 15.9375 9.65625 15.9375H2.33594ZM3.42188 4.60938V6.58594H8.57812V4.60938C8.57812 2.78125 7.39062 1.78125 6 1.78125C4.60156 1.78125 3.42188 2.78125 3.42188 4.60938ZM2.5625 14.5391H9.4375C9.76562 14.5391 9.94531 14.3438 9.94531 13.9688V8.54688C9.94531 8.17188 9.76562 7.98438 9.4375 7.98438H2.5625C2.24219 7.98438 2.04688 8.17188 2.04688 8.54688V13.9688C2.04688 14.3438 2.24219 14.5391 2.5625 14.5391Z" fill="#3AB393"/>
                  </svg>
                }
                {
                  status === 'Access request pending' && <svg xmlns="http://www.w3.org/2000/svg" width="11" height="21" viewBox="0 0 11 21" fill="none">
                  <path d="M4.89844 19.875L3.625 18.7656C3.38281 18.5625 3.29688 18.2422 3.29688 17.9609V10.625C1.39062 9.77344 0.195312 7.89062 0.195312 5.78906C0.195312 2.85156 2.55469 0.5 5.49219 0.5C8.42969 0.5 10.7969 2.85938 10.7969 5.78906C10.7969 7.85938 9.60156 9.61719 7.48438 10.6719L9.03906 12.2344C9.375 12.5781 9.38281 13.1016 9.05469 13.4297L7.34375 15.1328L8.49219 16.2812C8.82812 16.6172 8.84375 17.1328 8.5 17.4766L6.09375 19.8906C5.75 20.2266 5.25781 20.1875 4.89844 19.875ZM5.49219 18.5L7.10938 16.8672L6.05469 15.8281V14.4219L7.65625 12.8438L6.15625 11.3438V9.65625C8.10938 9.21875 9.39062 7.63281 9.39062 5.78906C9.39062 3.63281 7.65625 1.89844 5.49219 1.89844C3.32812 1.89844 1.58594 3.64062 1.58594 5.78906C1.58594 7.65625 2.85938 9.21875 4.64844 9.60938V17.6562L5.49219 18.5ZM5.49219 5.58594C4.79688 5.58594 4.23438 5.01562 4.23438 4.3125C4.23438 3.61719 4.78906 3.05469 5.49219 3.05469C6.19531 3.05469 6.76562 3.61719 6.76562 4.3125C6.76562 5.01562 6.19531 5.58594 5.49219 5.58594Z" fill="#4659FE"/>
                  </svg>
                }

                {status === 'Access request pending' ? 'Waiting for access' : status}
              </div>

              {status === 'Access granted' && <MultiDrop 
                props={{
                  btnList : [
                    <button onClick={status === 'Access granted' 
                    ? handleDownloadRequest(articleId) 
                    : handleDeleteRequest(id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M3 12C3 4.5885 4.5885 3 12 3C19.4115 3 21 4.5885 21 12C21 19.4115 19.4115 21 12 21C4.5885 21 3 19.4115 3 12Z" stroke="#BDC2CF" stroke-width="2"/>
                        <path d="M12 15.5356L12 7.75739" stroke="#BDC2CF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M15.5355 12.7071L12.2322 16.0105C12.1039 16.1387 11.896 16.1387 11.7678 16.0104L8.46447 12.7071" stroke="#BDC2CF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      Download
                    </button>
                  ],
                  btnContent : '•••',
                }}
              />}
              {/* <ButtonIcon
                className={styles.columns_img}
                image={getStatusImg(status)}
                onClick={status === 'Access granted' 
                  ? handleDownloadRequest(articleId) 
                  : handleDeleteRequest(id)}
                isDisabled={
                  (selectedId === id && statusDelete === RequestStatus.REQUEST)
                  || (selectedArticleId === articleId && statusDownload === RequestStatus.REQUEST)
                }
              /> */}
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
