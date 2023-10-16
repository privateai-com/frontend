import { chevronArrowIcons } from 'assets';
import { ButtonIcon } from 'components';

import styles from './styles.module.scss';

type TitleWithArrowsProps = {
  title: string;
  onClick: () => void;
};

const TitleWithArrows: React.FC<TitleWithArrowsProps> = ({ title, onClick }) => (
  <div className={styles.title_wrapper}>
    <span className={styles.title_title}>{title}</span>
    <ButtonIcon
      image={chevronArrowIcons}
      onClick={onClick}
    />
  </div>
);

export { TitleWithArrows };
