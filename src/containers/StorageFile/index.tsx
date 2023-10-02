import { ButtonBack } from './ButtonBack';

import styles from './styles.module.scss';
import { FileInfo } from './FileInfo';
import { Graph } from './Graph';

export const StorageFile = () => (
  <div className={styles.storageFile__container}>
    <ButtonBack title="Back" />
    <FileInfo />
    <Graph />
  </div>
);
