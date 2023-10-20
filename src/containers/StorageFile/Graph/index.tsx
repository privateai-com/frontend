import { FC } from 'react';

import {
  Button,
  Typography,
} from 'components';
import { GraphD3 } from './GraphD3';

import styles from './styles.module.scss';
import { GraphResponseType } from '../types';

// enum GraphEnum {
//   draw,
//   edit,
//   delete,
// }

interface GraphProps {
  edges: GraphResponseType[];
  setEdges: (edges: GraphResponseType[]) => void;
}

export const Graph: FC<GraphProps> = ({ edges, setEdges }) => {
  // const [graphControl, setGraphControl] = useState(GraphEnum.draw);
  const {
    nodesCount,
    edgesCount,
    relations,
  } = {
    nodesCount: 8,
    edgesCount: 10,
    relations: 'Health state',
  };
  
  return (
    <div className={styles.storageFile__data}>
      <div className={styles.storageFile__data_head}>
        <Typography type="h1">Data core structure</Typography>
        <Button>Delete file</Button>
      </div>
      <div className={styles.storageFile__wrapper}>
        {/* <div className={styles.storageFile__control_buttons}>
          <Button
            className={styles.button}
            theme={GraphEnum.draw === graphControl ? 'primary' : 'secondary'}
            onClick={() => setGraphControl(GraphEnum.draw)}
          >
            Draw
          </Button>
          <Button
            className={styles.button}
            theme={GraphEnum.edit === graphControl ? 'primary' : 'secondary'}
            onClick={() => setGraphControl(GraphEnum.edit)}
          >
            Edit
          </Button>
          <Button
            className={styles.button}
            theme={GraphEnum.delete === graphControl ? 'primary' : 'secondary'}
            onClick={() => setGraphControl(GraphEnum.delete)}
          >
            Delete
          </Button>
        </div> */}

        <GraphD3 edges={edges} setEdges={setEdges} />

        <Typography type="h2">Data core structure</Typography>
        <div className={styles.graph_info}>
          <div className={styles.graph_info__item}>
            <p>Number of nodes</p>
            <span>{nodesCount}</span>
          </div>
          <div className={styles.graph_info__item}>
            <p>Number of edges</p>
            <span>{edgesCount}</span>
          </div>
          <div className={styles.graph_info__item}>
            <p>Node with most relations</p>
            <span>{relations}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
