import { AdaptivePaginationTable } from 'components';
import { content } from './data';
import { useColumns } from './columns';

export const ArticlesTab = () => {
  const columns = useColumns();

  return (
    <AdaptivePaginationTable
      columns={columns}
      content={content}
      mobileTitle1="Status"
      key1="status"
      mobileTitle2="Core entites"
      key2="core"
    />

  );
};
