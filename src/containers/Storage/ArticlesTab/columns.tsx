import React, { useMemo } from 'react';
import Link from 'next/link';

import { routes } from 'appConstants';
import { Article, ItemRowProps } from 'types';
import { TitleWithArrows } from 'components/AdaptivePaginationTable/TitleWithArrows';
import { DeleteBtn } from './DeleteBtn';
import { ChangeAvailability } from './ChangeAvailability';
import { ArticlesType } from './types';

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
              {uploadStatus} 
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
        Cell: ({
          row: {
            original: { isPublic, id },
          },
        }: ItemRowProps<Article>) =>
          (id ? (
            <ChangeAvailability
              id={Number(id)}
              isPublic={isPublic}
            />
          ) : (
            '-'
          )),
      },
      {
        Header: () => null,
        accessor: 'delete',
        Cell: ({
          row: {
            original: { id },
          },
        }: ItemRowProps<ArticlesType>) =>
          (id ? <DeleteBtn id={Number(id)} /> : ''),
      },
    ],
    [onChangeSortingField, onToggleDirection],
  );
