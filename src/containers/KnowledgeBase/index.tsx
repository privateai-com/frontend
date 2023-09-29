import { TextInput, Typography } from 'components';
import styles from './styles.module.scss';
import { Item } from './Item';

type StatusProps =
  | 'Open sourced'
  | 'Permission given'
  | 'Permission needed'
  | 'Access request pending';

type ItemProp = {
  name: string;
  field: string;
  author: string;
  core: string[];
  status: StatusProps;
  created: string;
  modified: string;
};

const items: ItemProp[] = Array(6).fill({
  name: 'New breakthroughs in gene therapy',
  field: 'Gene therapy',
  author: 'Ray Smith',
  core: [
    'Healthcare',
    'Drug discovery',
    'Genetics',
    'Artificial Intelligence',
    'Clinical trials',
    'DNA research',
  ],
  status: 'Open sourced',
  created: '20 may 2023',
  modified: '20 may 2023',
} as ItemProp);

export const KnowledgeBase = () => (
  <div className={styles.knowledge}>
    <div className={styles.knowledge_header}>
      <Typography
        className={styles.knowledge_title}
        type="h3"
      >
        Knowledge base
      </Typography>
      <TextInput value="" />
    </div>
    <div className={styles.items}>
      {items.map(
        ({
          name, author, field, core, status, created, modified, 
        }, ind) => (
          <Item
            key={ind} // eslint-disable-line react/no-array-index-key
            name={name}
            field={field}
            author={author}
            core={core}
            status={status}
            created={created}
            modified={modified}
          />
        ),
      )}
    </div>
  </div>
);
