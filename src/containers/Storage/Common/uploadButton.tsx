import { routes } from "appConstants";
import { Button } from "components";
import styles from './styles.module.scss';

export const UploadButton = () => {
  return (
    <Button
      className={styles.upload}
      href={routes.uploadActivity.root}
    >
      <div className={styles.plus_icon} />
      Upload new file
    </Button>
  );
}