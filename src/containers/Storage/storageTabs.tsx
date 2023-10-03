import { ArticlesTab } from './ArticlesTab';
import { RequestedData } from './RequestedData';

export const storageTabs = [
  {
    key: 'articles',
    label: 'My articles',
    component: <ArticlesTab />,
  },
  {
    key: 'requested',
    label: 'Requested data',
    component: <RequestedData />,
  },
];
