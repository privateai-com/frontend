import { ArticlesTab } from './ArticlesTab';

export const storageTabs = [
  {
    key: 'articles',
    label: 'My articles',
    component: <ArticlesTab />,
  },
  {
    key: 'requested',
    label: 'Requested data',
    component: <div>123</div>,
  },
];
