import { Layout, ProtectedRoute } from 'components';
import { Header, KnowledgeBase } from 'containers';
import { NextPage } from 'next';

const KnowledgeBasePage: NextPage = () => (
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
      <KnowledgeBase />
    </Layout>
  </ProtectedRoute>
);

export default KnowledgeBasePage;
