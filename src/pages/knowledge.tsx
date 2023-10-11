import { Layout } from 'components';
import { Header, KnowledgeBase } from 'containers';
import { NextPage } from 'next';

const KnowledgeBasePage: NextPage = () => (
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
);

export default KnowledgeBasePage;
