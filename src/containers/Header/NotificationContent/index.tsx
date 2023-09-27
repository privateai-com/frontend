import Image from 'next/image';
import { arrowIcon } from 'assets';
import styles from './styles.module.scss';

// Добавил пока моковые данные
const items = [
  {
    text: 'New access request for “Genome Editing” document.',
    time: '~ 5 min ago',
  },
  {
    text: 'Access granted for “Advancements in Biomedical Research Exploring New Frontiers ...” document.',
    time: '~ 1 day ago',
  },
];

const NotificationContent = () => (
  <>
    {items.map(({ text, time }) => (
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
    ))}
  </>
);

export { NotificationContent };
