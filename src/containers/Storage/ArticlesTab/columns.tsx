import React, { useMemo } from 'react';

import Link from 'next/link';
import { ButtonIcon, RadioButtons } from 'components';
import { trashIcon } from 'assets';
import { ArticlesRowProps, ArticlesType } from './types';
import styles from './styles.module.scss';

export const useColumns = () => useMemo(() => ([
  {
    Header: 'File name',
    accessor: 'name',
    Cell: ({
      row: {
        original: { name },
      },
    }: ArticlesRowProps<ArticlesType>) => (
      name 
        ? <Link href="/#">{name}</Link> 
        : <div className={styles.empty_space}>-</div>
    ),
  },
  {
    Header: 'Status',
    accessor: 'status',
    Cell: ({
      row: {
        original: { status },
      },
    }: ArticlesRowProps<ArticlesType>) => (
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
    }: ArticlesRowProps<ArticlesType>) => (
      core || '-'
    ),
  },
  {
    Header: 'Availability',
    accessor: 'availability',
    Cell: ({
      row: {
        original: { id },
      },
    }: ArticlesRowProps<ArticlesType>) => (
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
    }: ArticlesRowProps<ArticlesType>) => (
      id ? (
        <ButtonIcon
          image={trashIcon}
          onClick={() => {}}
        />
      ) : ('')
    ),
  },
]), []);
