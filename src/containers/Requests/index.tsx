import { Typography } from 'components';
import Link from 'next/link';
import { routes } from 'appConstants';
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

const Requests = () => (
  <div>
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
    <div>
      <table className={styles.table}>
        <thead className={styles.table_header}>
          <tr>
            <th>File name</th>
            <th>Request date</th>
            <th>Requester</th>
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
                {row.requester}
                <Link href={routes.requests.root}>
                  See the profile details
                </Link>
              </td>
              <td>
                <button>Provide</button>
                <button>Decline</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export { Requests };
