import Image from 'next/image';

import { chevronArrowIcons } from 'assets';

import styles from './styles.module.scss';

type TitleWithArrowsProps = {
  title: string;
  onClick: () => void;
};

const TitleWithArrows: React.FC<TitleWithArrowsProps> = ({ title, onClick }) => (
  <button className={styles.title_wrapper} onClick={onClick}>
    <span className={styles.title_title}>{title}</span>
    <Image src={chevronArrowIcons} alt="arrow" />
  </button>
);

export { TitleWithArrows };
