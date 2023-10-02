import { Layout } from 'components';
import { Header, StorageFile } from 'containers';
import { NextPage } from 'next';

const StoragePage: NextPage = () => (
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

export default StoragePage;
