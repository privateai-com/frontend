import { Typography, SelectedText, Requester } from 'components';

import { useScreenWidth } from 'hooks';
import { ScreenWidth } from 'appConstants';
import { ExpandableMobileItem } from 'components/AdaptivePaginationTable/ExpandableMobileItem';

import { useModal } from 'react-modal-hook';
import { getName } from 'utils';
import styles from './styles.module.scss';

type StatusProps =
  | 'Open sourced'
  | 'Access granted'
  | 'Permission needed'
  | 'Access request pending'
  | 'Access denied';

type ItemProps = {
  name: string;
  field: string;
  authorName: string;
  authorUserName: string;
  core: string[];
  status: StatusProps;
  created: string;
  modified: string;
  search: string;
};

export const Item: React.FC<ItemProps> = ({
  name,
  authorName,
  authorUserName,
  field,
  core,
  status,
  created,
  modified,
  search,
}) => {
  const isMobile = useScreenWidth(ScreenWidth.mobile);

  const getStatusStyle = () => {
    switch (status) {
      case 'Open sourced':
        return styles.open;

      case 'Access granted':
        return styles.granted;

      case 'Permission needed':
        return styles.permission_needed;

      case 'Access request pending':
        return styles.pending;

      case 'Access denied':
        return styles.denied;

      default:
        return styles.item_status;
    }
  };

  const [showRequester, hideRequester] = useModal(
    () => (
      <Requester
        avatar="https://www.figma.com/file/bknHsaOyZlzB3FrosPJ7Vx/ARCHON-(Copy)?type=design&node-id=526-4546&mode=design&t=cjGucjlcUhk4ouS0-4"
        name="John Doe"
        contry="London, UK (GMT +0)"
        organization="London Institute of Medical Sciences, Head of neurosurgery laboratory"
        position="Head of neurosurgery laboratory"
        fields={'Neurobiology, neurosurgery, neuropathology'.split(', ')}
        socialMedia="https:/facebook.com/profile"
        onCloseModal={() => {
          hideRequester();
        }}
      />
    ),
    [],
  );

  return (
    <div>
      {isMobile ? (
        <ExpandableMobileItem
          name={name}
          searchWord={search}
        >
          <div>
            <div className={styles.item_row_block}>
              <span className={getStatusStyle()}>{status}</span>
            </div>
            <div className={styles.item_row_block}>
              <span className={styles.title}>Field: </span>
              <SelectedText
                text={field}
                searchWord={search}
                className={styles.selected}
              />
            </div>
            <div className={styles.item_row_block}>
              <span className={styles.title}>Author: </span>
              <button
                className={styles.item_btn_link}
                onClick={showRequester}
              >
                {getName(authorName, authorUserName, 1)}
              </button>
            </div>
            <div className={styles.item_col_block}>
              <span className={styles.title}>Core entities: </span>
              <span className={styles.item_core}>{core.join(', ')}</span>
            </div>
            <div className={styles.item_date_block}>
              <div className={styles.item_created_block}>
                <span className={styles.title}>Created</span>
                {created}
              </div>
              <div className={styles.item_col_block}>
                <span className={styles.title}>Modified</span>
                {modified}
              </div>
            </div>
          </div>
        </ExpandableMobileItem>
      ) : (
        <div className={styles.item}>
          <div className={styles.item_content_block}>
            <div className={styles.item_first_block}>
              <Typography
                className={styles.item_title}
                type="h4"
              >
                <SelectedText
                  text={name}
                  searchWord={search}
                  className={styles.selected}
                />
              </Typography>
              <div className={styles.item_description_block}>
                <div className={styles.item_field_author_block}>
                  <div className={styles.item_row_block}>
                    <span className={styles.title}>Field: </span>
                    <SelectedText
                      text={field}
                      searchWord={search}
                      className={styles.selected}
                    />
                  </div>
                  <div className={styles.item_row_block}>
                    <span className={styles.title}>Author: </span>
                    <button
                      className={styles.item_btn_link}
                      onClick={showRequester}
                    >
                      {getName(authorName, authorUserName, 1)}
                    </button>
                  </div>
                </div>
                <div className={styles.item_col_block}>
                  <span className={styles.title}>Core entities</span>
                  <span className={styles.item_core}>{core.join(', ')}</span>
                </div>
              </div>
            </div>
            <div className={styles.item_second_block}>
              <span className={getStatusStyle()}>{status}</span>
              <div className={styles.item_date_block}>
                <div className={styles.item_created_block}>
                  <span className={styles.title}>Created</span>
                  {created}
                </div>
                <div className={styles.item_col_block}>
                  <span className={styles.title}>Modified</span>
                  {modified}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
