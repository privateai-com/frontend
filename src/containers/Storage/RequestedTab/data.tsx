import { arrowDownSquare } from 'assets';
import { ButtonIcon } from 'components';
import { getStatusStyle } from 'utils/getStatusClassName';
import { Status } from 'types';
import styles from './styles.module.scss';

export const data = [
  {
    id: '1',
    name: 'Advancements in Biomedical Research Exploring New Frontiers',
    core: 'Healthcare, Drug discovery, Genetics, Artificial Intelligence',
    owner: 'Matthew Green',
    status: 'Access granted',
  },
  {
    id: '2',
    name: 'Precision Medicine: Personalized Approaches to Disease Prevention and Treatment',
    core: 'Biomarkers, Treatment optimization, Disease prevention, Pharmacogenomics',
    owner: 'Brad Scott',
    status: 'Access request pending',
  },
  {
    id: '3',
    name: 'Genome Editing in Biomedical Research: Promising Tools for Precision Medicine',
    core: 'Genome editing, Gene Therapy, Genetic diseases, CRISPR-Cas9',
    owner: 'Alex Smith',
    status: 'Access denied',
  },
];

export const content = data.map((i) => ({
  ...i,
  status: (
    <div className={styles.columns_owner_block}>
      <div className={getStatusStyle(i.status as Status, styles)} />
      {i.status}
      <ButtonIcon
        className={styles.columns_img}
        image={arrowDownSquare}
        onClick={() => {}}
      />
    </div>
  ),
}));
