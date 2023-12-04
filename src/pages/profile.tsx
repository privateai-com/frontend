import { Layout, ProtectedRoute } from 'components';
import { Header, Profile } from 'containers';

import { NextPage } from 'next';

const ProfilePage: NextPage = () => (
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
      header={(<Header />)}
    >
      <Profile />
    </Layout>
  </ProtectedRoute>
);

export default ProfilePage;
