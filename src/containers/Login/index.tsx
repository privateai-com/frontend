import { Signin } from './Signin';

import styles from './styles.module.scss';

export const Login = () => (
  <div className={styles.login__container}>
    <Signin onConfirm={() => {}} />
  </div>
);
