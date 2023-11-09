import { ArticlesTab } from './ArticlesTab';
import { MyRequests } from '../MyRequests';

export const storageTabs = [
  {
    key: 'articles',
    label: 'My articles',
    component: <ArticlesTab />,
  },
  {
    key: 'requested',
    label: 'Requested data',
    component: <MyRequests />,
  },
];
