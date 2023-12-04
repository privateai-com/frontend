import { Layout, ProtectedRoute } from 'components';
import { Header, Storage } from 'containers';
import { NextPage } from 'next';

const StoragePage: NextPage = () => (
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
      <Storage />
    </Layout>
  </ProtectedRoute>
);

export default StoragePage;
