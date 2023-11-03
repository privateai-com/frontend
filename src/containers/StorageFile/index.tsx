import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { profileSelectors } from 'store/profile/selectors';
import { UserRole, GraphResponseType } from 'types';
import { graphDataReal } from 'appConstants';
import { ButtonBack } from './ButtonBack';
import { FileInfo } from './FileInfo';
import { FileInfoEdit } from './FileInfoEdit';
import { Graph } from './Graph';

import styles from './styles.module.scss';

export const StorageFile = () => {
  const [graphData, setGraphData] = useState<GraphResponseType[]>(graphDataReal);
  const [isEdit, setIsEdit] = useState(false);
  const role = useSelector(profileSelectors.getPropAccountInfo('role'));
  
  const callback = useCallback((value: GraphResponseType[]) => {
    setGraphData(value);
  }, []);

  return (
    <div className={styles.storageFile__container}>
      <ButtonBack title="Back" />
      {isEdit ? (
        <FileInfoEdit
          edges={graphData}
          // setEdges={setGraphData}
          onSave={() => setIsEdit(false)}
        />
      ) : (
        <FileInfo
          onEditClick={() => setIsEdit(true)}
          isVipUser={role === UserRole.VIP}
        />
      )}
      <Graph
        graphData={graphDataReal}
        setGraphData={callback}
        isEdit={isEdit}
      />
    </div>
  );
};
