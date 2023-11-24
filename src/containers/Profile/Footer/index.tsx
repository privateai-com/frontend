import cx from 'classnames';

import styles from './styles.module.scss';

type FooterProps = {
  className?: string;
  isEditProfile: boolean;
};

export const Footer: React.FC<FooterProps> = ({ isEditProfile, className = '' }) => (
  <div className={cx(styles.footer, className)}>
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
