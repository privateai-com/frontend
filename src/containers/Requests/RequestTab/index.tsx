import { AdaptivePaginationTable } from 'components';
import React from 'react';
import { content } from './data';
import { useColumns } from './columns';

const RequestTab = () => {
  const columns = useColumns();

  return (
    <div>
      <AdaptivePaginationTable
        columns={columns}
        content={content}
        mobileTitle1="Request date"
        mobileTitle2="Requester"
        key1="date"
        key2="requester"
      />
    </div>
  );
};

export { RequestTab };
