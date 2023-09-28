import { Typography } from 'components';
import Link from 'next/link';
import { routes } from 'appConstants';
import { chevronArrowIcons, arrowIcon } from 'assets';
import Image from 'next/image';
import styles from './styles.module.scss';

const rows = [
  {
    fileName:
      'Exploring the role of Gut Microbiota in Immune System Regulation',
    data: '13/03/2023',
    requester: 'User123',
  },
  {
    fileName:
      'New Insights into the Mechanism of Cancer Metastasis: A Biomedical Perspective*',
    data: '13/03/2023',
    requester: 'User123',
  },
];
const emptyRows = [
  {
    first: '-',
    second: '-',
    third: '-',
    fourth: '-',
    key: 5,
  },
];
for (let i = 0; i < 4; i += 1) {
  emptyRows.push({
    first: '-',
    second: '-',
    third: '-',
    fourth: '-',
    key: i,
  });
}

const Requests = () => (
  <div className={styles.requests_container}>
    <div className={styles.requests_header}>
      <Typography
        type="h3"
        className={styles.requests_title}
      >
        Access requests
      </Typography>
      <div className={styles.requests_btn_block}>
        <button className={styles.requests_btn_to_me}>Requests to me</button>
        <button className={styles.requests_btn_my}>My requests</button>
      </div>
    </div>
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
        {rows.map((row) => (
          <tr
            className={styles.table_row}
            key={row.fileName}
          >
            <td>
              <Link href={routes.requests.root}>{row.fileName}</Link>
            </td>
            <td>{row.data}</td>
            <td>
              <div className={styles.requester}>
                {row.requester}
                <Link href={routes.requests.root}>See the profile details</Link>
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

        {emptyRows.map((row) => (
          <tr
            className={styles.table_row}
            key={row.key}
          >
            <td>{row.first}</td>
            <td>{row.second}</td>
            <td>{row.third}</td>
            <td>{row.fourth}</td>
          </tr>
        ))}
      </tbody>
    </table>

    <div className={styles.pagination}>
      <button
        className={styles.pagination_prev_btn}
        onClick={() => {}}
      >
        <Image
          src={arrowIcon}
          alt="Previous page"
        />
      </button>
      <span>
        Page 
        {' '}
        {2}
        {' '}
        of 
        {' '}
        {5}
      </span>
      <button
        className={styles.pagination_next_btn}
        onClick={() => {}}
      >
        <Image
          src={arrowIcon}
          alt="Next page"
        />
      </button>
    </div>
  </div>
);

export { Requests };
