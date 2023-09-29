import { useMemo, useState } from 'react';

import Link from 'next/link';
import { Button, Requester } from 'components';
import { ItemRowProps } from 'types';
import { routes } from 'appConstants';
import styles from './styles.module.scss';
import { RequestsType } from './types';
import { Loader } from 'components/Loader';

type RequestCellProps = {
  requester: string;
};

const RequestCell: React.FC<RequestCellProps> = ({ requester }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onHandlerClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsOpen((state) => !state);
    }, 1500);
  };

  return (
    <>
      <span>{requester}</span>
      <div className={styles.table_block_btn}>
        {!isLoading ? (
          <button
            className={styles.table_btn_link}
            onClick={onHandlerClick}
          >
            See the profile details
          </button>
        ) : (
          <Loader />
        )}
      </div>
      {isOpen && (
        <Requester
          name="John Doe"
          contry="London, UK (GMT +0)"
          organization="London Institute of Medical Sciences, Head of neurosurgery laboratory"
          position="Head of neurosurgery laboratory"
          fields={'Neurobiology, neurosurgery, neuropathology'.split(', ')}
          socialMedia="https:/facebook.com/profile"
          avatar="https://www.figma.com/file/bknHsaOyZlzB3FrosPJ7Vx/ARCHON-(Copy)?type=design&node-id=526-4546&mode=design&t=cjGucjlcUhk4ouS0-4"
          onCloseModal={() => {
            setIsOpen(false);
          }}
        />
      )}
    </>
  );
};

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
          name ? (
            <Link href={`${routes.storage.root}/${name}`}>{name}</Link>
          ) : (
            '-'
          ),
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
          requester ? <RequestCell requester={requester} /> : '-',
      },
      {
        Header: 'Access action',
        accessor: 'id',
        Cell: ({
          row: {
            original: { id },
          },
        }: ItemRowProps<RequestsType>) =>
          id ? (
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
          ),
      },
    ],
    []
  );
