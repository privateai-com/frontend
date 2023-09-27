import { Layout } from 'components';
import { Header, Requests } from 'containers';
import { NextPage } from 'next';

const RequestsPage: NextPage = () => (
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
);

export default RequestsPage;
