import { ReactNode, useState } from 'react';

import { AdaptivePaginationTable, TextInput } from 'components';

import { Content } from 'types';
import styles from './styles.module.scss';

type CommonProps = {
  columns: object[];
  content: Content[];
  mobileTitle1: string;
  key1: string;
  mobileTitle2: string;
  key2: string;
  children?: ReactNode;
  withPagination?: boolean;
};

const Common: React.FC<CommonProps> = ({
  columns,
  content,
  mobileTitle1,
  key1,
  mobileTitle2,
  key2,
  children,
  withPagination,
}) => {
  const [search, setSearch] = useState('');

  return (
    <>
      <div className={styles.storage__search}>
        <TextInput
          value={search}
          onChangeValue={setSearch}
          placeholder="Search by file name"
          isSearch
          classNameInputBox={styles.input}
        />
        {children}
      </div>
      <AdaptivePaginationTable
        columns={columns}
        content={content}
        mobileTitle1={mobileTitle1}
        key1={key1}
        mobileTitle2={mobileTitle2}
        key2={key2}
        withPagination={withPagination}
      />
    </>
  );
};

export { Common };
