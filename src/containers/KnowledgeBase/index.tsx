import { useState } from 'react';
import { TextInput, Typography } from 'components';
import styles from './styles.module.scss';
import { Item } from './Item';
import { items } from './data';

export const KnowledgeBase: React.FC = () => {
  const [search, setSearch] = useState('');
  return (
    <div className={styles.knowledge}>
      <div className={styles.knowledge_header}>
        <Typography
          className={styles.knowledge_title}
          type="h3"
        >
          Knowledge base
        </Typography>
        <TextInput
          classNameContainer={styles.knowledge_search}
          value={search}
          onChangeValue={setSearch}
          placeholder="Search"
          isSearch
        />
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
              search={search}
            />
          ),
        )}
      </div>
    </div>
  );
};
