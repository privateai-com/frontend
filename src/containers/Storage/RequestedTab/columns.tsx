import React, { useMemo } from 'react';

import Link from 'next/link';
import { ItemRowProps } from 'types';
import { RequestCell } from 'components';
import styles from './styles.module.scss';
import { RequestedDataType } from './types';

export const useColumns = () =>
  useMemo(
    () => [
      {
        Header: 'File name',
        accessor: 'name',
        Cell: ({
          row: {
            original: { name },
          },
        }: ItemRowProps<RequestedDataType>) =>
          (name ? <Link href="/#">{name}</Link> : '-'),
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
        Header: 'Owner',
        accessor: 'owner',
        Cell: ({
          row: {
            original: { owner },
          },
        }: ItemRowProps<RequestedDataType>) => <RequestCell>{owner}</RequestCell> || '-',
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({
          row: {
            original: { status },
          },
        }: ItemRowProps<RequestedDataType>) => status || '-',
      },
    ],
    [],
  );
