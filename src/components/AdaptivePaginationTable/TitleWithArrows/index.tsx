import Image from 'next/image';
import { chevronArrowIcons } from 'assets';
import styles from './styles.module.scss';

type TitleWithArrowsProps = {
  title: string;
};

const TitleWithArrows: React.FC<TitleWithArrowsProps> = ({ title }) => (
  <div className={styles.title_wrapper}>
    <span className={styles.title_title}>{title}</span>
    <Image
      src={chevronArrowIcons}
      alt="icon"
    />
  </div>
);

export { TitleWithArrows };
