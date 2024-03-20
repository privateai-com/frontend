import { LayoutAuth, ProtectedRoute } from 'components';
import { Login } from 'containers';
import { NextPage } from 'next';

const LoginPage: NextPage = () => (
  <ProtectedRoute>
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
  </ProtectedRoute>
);

export default LoginPage;
