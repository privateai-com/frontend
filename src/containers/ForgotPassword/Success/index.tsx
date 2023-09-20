import { FC } from 'react';

import {
  AuthWrapper,
  Button,
  Typography,
} from 'components';

import styles from './styles.module.scss';

interface SuccessProps {
  onConfirm: () => void;
}

export const Success: FC<SuccessProps> = ({
  onConfirm,
}) => (
  <AuthWrapper>
    <div className={styles.success__container}>
      <Typography
        type="p"
        className={styles.description}
      >
        The password from your account was 
        successfully restored, please sign in with new credentials.
      </Typography>
      <Button
        onClick={onConfirm}
        className={styles.button}
      >
        Proceed to sign in
      </Button>
    </div>
  </AuthWrapper>
);
