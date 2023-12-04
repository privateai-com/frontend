import { Layout, ProtectedRoute } from 'components';
import { Header, Requests } from 'containers';
import { NextPage } from 'next';

const RequestsPage: NextPage = () => (
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
      <Requests />
    </Layout>
  </ProtectedRoute>
);

export default RequestsPage;
