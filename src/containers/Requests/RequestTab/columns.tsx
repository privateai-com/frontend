import React, { useMemo } from 'react';

import Link from 'next/link';
import { Button } from 'components';
import { ItemRowProps } from 'types';
import styles from './styles.module.scss';
import { RequestsType } from './types';

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
        }: ItemRowProps<RequestsType>) =>
          (name ? <Link href="/#">{name}</Link> : '-'),
      },
      {
        Header: 'Request date',
        accessor: 'date',
        Cell: ({
          row: {
            original: { date },
          },
        }: ItemRowProps<RequestsType>) => date || '-',
      },
      {
        Header: 'Requestor',
        accessor: 'requestor',
        Cell: ({
          row: {
            original: { requester },
          },
        }: ItemRowProps<RequestsType>) =>
          (requester ? (
            <>
              <span>{requester}</span>
              <Link href="/#">See the profile details</Link>
            </>
          ) : (
            '-'
          )),
      },
      {
        Header: 'Access action',
        accessor: 'id',
        Cell: ({
          row: {
            original: { id },
          },
        }: ItemRowProps<RequestsType>) =>
          (id ? (
            <div className={styles.table_block_btn}>
              <Button className={styles.table_provide}>Provide</Button>
              <Button
                theme="grey"
                className={styles.table_decline}
              >
                Decline
              </Button>
            </div>
          ) : (
            '-'
          )),
      },
    ],
    [],
  );
