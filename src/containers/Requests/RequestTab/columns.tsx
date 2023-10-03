import { useMemo } from 'react';

import Link from 'next/link';
import { Button, RequestCell } from 'components';
import { ItemRowProps } from 'types';
import { routes } from 'appConstants';
import { TitleWithArrows } from 'components/AdaptivePaginationTable/TitleWithArrows';
import styles from './styles.module.scss';
import { RequestsType } from './types';

export const useColumns = () =>
  useMemo(
    () => [
      {
        Header: <TitleWithArrows title="File name" />,
        accessor: 'name',
        Cell: ({
          row: {
            original: { name },
          },
        }: ItemRowProps<RequestsType>) =>
          (name ? (
            <Link href={`${routes.storage.root}/${name}`}>{name}</Link>
          ) : (
            '-'
          )),
      },
      {
        Header: <TitleWithArrows title="Request date" />,
        accessor: 'date',
        Cell: ({
          row: {
            original: { date },
          },
        }: ItemRowProps<RequestsType>) => date || '-',
      },
      {
        Header: <TitleWithArrows title="Requestor" />,
        accessor: 'requestor',
        Cell: ({
          row: {
            original: { requester },
          },
        }: ItemRowProps<RequestsType>) =>
          (requester ? (
            <RequestCell requester={requester}>
              See the profile details
            </RequestCell>
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
