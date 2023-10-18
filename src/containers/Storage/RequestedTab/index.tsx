import { RequestCell, Table } from 'components';
import { useMemo } from 'react';
import { useScreenWidth } from 'hooks';
import { ScreenWidth } from 'appConstants';
import { ExpandableMobileItem } from 'components/AdaptivePaginationTable/ExpandableMobileItem';
import { Column } from 'react-table';
import styles from './styles.module.scss';
import { content } from './data';
import { useColumns } from './columns';

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
                  <div className={styles.table_mobile_title}>Status:</div>
                  {iter.status}
                </div>
              </div>
            </ExpandableMobileItem>
          ))}
        </div>
      ) : (
        <Table
          columns={columns as unknown as Column<object>[]}
          data={content}
          className={styles.table}
        />
      )}
    </div>
  );
};
export { RequestedTab };
