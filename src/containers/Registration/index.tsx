import { useState } from 'react';

import { ConfirmEmail } from 'components';
import { CreateAccount } from './CreateAccount';

import styles from './styles.module.scss';

export const Registration = () => {
  const [email, setEmail] = useState('');

  return (
    <div className={styles.registration__container}>
      {email ? (
        <ConfirmEmail email={email} />
      ) : (
        <CreateAccount
          onConfirmEmail={setEmail}
        />
      )}
    </div>
  );
};
