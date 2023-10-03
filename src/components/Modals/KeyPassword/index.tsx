import { useState } from 'react';

import Image from 'next/image';
import { logoIcon } from 'assets';
import { Button, Help, TextInput } from 'components';
import { ModalBase } from '../ModalBase';
import styles from './styles.module.scss';

const KeyPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  return (
    <ModalBase
      closeModal={() => {}}
      isWithCloseButton
    >
      <div className={styles.key}>
        <div className={styles.key_container}>
          <Image
            className={styles.key_logo}
            src={logoIcon}
            alt="logo"
          />
          <span className={styles.key_title}>Set a key password</span>
          <span className={styles.key_text}>
            Set a key password in order to upload or download the files. Please
            fill out the fields below.
          </span>
          <div className={styles.key_form}>
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
                  This password will serve as an additional layer of security,
                  ensuring that only you can access your encrypted data. Please
                  choose a strong and memorable password that is different from
                  the one you will use for signing in. For more information,
                  visit the “Security” page.
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
          </div>
          <Button
            className={styles.key_btn}
            onClick={() => {}}
          >
            Confirm
          </Button>
        </div>
      </div>
    </ModalBase>
  );
};

export { KeyPassword };
