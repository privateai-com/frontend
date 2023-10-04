import { Layout } from 'components';
import { NotFound } from 'containers';
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
    <NotFound />
  </Layout>
);

export default ErrorPage;
