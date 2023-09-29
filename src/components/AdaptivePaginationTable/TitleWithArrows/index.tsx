import Image from 'next/image';
import styles from './styles.module.scss';

import { chevronArrowIcons } from 'assets';

type TitleWithArrowsProps = {
  title: string;
};

const TitleWithArrows: React.FC<TitleWithArrowsProps> = ({ title }) => {
  return (
    <div className={styles.title_wrapper}>
      <span className={styles.title_title}>{title}</span>
      <Image
        src={chevronArrowIcons}
        alt="icon"
      />
    </div>
  );
};

export { TitleWithArrows };
