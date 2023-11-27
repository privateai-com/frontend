import React, { useMemo } from 'react';
import Link from 'next/link';

import { routes } from 'appConstants';
import { getStatusArticle } from 'utils';
import { Article, ItemRowProps } from 'types';
import { TitleWithArrows } from 'components/AdaptivePaginationTable/TitleWithArrows';
import { DeleteBtn } from './DeleteBtn';
import { ChangeAvailability } from './ChangeAvailability';

import styles from './styles.module.scss';

export const useColumns = ({
  onChangeSortingField, onToggleDirection, 
}: {
  onChangeSortingField: (field: string) => void,
  onToggleDirection: () => void,
}) =>
  useMemo(
    () => [
      {
        Header: (
          <TitleWithArrows
            title="File name"
            onClick={() => {
              onChangeSortingField('title');
              onToggleDirection();
            }}
          />
        ),
        // width: '20vw',
        accessor: 'title',
        Cell: ({
          row: {
            original: { id, title, uploadStatus },
          },
        }: ItemRowProps<Article>) =>
          (['published', 'complete'].includes(uploadStatus) ? (
            <Link href={`${routes.storage.root}/${id}`}>{title}</Link>
          ) : (
            <div className={styles.empty_space}>{title}</div>
          )),
      },
      {
        Header: (
          <TitleWithArrows
            title="Status"
            onClick={() => {
              onChangeSortingField('uploadStatus');
              onToggleDirection();
            }}
          />
        ),
        width: '90px',
        minWidth: '90px',
        accessor: 'status',
        Cell: ({
          row: {
            original: { uploadStatus, uploadProgress },
          },
        }: ItemRowProps<Article>) =>
          (uploadStatus ? (
            <p
              className={
                uploadStatus === 'published' ? styles.green_text : styles.status
              }
            >
              {getStatusArticle(uploadStatus)} 
              {' '}
              {uploadStatus === 'processing' ? `- ${uploadProgress}%` : ''}
            </p>
          ) : (
            '-'
          )),
      },
      {
        Header: 'Core entities',
        accessor: 'core',
        Cell: ({
          row: {
            original: { topCoreEntities },
          },
        }: ItemRowProps<Article>) => topCoreEntities ?? '-',
      },
      {
        Header: (
          <TitleWithArrows
            title="Availability"
            onClick={() => {
              onChangeSortingField('isPublic');
              onToggleDirection();
            }}
          />
        ),
        accessor: 'availability',
        width: '120px',
        minWidth: '120px',
        Cell: ({
          row: {
            original: { isPublic, id },
          },
        }: ItemRowProps<Article>) =>
          (
            <div className={styles.availability} key={`div-${id}-${isPublic}`}>
              <ChangeAvailability
                key={`ChangeAvailability-${id}-${isPublic}`}
                id={Number(id)}
                isPublic={isPublic}
              />
              <DeleteBtn id={Number(id)} />
            </div>
          ),
      },
    ],
    [onChangeSortingField, onToggleDirection],
  );
