import React, { useMemo } from 'react';
import Link from 'next/link';

import { ButtonIcon, RadioButtons } from 'components';
import { routes } from 'appConstants';
import { trashIcon } from 'assets';
import { ItemRowProps } from 'types';
import { TitleWithArrows } from 'components/AdaptivePaginationTable/TitleWithArrows';
import { ArticlesType } from './types';

import styles from './styles.module.scss';

export const useColumns = () => useMemo(() => ([
  {
    Header: <TitleWithArrows title="File name" onClick={() => {}} />,
    accessor: 'name',
    Cell: ({
      row: {
        original: { name },
      },
    }: ItemRowProps<ArticlesType>) => (
      name 
        ? <Link href={`${routes.storage.root}/${name}`}>{name}</Link> 
        : <div className={styles.empty_space}>-</div>
    ),
  },
  {
    Header: <TitleWithArrows title="Status" onClick={() => {}} />,
    accessor: 'status',
    Cell: ({
      row: {
        original: { status },
      },
    }: ItemRowProps<ArticlesType>) => (
      status 
        ? <p className={status === 'Published' ? styles.green_text : ''}>{status}</p>
        : '-'
    ),
  },
  {
    Header: 'Core entities',
    accessor: 'core',
    Cell: ({
      row: {
        original: { core },
      },
    }: ItemRowProps<ArticlesType>) => (
      core || '-'
    ),
  },
  {
    Header: <TitleWithArrows title="Availability" onClick={() => {}} />,
    accessor: 'availability',
    Cell: ({
      row: {
        original: { id },
      },
    }: ItemRowProps<ArticlesType>) => (
      id 
        ? (
          <RadioButtons
            containerClassName={styles.radio_buttons}
            options={[
              {
                value: '1',
                label: 'Open-sourced',
              },
              {
                value: '2',
                label: 'Permission-based',
              },
            ]}
            currentValue="1"
            onChange={() => {}}
          />
        ) : ('-')
    ),
  },
  {
    Header: () => null,
    accessor: 'delete',
    Cell: ({
      row: {
        original: { id },
      },
    }: ItemRowProps<ArticlesType>) => (
      id ? (
        <ButtonIcon
          image={trashIcon}
          onClick={() => {}}
        />
      ) : ('')
    ),
  },
]), []);
