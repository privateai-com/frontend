import { LayoutAuth } from 'components';
import { Login } from 'containers';
import { NextPage } from 'next';

const LoginPage: NextPage = () => (
  <LayoutAuth
    meta={{
      name: 'description',
      content: 'description',
    }}
    link={{
      rel: 'icon',
      href: '/favicon.ico',
    }}
  >
    <Login />
  </LayoutAuth>
);

export default LoginPage;
