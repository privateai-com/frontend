import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';

import { ConfirmEmail } from 'components';
import { routes } from 'appConstants';
import { CreateAccount } from './CreateAccount';

import styles from './styles.module.scss';

export const Registration = () => {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const onConfirmEmail = useCallback(() => {
    router.push({
      pathname: routes.home.root,
      query: { showModal: 'true' },
    });
  }, [router]);

  return (
    <div className={styles.registration__container}>
      {email ? (
        <ConfirmEmail
          email={email}
          onConfirm={onConfirmEmail}
        />
      ) : (
        <CreateAccount
          onConfirmEmail={setEmail}
        />
      )}
    </div>
  );
};
