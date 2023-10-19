import React, { useMemo } from 'react';
import Link from 'next/link';
import { useModal } from 'react-modal-hook';

import { ItemRowProps } from 'types';
import {
  ButtonIcon,
  KeyPassword,
  RequestCell,
  SetKeyPassword,
} from 'components';
import { TitleWithArrows } from 'components/AdaptivePaginationTable/TitleWithArrows';
import { routes } from 'appConstants';
import styles from './styles.module.scss';
import { RequestedDataType } from './types';
import { getStatusImg, getStatusStyle } from './utils';

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

  const [, hideSetKeyPassword] = useModal(
    () => (
      <SetKeyPassword
        onClose={hideSetKeyPassword}
        onSubmit={() => {
          showKeyPassword();
          hideSetKeyPassword();
        }}
        classNameModal={styles.modal_set_key_password}
      />
    ),
    [],
  );

  return useMemo(
    () => [
      {
        Header: (
          <TitleWithArrows
            title="File name"
            onClick={() => {}}
          />
        ),
        accessor: 'name',
        Cell: ({
          row: {
            original: { name },
          },
        }: ItemRowProps<RequestedDataType>) =>
          (name ? <Link href={`${routes.storage.root}/${name}`}>{name}</Link> : '-'),
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
        Header: (
          <TitleWithArrows
            title="Owner"
            onClick={() => {}}
          />
        ),
        accessor: 'owner',
        Cell: ({
          row: {
            original: { owner },
          },
        }: ItemRowProps<RequestedDataType>) =>
          <RequestCell>{owner}</RequestCell> || '-',
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({
          row: {
            original: { status },
          },
        }: ItemRowProps<RequestedDataType>) =>
          (status ? (
            <div className={styles.columns_owner_block}>
              <div className={styles.mock} />
              <div className={getStatusStyle(status, styles)}>{status}</div>
              <ButtonIcon
                className={styles.columns_img}
                image={getStatusImg(status)}
                onClick={() => {}}
              />
            </div>
          ) : (
            '-'
          )),
      },
    ],
    [],
  );
};
