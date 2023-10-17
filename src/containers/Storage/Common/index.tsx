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
  inputClassName?: string;
  classNameTableContainer?: string;
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
  inputClassName,
  classNameTableContainer,
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
          classNameContainer={inputClassName}
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
        classNameTableContainer={classNameTableContainer}
      />
    </>
  );
};

export { Common };
