import { ScreenWidth } from 'appConstants';
import { useScreenWidth } from 'hooks';
import styles from './styles.module.scss';

import { content } from './data';
import { useColumns } from './columns';
import { Common } from '../Common';
import { UploadButton } from '../Common/uploadButton';

export const ArticlesTab = () => {
  const columns = useColumns();
  const isMobile = useScreenWidth(ScreenWidth.mobile);

  return (
    <Common
      columns={columns}
      content={content}
      mobileTitle1="Status"
      key1="status"
      mobileTitle2="Core entites"
      key2="core"
      inputClassName={styles.input}
    >
      {!isMobile && <UploadButton />}
    </Common>
  );
};
