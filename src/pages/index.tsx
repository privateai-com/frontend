import { Layout } from 'components';
import { Header, Requests } from 'containers';
import { NextPage } from 'next';

const MainPage: NextPage = () => (
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
    {/* <Profile/> */}
    <Requests />
  </Layout>
);

export default MainPage;
