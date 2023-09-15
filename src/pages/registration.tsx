import { LayoutAuth } from 'components';
import { Registration } from 'containers';
import { NextPage } from 'next';

const RegistrationPage: NextPage = () => (
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
    <Registration />
  </LayoutAuth>
);

export default RegistrationPage;
