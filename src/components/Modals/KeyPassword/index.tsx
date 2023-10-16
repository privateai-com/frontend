import { TextInput } from 'components/TextInput';
import { useState } from 'react';
import { CommonPassword } from '../CommonPassword';
import styles from './styles.module.scss';

type KeyPasswordProps = {
  onClose: () => void;
  onSubmit: () => void;
  classNameModal?: string
};

const KeyPassword: React.FC<KeyPasswordProps> = ({ onClose, onSubmit, classNameModal }) => {
  const [keyPassword, setKeyPassword] = useState('');

  return (
    <CommonPassword
      text="Please enter your key password in order to decrypt the file you are attempting to download."
      onSubmit={onSubmit}
      onClose={onClose}
      classNameModal={classNameModal}
    >
      <div className={styles.key_block}>
        <div className={styles.key_label}>Key password</div>
        <div className={styles.key_input_block}>
          <TextInput
            classNameContainer={styles.key_input}
            isPassword
            value={keyPassword}
            onChangeValue={setKeyPassword}
          />
        </div>
      </div>
    </CommonPassword>
  );
};

export { KeyPassword };
