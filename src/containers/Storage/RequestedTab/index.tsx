import { Common } from '../Common';
import { useColumns } from './columns';
import { content } from './data';

const RequestedTab = () => {
  const columns = useColumns();
  return (
    <Common
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

export { RequestedTab };
