import React from 'react';

import { AdaptivePaginationTable } from 'components';
import { content } from './data';
import { useColumns } from './columns';

import styles from './styles.module.scss';

const RequestTab = () => {
  const columns = useColumns();
  
  return (
    <AdaptivePaginationTable
      columns={columns}
      content={content}
      mobileTitle1="Request date"
      mobileTitle2="Requester"
      key1="date"
      key2="requester"
      classNameTableContainer={styles.table}
    />
  );
};

export { RequestTab };
