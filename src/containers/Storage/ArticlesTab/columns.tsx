import React, { useMemo } from 'react';
import Link from 'next/link';

import { routes } from 'appConstants';
import { Article, ItemRowProps } from 'types';
import { listTitleGraphs } from 'utils';
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
            original: { title },
          },
        }: ItemRowProps<Article>) =>
          (title ? (
            <Link href={`${routes.storage.root}/${title}`}>{title}</Link>
          ) : (
            <div className={styles.empty_space}>-</div>
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
            original: { uploadStatus },
          },
        }: ItemRowProps<Article>) =>
          (uploadStatus ? (
            <p
              className={
                uploadStatus === 'Published' ? styles.green_text : styles.status
              }
            >
              {uploadStatus}
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
            original: { graphDraft, graph },
          },
        }: ItemRowProps<Article>) => (graph.length > 0 ? listTitleGraphs(graph) : listTitleGraphs(graphDraft)) || '-',
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
