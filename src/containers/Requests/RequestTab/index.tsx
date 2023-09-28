import Link from 'next/link';
import { ScreenWidth, routes } from 'appConstants';
import { chevronArrowIcons } from 'assets';
import Image from 'next/image';
import { Pagination } from 'components';
import { useScreenWidth } from 'hooks';
import { MobileTableItem } from 'components/MyTable/MobileTableItem';
import React from 'react';
import { content } from './data';
import styles from './styles.module.scss';

const RequestTab = () => {
  const isMobile = useScreenWidth(ScreenWidth.mobile);

  return (
    <div>
      {isMobile ? (
        <div className={styles.table_mobile}>
          {content.map(({ fileName, date, requester }) => (
            <MobileTableItem
              name={fileName}
              title1="Request date"
              state1={date}
              title2="Requester"
              state2={(
                <>
                  {requester}
                  <Link href={routes.requests.root}>
                    See the profile details
                  </Link>
                </>
              )}
            />
          ))}
        </div>
      ) : (
        <>
          <table className={styles.table}>
            <thead className={styles.table_header}>
              <tr>
                <th>
                  <div>
                    <span>File name</span>
                    <Image
                      src={chevronArrowIcons}
                      alt=""
                    />
                  </div>
                </th>
                <th>
                  <div>
                    <span>Request date</span>
                    <Image
                      src={chevronArrowIcons}
                      alt=""
                    />
                  </div>
                </th>
                <th>
                  <div>
                    <span>Requester</span>
                    <Image
                      src={chevronArrowIcons}
                      alt=""
                    />
                  </div>
                </th>
                <th>Access action</th>
              </tr>
            </thead>
            <tbody>
              {content.map((row) => (
                <tr
                  className={styles.table_row}
                  key={row.fileName}
                >
                  <td>
                    <Link href={routes.requests.root}>{row.fileName}</Link>
                  </td>
                  <td>{row.date}</td>
                  <td>
                    <div className={styles.requester}>
                      {row.requester}
                      <Link href={routes.requests.root}>
                        See the profile details
                      </Link>
                    </div>
                  </td>
                  <td>
                    <div className={styles.table_block_btn}>
                      <button className={styles.table_provide}>Provide</button>
                      <button className={styles.table_decline}>Decline</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            onChange={() => {}}
            pageCount={1}
            className={styles.pagination}
          />
        </>
      )}
    </div>
  );
};

export { RequestTab };
