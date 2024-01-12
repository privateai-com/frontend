import { Typography } from 'components/Typography';
import { ReactNode } from 'react';
import styles from '../../containers/Profile/styles.module.scss';
import commonStyles from '../../containers/Profile/common.module.scss';

interface PageHeadProps {
  title?: string | ReactNode;
  btnWrap?: React.ReactNode;
  headStyles?: React.CSSProperties;
  btnWrapStyles?: React.CSSProperties;
}

interface PageHeadComponentProps {
  props: PageHeadProps;
  children?: React.ReactNode;
}

export const PageHead: React.FC<PageHeadComponentProps> = ({ props, children }) => {
  const {
    title = '', btnWrap, headStyles, btnWrapStyles, 
  } = props;

  return (
    <div className={styles.profile__head} style={{ ...headStyles }}>
      <div className={styles.profile__head_title}>
        <Typography type="h1" className={commonStyles.h1_style}>{title}</Typography>
        <div className={styles.btnWrap} style={{ ...btnWrapStyles }}>
          {btnWrap}
        </div>
      </div>
      {children}
    </div>
  );
};
