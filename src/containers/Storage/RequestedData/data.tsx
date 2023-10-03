import { arrowDownSquare } from 'assets';
import { RequestCell } from 'components';
import Image from 'next/image';
import styles from './styles.module.scss';

export const data = [
  {
    id: '1',
    name: 'Advancements in Biomedical Research Exploring New Frontiers',
    core: 'Healthcare, Drug discovery, Genetics, Artificial Intelligence',
    owner: 'Matthew Green',
  },
  {
    id: '2',
    name: 'Precision Medicine: Personalized Approaches to Disease Prevention and Treatment',
    core: 'Biomarkers, Treatment optimization, Disease prevention, Pharmacogenomics',
    owner: 'Brad Scott',
  },
  {
    id: '3',
    name: 'Genome Editing in Biomedical Research: Promising Tools for Precision Medicine',
    core: 'Genome editing, Gene Therapy, Genetic diseases, CRISPR-Cas9',
    owner: 'Alex Smith',
  },
];

export const content = data.map((i) => ({
  ...i,
  owner: (
    <div className={styles.columns_owner_block}>
      <RequestCell>{i.owner}</RequestCell>
      <Image
        className={styles.columns_img}
        src={arrowDownSquare}
        alt="icon"
      />
    </div>
  ),
}));
