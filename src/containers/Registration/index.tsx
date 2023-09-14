import { Button } from 'components';

import styles from './styles.module.scss';

export const Registration = () => (
  <div className={styles.create_project__container}>
    Registration
    <Button>Confirm</Button>
    <Button href="/">Confirm</Button>
    <Button theme="secondary">Confirm</Button>
    <Button href="/" theme="secondary">Confirm</Button>
  </div>
);
