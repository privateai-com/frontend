import { Typography } from 'components';
import { useScreenWidth } from 'hooks';
import { ScreenWidth } from 'appConstants';
import styles from './styles.module.scss';
import { DragNDrop } from './DragNDrop';
import { Item } from './Item';

type DataProps = {
  name: string;
  percents: number;
  weight: number;
};

const data: DataProps[] = [
  {
    name: 'Advancements in Biomedical Research',
    percents: 80,
    weight: 513,
  },
  {
    name: 'Precision Medicine',
    percents: 70,
    weight: 278,
  },
  {
    name: 'Nanotechnologies in medicine',
    percents: 100,
    weight: 100,
  },
  {
    name: 'Nanotechnologies in medicine',
    percents: 100,
    weight: 100,
  },
  {
    name: 'Nanotechnologies in medicine',
    percents: 100,
    weight: 100,
  },
  {
    name: 'Nanotechnologies in medicine',
    percents: 100,
    weight: 100,
  },
];

export const Upload = () => {
  const isMobile = useScreenWidth(ScreenWidth.mobile);
  return (
    <div className={styles.upload}>
      <Typography
        className={styles.upload_title}
        type="h3"
      >
        Upload activity
      </Typography>

      <div className={styles.upload_dnd}>
        <DragNDrop />
      </div>

      {!isMobile && (
        <label
          htmlFor="upload"
          className={styles.upload_btn}
        >
          Select a file from local directory
          <input
            type="file"
            id="upload"
            className={styles.upload_input}
          />
        </label>
      )}

      <div className={styles.statuses}>
        <Typography
          className={styles.statuses_title}
          type="h4"
        >
          Statuses
        </Typography>
        <div className={styles.statuses_items}>
          {data.map(({ name, percents, weight }) => (
            <Item
              name={name}
              percents={percents}
              weight={weight}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
