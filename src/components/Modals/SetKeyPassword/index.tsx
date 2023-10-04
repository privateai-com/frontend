import { useState } from 'react';

import { Help, TextInput } from 'components';
import Link from 'next/link';
import { routes } from 'appConstants';
import styles from './styles.module.scss';
import { CommonPassword } from '../CommonPassword';

const SetKeyPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  return (
    <CommonPassword
      title="Set a key password"
      text="Set a key password in order to upload or download the files. Please fill out the fields below."
      onSubmit={() => {}}
    >
      <div className={styles.key_block}>
        <div className={styles.key_label}>Password</div>
        <div className={styles.key_input_block}>
          <TextInput
            classNameContainer={styles.key_input}
            isPassword
            value={password}
            onChangeValue={setPassword}
          />
          <Help>
            {`This password will serve as an additional layer of security,
                  ensuring that only you can access your encrypted data. Please
                  choose a strong and memorable password that is different from
                  the one you will use for signing in. For more information,
                  visit the `}

            <Link href={routes.security.root}>“Security” page.</Link>
          </Help>
        </div>
      </div>
      <div className={styles.key_block}>
        <div className={styles.key_label}>Confirm key password</div>
        <div className={styles.key_input_block}>
          <TextInput
            classNameContainer={styles.key_input}
            isPassword
            value={confirmPassword}
            onChangeValue={setConfirmPassword}
          />
          <div className={styles.mock} />
        </div>
      </div>
    </CommonPassword>
  );
};

export { SetKeyPassword };
