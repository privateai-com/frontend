import { useState } from 'react';

import { Button, AdaptivePaginationTable, TextInput } from 'components';

import { routes } from 'appConstants';
import styles from './styles.module.scss';

import { content } from './data';
import { useColumns } from './columns';

export const ArticlesTab = () => {
  const [search, setSearch] = useState('');
  const columns = useColumns();

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
        <Button
          className={styles.upload}
          href={routes.uploadActivity.root}
        >
          <span className={styles.plus_icon} />
          Upload new file
        </Button>
      </div>
      <AdaptivePaginationTable
        columns={columns}
        content={content}
        mobileTitle1="Status"
        key1="status"
        mobileTitle2="Core entites"
        key2="core"
      />
    </>
  );
};
