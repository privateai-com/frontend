import { Button } from 'components';

import { routes } from 'appConstants';
import styles from './styles.module.scss';

import { content } from './data';
import { useColumns } from './columns';
import { CommmonTab } from '../CommonTab';

export const ArticlesTab = () => {
  const columns = useColumns();

  return (
    <CommmonTab
      columns={columns}
      content={content}
      mobileTitle1="Status"
      key1="status"
      mobileTitle2="Core entites"
      key2="core"
    >
      <Button
        className={styles.upload}
        href={routes.uploadActivity.root}
      >
        <span className={styles.plus_icon} />
        Upload new file
      </Button>
    </CommmonTab>
  );
};
