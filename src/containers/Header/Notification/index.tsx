import {
  memo,
} from 'react';
import cx from 'classnames';
import styles from './styles.module.scss';

type ModalProps = {
  children: React.ReactNode,
  isOpen: boolean,
};

const Notification = memo(({ children, isOpen }: ModalProps) => (
  <div
    className={cx(
      styles.notification_container,
      isOpen ? styles.visible : styles.hidden
    )}
  >
    {children}
  </div>
));

export { Notification };
