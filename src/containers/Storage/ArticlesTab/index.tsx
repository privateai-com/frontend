import { Button } from 'components';
import { routes } from 'appConstants';
import { content } from './data';
import { useColumns } from './columns';
import { Common } from '../Common';

import styles from './styles.module.scss';

export const ArticlesTab = () => {
  const columns = useColumns();

  return (
    <Common
      columns={columns}
      content={content}
      mobileTitle1="Status"
      key1="status"
      mobileTitle2="Core entites"
      key2="core"
      inputClassName={styles.input}
      classNameTableContainer={styles.table}
    >
      <Button
        className={styles.upload}
        href={routes.uploadActivity.root}
      >
        <span className={styles.plus_icon} />
        Upload new file
      </Button>
    </Common>
  );
};
