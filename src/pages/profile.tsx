import { Layout } from 'components';
import { Header, Profile } from 'containers';

import { NextPage } from 'next';

const ProfilePage: NextPage = () => (
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
    <Profile />
  </Layout>
);

export default ProfilePage;
