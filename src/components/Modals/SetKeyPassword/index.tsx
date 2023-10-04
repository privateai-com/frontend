import { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import Link from 'next/link';
import Image from 'next/image';

import { helpCircleIcon } from 'assets';
import { TextInput } from 'components';
import { routes } from 'appConstants';
import { CommonPassword } from '../CommonPassword';

import styles from './styles.module.scss';

const tooltipId = 'SetKeyPassword';

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
          <Image
            src={helpCircleIcon}
            alt="help"
            data-tooltip-id={tooltipId}
          />
          <Tooltip
            id={tooltipId}
            place="right"
            className={styles.tooltip}
            openOnClick
            clickable
          >
            <>
              {`This password will serve as an additional layer of security,
                  ensuring that only you can access your encrypted data. Please
                  choose a strong and memorable password that is different from
                  the one you will use for signing in. For more information,
                  visit the `}

              <Link href={routes.security.root} target="_blank">“Security” page.</Link>
            </>
          </Tooltip>
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
