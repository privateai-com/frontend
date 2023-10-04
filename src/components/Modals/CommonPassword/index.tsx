import { ReactNode } from 'react';

import Image from 'next/image';
import { logoIcon } from 'assets';
import { Button } from 'components';
import { ModalBase } from '../ModalBase';
import styles from './styles.module.scss';

type CommonPasswordProps = {
  title?: string;
  text: string;
  children: ReactNode;
  onSubmit: () => void;
};

const CommonPassword: React.FC<CommonPasswordProps> = ({
  children,
  title,
  text,
  onSubmit,
}) => (
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
        <span className={styles.key_title}>{title}</span>
        <span className={styles.key_text}>{text}</span>
        <div className={styles.key_form}>{children}</div>
        <Button
          className={styles.key_btn}
          onClick={onSubmit}
        >
          Confirm
        </Button>
      </div>
    </div>
  </ModalBase>
);

export { CommonPassword };
