import React, { useMemo } from 'react';

import Link from 'next/link';
import { ItemRowProps } from 'types';
import { TitleWithArrows } from 'components/AdaptivePaginationTable/TitleWithArrows';
import styles from './styles.module.scss';
import { RequestedDataType } from './types';

export const useColumns = () =>
  useMemo(
    () => [
      {
        Header: <TitleWithArrows title="File name" onClick={() => {}} />,
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
        Header: <TitleWithArrows title="Owner" onClick={() => {}} />,
        accessor: 'owner',
        Cell: ({
          row: {
            original: { owner },
          },
        }: ItemRowProps<RequestedDataType>) => owner || '-',
      },
    ],
    [],
  );
