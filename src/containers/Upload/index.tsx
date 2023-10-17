import { Button, Typography } from 'components';
import { useScreenWidth } from 'hooks';
import { ScreenWidth } from 'appConstants';
import { useState } from 'react';
import styles from './styles.module.scss';
import { DragNDrop } from './DragNDrop';
import { Item } from './Item';

type DataProps = {
  id: number;
  name: string;
  percents: number;
  weight: number;
};

const data: DataProps[] = [
  {
    id: 1,
    name: 'Advancements in Biomedical Research',
    percents: 80,
    weight: 513,
  },
  {
    id: 2,
    name: 'Precision Medicine',
    percents: 70,
    weight: 278,
  },
  {
    id: 3,
    name: 'Nanotechnologies in medicine',
    percents: 100,
    weight: 100,
  },
  {
    id: 4,
    name: 'Nanotechnologies in medicine',
    percents: 100,
    weight: 100,
  },
  {
    id: 5,
    name: 'Nanotechnologies in medicine',
    percents: 100,
    weight: 100,
  },
  {
    id: 6,
    name: 'Nanotechnologies in medicine',
    percents: 100,
    weight: 100,
  },
];

export const Upload = () => {
  const [doc, setDoc] = useState<File | null>(null);
  const isMobile = useScreenWidth(ScreenWidth.mobile);

  const onClearClick = () => {
    setDoc(null);
  };

  return (
    <div className={styles.upload}>
      <Typography
        className={styles.upload_title}
        type="h3"
      >
        Upload activity
      </Typography>
      <div className={styles.upload_wrapper}>
        <div className={styles.upload_dnd_block}>
          <DragNDrop
            doc={doc}
            setDoc={setDoc}
          />
        </div>
        <span className={styles.upload_notice}>
          * - name of the file will be displayed on the platform after the
          upload, rename it beforehand if necessary
        </span>

        {!isMobile &&
          (doc ? (
            <div className={styles.upload_btn_block}>
              <Button className={styles.upload_btns}>Confirm</Button>
              <Button
                className={styles.upload_btns}
                theme="grey"
                onClick={onClearClick}
              >
                Cancel
              </Button>
            </div>
          ) : (
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
          ))}

        <div className={styles.statuses}>
          <Typography
            className={styles.statuses_title}
            type="h4"
          >
            Statuses
          </Typography>
          <div className={styles.statuses_items}>
            <div className={styles.statuses_wrapper}>
              <div className={styles.statuses_content}>
                {data.map(({ id, name, percents, weight }) => (
                  <Item
                    key={id}
                    name={name}
                    percents={percents}
                    weight={weight}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>{' '}
    </div>
  );
};
