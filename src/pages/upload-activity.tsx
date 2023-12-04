import { Layout, ProtectedRoute } from 'components';
import { Header, Upload } from 'containers';
import { NextPage } from 'next';

const UploadActivityPage: NextPage = () => (
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
      <Upload />
    </Layout>
  </ProtectedRoute>
);

export default UploadActivityPage;
