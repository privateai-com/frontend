import Image from 'next/image';
import { arrowIcon } from 'assets';
import styles from './styles.module.scss';

type Props = {
  time: string;
  text: string;
};
// Логику по отображении времени пока не добавлял
const NotificationItem: React.FC<Props> = ({ text, time }) => (
  <div className={styles.item_container}>
    <div className={styles.item_time}>{time}</div>
    <div className={styles.item_content}>
      {text}
      <Image
        src={arrowIcon}
        alt={text}
        width={25}
      />
    </div>
  </div>
);

export { NotificationItem };
