import { Layout } from 'components';
import { Header } from 'containers';
import { Security } from 'containers';
import { NextPage } from 'next';

const SecurityPage: NextPage = () => (
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
);

export default SecurityPage;
