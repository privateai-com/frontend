import React, { useMemo } from 'react';
import Link from 'next/link';
import { useModal } from 'react-modal-hook';

import { ItemRowProps } from 'types';
import { TitleWithArrows } from 'components/AdaptivePaginationTable/TitleWithArrows';
import {
  ButtonIcon,
  KeyPassword,
  RequestCell,
  SetKeyPassword, 
} from 'components';
import { arrowDownSquare } from 'assets';
import { RequestedDataType } from './types';

import styles from './styles.module.scss';

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
        }: ItemRowProps<RequestedDataType>) => (
          <div className={styles.columns_owner_block}>
            <div className={styles.mock} />
            <RequestCell>{owner || ''}</RequestCell>
            {owner && (
              <ButtonIcon
                className={styles.columns_img}
                image={arrowDownSquare}
                onClick={showSetKeyPassword}
              />
            )}
          </div>
        ),
      },
    ],
    [showSetKeyPassword],
  );
};
