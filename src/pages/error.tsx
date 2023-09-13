import { Layout } from 'components';
import { NextPage } from 'next';

const ErrorPage: NextPage = () => (
  <Layout
    title="Error 404"
    meta={{
      name: 'Error',
      content: 'Error',
    }}
    link={{
      rel: 'icon',
      href: '/favicon.ico',
    }}
  >
    <div>404 Not Found</div>
  </Layout>
);

export default ErrorPage;
