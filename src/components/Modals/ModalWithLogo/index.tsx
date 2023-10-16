import Image from 'next/image';
import { logoIcon } from 'assets';
import { ReactNode } from 'react';
import styles from './styles.module.scss';
import { ModalBase } from '../ModalBase';

type ModalWithLogoProps = {
  children: ReactNode;
  onClose: () => void;
  classNameModal?: string;
};

const ModalWithLogo: React.FC<ModalWithLogoProps> = ({ children, onClose, classNameModal }) => (
  <ModalBase
    closeModal={onClose}
    isWithCloseButton
    classNameModal={classNameModal}
  >
    <div className={styles.modal}>
      <div className={styles.modal_container}>
        <Image
          className={styles.modal_logo}
          src={logoIcon}
          alt="logo"
        />
        {children}
      </div>
    </div>
  </ModalBase>
);

export { ModalWithLogo };
