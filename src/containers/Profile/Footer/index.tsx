import cx from 'classnames';

import styles from './styles.module.scss';

type FooterProps = {
  className?: string;
  isEditProfile: boolean;
};

export const Footer: React.FC<FooterProps> = ({ isEditProfile, className = '' }) => (
  <div className={cx(styles.footer, className)}>
    <span className={styles.bigStar}>
      <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path id="*" d="M2.646 6.85294L0 5.92894L0.714 4.08094L3.276 4.96294C4.788 5.46694 5.712 5.92894 6.636 6.51694C6.384 5.46694 6.258 4.41694 6.258 2.90494V0.0909424H8.232V2.90494C8.232 4.41694 8.064 5.50894 7.854 6.51694C8.778 5.97094 9.66 5.46694 11.13 4.96294L13.692 4.03894L14.49 5.92894L11.802 6.85294C10.374 7.35694 9.24 7.60894 8.274 7.73494C9.114 8.49094 9.702 9.20494 10.626 10.5069L12.18 12.7749L10.542 13.9089L8.946 11.6829C8.064 10.4229 7.56 9.41494 7.182 8.49094C6.888 9.45694 6.426 10.3809 5.502 11.6829L3.864 13.9089L2.226 12.7749L3.78 10.5069C4.662 9.20494 5.418 8.44894 6.174 7.73494C4.914 7.56694 3.864 7.31494 2.646 6.85294Z" fill="#7C859E" fillOpacity="0.5" />
      </svg>

    </span>
    <ul
      className={cx(styles.footer_list, {
        [styles.footer_list_edit]: isEditProfile,
      })}
    >
      <li>
        {/* <span>*</span> */}
        Data owners like to see who they share their data with. Fill in as
        much information as you can to maximize your chances of being granted
        data access upon request.
      </li>
      <li>
        {/* <span>*</span> */}
        Publishing to Archon requires full user information.
      </li>
    </ul>
  </div>
);
