import { ButtonIcon, RequestCell, Table } from 'components';
import { useMemo } from 'react';
import { useScreenWidth } from 'hooks';
import { ScreenWidth } from 'appConstants';
import { ExpandableMobileItem } from 'components/AdaptivePaginationTable/ExpandableMobileItem';
import { Column } from 'react-table';
import styles from './styles.module.scss';
import { data as content } from './data';
import { useColumns } from './columns';
import { getStatusImg, getStatusStyle } from './utils';

const RequestedTab = () => {
  const columns = useColumns();
  const isMobile = useScreenWidth(ScreenWidth.mobile);
  const itemsOnPageQuantity = 6;

  const initialObj = useMemo(
    () =>
      (content.length
        ? Object.fromEntries(
          Object.entries(content[0]).map(([key]) => [
            key,
            isMobile
              ? 'Exploring the role of Gut Microbiota in Immune System Regulation'
              : '',
          ]),
        )
        : {}),
    [isMobile],
  );

  const data = useMemo(() => {
    if (content.length >= itemsOnPageQuantity) {
      return content;
    }
    const emptyObjectsCount = itemsOnPageQuantity - content.length;
    const emptyObjects = Array.from(
      { length: emptyObjectsCount },
      () => initialObj,
    );
    return [...content, ...emptyObjects];
  }, [initialObj, itemsOnPageQuantity]);

  return (
    <div>
      {isMobile ? (
        <div className={styles.table_mobile}>
          {data.map((iter, ind) => (
            <ExpandableMobileItem
              // eslint-disable-next-line
              key={ind}
              name={iter.name}
              id={Number(iter.id)}
            >
              <div className={styles.table_mobile_container}>
                <div className={styles.table_mobile_block}>
                  <div className={styles.table_mobile_title}>
                    Core entities:
                  </div>
                  {iter.core}
                </div>

                <div className={styles.table_mobile_block}>
                  <div className={styles.table_mobile_title}>Owner:</div>
                  <RequestCell>{iter.owner}</RequestCell>
                </div>

                <div className={styles.table_mobile_block_status}>
                  <div>
                    <div className={styles.table_mobile_title}>Status:</div>
                    <div className={getStatusStyle(iter.status, styles)}>
                      {iter.status}
                    </div>
                  </div>
                  <ButtonIcon
                    className={styles.columns_img}
                    image={getStatusImg(iter.status)}
                    onClick={() => {}}
                  />
                  {' '}
                </div>
              </div>
            </ExpandableMobileItem>
          ))}
        </div>
      ) : (
        <Table
          columns={columns as unknown as Column<object>[]}
          data={data}
          className={styles.table}
        />
      )}
    </div>
  );
};
export { RequestedTab };
