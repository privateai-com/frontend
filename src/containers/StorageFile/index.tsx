import { useState } from 'react';
import { ButtonBack } from './ButtonBack';
import { FileInfo } from './FileInfo';
import { Graph } from './Graph';

import { data } from './data';

import styles from './styles.module.scss';
import { GraphResponseType } from './types';

export const StorageFile = () => {
  const [edges, setEdges] = useState<GraphResponseType[]>(data);
  return (
    <div className={styles.storageFile__container}>
      <ButtonBack title="Back" />
      <FileInfo edges={edges} setEdges={setEdges} />
      <Graph edges={edges} setEdges={setEdges} />
    </div>
  );
};
