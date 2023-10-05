import { ArticlesTab } from './ArticlesTab';
import { RequestedTab } from './RequestedTab';

export const storageTabs = [
  {
    key: 'articles',
    label: 'My articles',
    component: <ArticlesTab />,
  },
  {
    key: 'requested',
    label: 'Requested data',
    component: <RequestedTab />,
  },
];
