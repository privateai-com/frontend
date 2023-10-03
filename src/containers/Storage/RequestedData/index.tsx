import { CommmonTab } from '../CommonTab';
import { useColumns } from './columns';
import { content } from './data';

const RequestedData = () => {
  const columns = useColumns();
  return (
    <CommmonTab
      columns={columns}
      content={content}
      mobileTitle1="Core entities"
      key1="core"
      mobileTitle2="Owner"
      key2="owner"
      withPagination
    />
  );
};

export { RequestedData };
