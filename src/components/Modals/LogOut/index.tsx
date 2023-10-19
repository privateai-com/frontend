import { Button } from 'components/Button';
import { ModalWithLogo } from '../ModalWithLogo';
import styles from './styles.module.scss';

type LogOutProps = {
  onClose: () => void;
};

export const LogOut: React.FC<LogOutProps> = ({ onClose }) => {
  return (
    <ModalWithLogo onClose={onClose}>
      <div className={styles.logout}>
        <div className={styles.logout__title}>
          Are you sure you want to to sign out of your account?
        </div>
        <div className={styles.logout__btn_block}>
          <Button className={styles.logout__btn}>Confirm</Button>
          <Button
            className={styles.logout__btn}
            theme="secondary"
          >
            Cancel
          </Button>
        </div>
      </div>
    </ModalWithLogo>
  );
};
