import React, { useMemo } from 'react';
import Link from 'next/link';

import { routes } from 'appConstants';
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
          (['Published', 'Uploaded'].includes(uploadStatus) ? (
            <Link
              href={`${routes.storage.root}/${id}`}
              className={styles.link}
            >
              {title}
            </Link>
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
                uploadStatus.toLowerCase() === 'published' ? styles.green_text : styles.status
              }
            >
              {uploadStatus} 
              {' '}
              {uploadStatus.toLowerCase() === 'processing' ? `- ${uploadProgress}%` : ''}
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
            original: { topCoreEntities, uploadStatus },
          },
        }: ItemRowProps<Article>) => (uploadStatus.toLowerCase() === 'error' ? '-' : topCoreEntities),
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
        width: '130px',
        minWidth: '130px',
        Cell: ({
          row: {
            original: { isPublic, id, uploadStatus },
          },
        }: ItemRowProps<Article>) =>
          (
            <div className={styles.availability} key={`div-${id}-${isPublic}`}>
              {uploadStatus.toLowerCase() !== 'error' && (
                <ChangeAvailability
                  key={`ChangeAvailability-${id}-${isPublic}`}
                  id={Number(id)}
                  isPublic={isPublic}
                />
              )}
              <DeleteBtn id={Number(id)} />
            </div>
          ),
      },
    ],
    [onChangeSortingField, onToggleDirection],
  );
