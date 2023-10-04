import { ReactNode } from 'react';

import { Button } from 'components';
import styles from './styles.module.scss';
import { ModalWithLogo } from '../ModalWithLogo';

type CommonPasswordProps = {
  title?: string;
  text: string;
  children: ReactNode;
  onClose: () => void;
  onSubmit: () => void;
};

const CommonPassword: React.FC<CommonPasswordProps> = ({
  children,
  title,
  text,
  onSubmit,
  onClose,
}) => (
  <ModalWithLogo onClose={onClose}>
    <>
      {title && (<span className={styles.key_title}>{title}</span>)}
      <span className={styles.key_text}>{text}</span>
      <div className={styles.key_form}>{children}</div>
      <Button
        className={styles.key_btn}
        onClick={onSubmit}
      >
        Confirm
      </Button>
    </>
  </ModalWithLogo>
);

export { CommonPassword };
