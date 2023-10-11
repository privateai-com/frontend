import { Layout } from 'components';
import { Header, StorageFile } from 'containers';
import { NextPage } from 'next';

const StorageFilePage: NextPage = () => (
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
    <StorageFile />
  </Layout>
);

export default StorageFilePage;
