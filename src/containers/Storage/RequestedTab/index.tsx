import { Common } from '../Common';
import { useColumns } from './columns';
import { data } from './data';

const RequestedTab = () => {
  const columns = useColumns();
  return (
    <Common
      columns={columns}
      content={data}
      mobileTitle1="Core entities"
      key1="core"
      mobileTitle2="Owner"
      key2="owner"
    />
  );
};

export { RequestedTab };
