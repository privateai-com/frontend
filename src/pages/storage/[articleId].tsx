import { NextPage } from 'next';

import { Layout, ProtectedRoute } from 'components';
import { Header, StorageFile } from 'containers';

const StorageFilePage: NextPage = () => (
  <ProtectedRoute>
    <Layout
      meta={{
        name: 'description',
        content: 'description',
      }}
      link={{
        rel: 'icon',
        href: '/favicon.ico',
      }}
      header={(<Header />)}
    >
      <StorageFile />
    </Layout>
  </ProtectedRoute>
);

export default StorageFilePage;
