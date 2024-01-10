import cx from 'classnames';
import styles from './styles.module.scss';

export const MenuBtn = ({ callBack }) => (
  <>
    
    <button 
      className={cx(styles.burger)}
      onClick={callBack}
    >
      <div className={styles.bar} />
      <div className={styles.bar} />
      <div className={styles.bar} />
    </button>
    {/* <Button onClick={callBack}>Menu</Button> */}
  </>
);
