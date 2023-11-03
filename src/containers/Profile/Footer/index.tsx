import cx from 'classnames';

import styles from './styles.module.scss';

type FooterProps = {
  isEditProfile: boolean;
};

export const Footer: React.FC<FooterProps> = ({ isEditProfile }) => (
  <div className={styles.footer}>
    <ul
      className={cx(styles.footer_list, {
        [styles.footer_list_edit]: isEditProfile,
      })}
    >
      <li>
        <span>*</span>
        Data owners like to see who they share their data with. Fill in as
        much information as you can to maximize your chances of being granted
        data access upon request.
      </li>
      <li>
        <span>*</span>
        Publishing to Archon requires full user information.
      </li>
    </ul>
  </div>
);
