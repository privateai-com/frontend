import { useState } from 'react';
import { ButtonBack } from './ButtonBack';
import { FileInfo } from './FileInfo';
import { FileInfoEdit } from './FileInfoEdit';
import { Graph } from './Graph';

import { data } from './data';

import styles from './styles.module.scss';
import { GraphResponseType } from './types';

export const StorageFile = () => {
  const [graphData, setGraphData] = useState<GraphResponseType[]>(data);
  const [isEdit, setIsEdit] = useState(false);
  return (
    <div className={styles.storageFile__container}>
      <ButtonBack title="Back" />
      {isEdit ? (
        <FileInfoEdit
          edges={graphData}
          setEdges={setGraphData}
          onSaveClick={() => setIsEdit(false)}
        />
      ) : (
        <FileInfo onEditClick={() => setIsEdit(true)} />
      )}
      <Graph
        graphData={graphData}
        setGraphData={setGraphData}
        isEdit={isEdit}
      />
    </div>
  );
};
