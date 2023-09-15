import { useState } from 'react';

import { TextInput } from 'components';

import styles from './styles.module.scss';

export const CreateAccount = () => {
  const [email, setEmail] = useState('');
  return (
    <div className={styles.createAccount__container}>
      CreateAccount
      <TextInput
        value={email}
        onChangeValue={setEmail}
      />
    </div>
  );
};
