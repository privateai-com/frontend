import { Layout, ProtectedRoute } from 'components';
import { Header, ProfileApiKey } from 'containers';

import { NextPage } from 'next';

const ApiKeyPage: NextPage = () => (
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
      <ProfileApiKey />
    </Layout>
  </ProtectedRoute>
);

export default ApiKeyPage;
