import React, { useMemo } from 'react';
import Link from 'next/link';
import { useModal } from 'react-modal-hook';

import { ItemRowProps } from 'types';
import { KeyPassword, RequestCell, SetKeyPassword } from 'components';
import styles from './styles.module.scss';
import { RequestedDataType } from './types';
import { TitleWithArrows } from 'components/AdaptivePaginationTable/TitleWithArrows';

export const useColumns = () => {
  const [showKeyPassword, hideKeyPassword] = useModal(
    () => (
      <KeyPassword
        onClose={hideKeyPassword}
        onSubmit={() => {}}
        classNameModal={styles.modal_key_password}
      />
    ),
    [],
  );

  const [showSetKeyPassword, hideSetKeyPassword] = useModal(
    () => (
      <SetKeyPassword
        onClose={hideSetKeyPassword}
        onSubmit={() => { showKeyPassword(); hideSetKeyPassword(); }}
        classNameModal={styles.modal_set_key_password}
      />
    ),
    [],
  );

  return useMemo(
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
};
