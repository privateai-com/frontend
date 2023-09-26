import { NotificationItem } from './NotificationItem';
// Добавил пока моковые данные
const items = [
  {
    text: 'lorem ipsum dolor sit am equivalents et justo',
    time: '~ 5 min ago',
  },
  {
    text: 'lorem ipsu sit am equients et jsto',
    time: '~ 1 day ago',
  },
];

const NotificationContent = () => (
  <>
    {items.map((item) => (
      <NotificationItem
        text={item.text}
        time={item.time}
      />
    ))}
  </>
);

export { NotificationContent };
