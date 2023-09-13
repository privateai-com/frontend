import { Layout } from 'components';
import { Registration, Header } from 'containers';
import { NextPage } from 'next';

const Landing: NextPage = () => (
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
    <Registration />
  </Layout>
);

export default Landing;
