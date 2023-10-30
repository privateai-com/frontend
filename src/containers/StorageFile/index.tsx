import { useState } from 'react';
import { useSelector } from 'react-redux';
import { accountSelectors } from 'store/account/selectors';
import { UserRole, GraphResponseType } from 'types';
import { graphData as graphDataMock } from 'appConstants';
import { ButtonBack } from './ButtonBack';
import { FileInfo } from './FileInfo';
import { FileInfoEdit } from './FileInfoEdit';
import { Graph } from './Graph';

import styles from './styles.module.scss';

export const StorageFile = () => {
  const [graphData, setGraphData] = useState<GraphResponseType[]>(graphDataMock);
  const [isEdit, setIsEdit] = useState(false);
  const { role } = useSelector(accountSelectors.getAccount);
  
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
        <FileInfo
          onEditClick={() => setIsEdit(true)}
          isVipUser={role === UserRole.VIP}
        />
      )}
      <Graph
        graphData={graphData}
        setGraphData={setGraphData}
        isEdit={isEdit}
      />
    </div>
  );
};
