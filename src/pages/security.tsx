import { Layout, ProtectedRoute } from 'components';
import { Header, Security } from 'containers';

import { NextPage } from 'next';

const SecurityPage: NextPage = () => (
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
      header={<Header />}
    >
      <Security />
    </Layout>
  </ProtectedRoute>
);

export default SecurityPage;
