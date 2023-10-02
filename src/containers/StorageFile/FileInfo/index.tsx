import Link from 'next/link';

import {
  Button,
  ButtonIcon,
  RadioButtons,
  Typography,
} from 'components';
import { trashIcon } from 'assets';

import styles from './styles.module.scss';

export const FileInfo = () => {
  const {
    name,
    topic,
  } = {
    name: 'Newest breakthroughs in gene therapy',
    topic: 'Gene therapy',
  };
  
  return (
    <>
      <div className={styles.storageFile__file}>
        <Typography type="h1">File information</Typography>
        <div className={styles.storageFile__wrapper}>
          <div className={styles.storageFile__item}>
            File name:
            <span>{name}</span>
          </div>
          <div className={styles.storageFile__item}>
            Topic: 
            <Link href="/#">
              {topic}
            </Link>
          </div>
          <div className={styles.storageFile__item}>
            Graph edges: 
            <Button theme="secondary">Add new edge</Button>
          </div>
          <div className={styles.storageFile__edit}>
            <div className={styles.storageFile__edit_item}>
              <span>1.</span>
              <div className={styles.storageFile__edit_item_inputs}>
                <input />
                <input />
                <input />
              </div>
              <ButtonIcon
                className={styles.storageFile__edit_item_icon}
                image={trashIcon}
                onClick={() => {}}
              />
            </div>
          </div>
          <div className={styles.storageFile__item}>
            Access:
            <RadioButtons
              containerClassName={styles.radio_buttons}
              options={[
                {
                  value: '1',
                  label: 'Open-sourced',
                },
                {
                  value: '2',
                  label: 'Permission-based',
                },
              ]}
              currentValue="1"
              onChange={() => {}}
            />
          </div>
        </div> 
      </div>
      <div className={styles.storageFile__buttons}>
        <Button theme="secondary">Save changes</Button>
        <Button theme="secondary">Revert to last saved</Button>
        <Button>Revert to last published</Button>
      </div>
    </>
  );
};
