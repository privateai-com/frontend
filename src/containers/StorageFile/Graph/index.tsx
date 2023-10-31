import { FC, memo } from 'react';
import { Edge } from 'vis-network';

import {
  Typography,
} from 'components';

import styles from './styles.module.scss';
import { GraphResponseType } from '../types';
import { GraphVis } from './GraphVis';
import { transformDataToNodesAndEdges } from './utils';

interface GraphProps {
  graphData: GraphResponseType[];
  setGraphData: (edges: GraphResponseType[]) => void;
  isEdit: boolean;
}

export const Graph: FC<GraphProps> = memo(({ graphData, setGraphData, isEdit }) => {
  const { nodes, edges } = transformDataToNodesAndEdges(graphData);
  const edgesCurrent = edges.get().filter(({ to }: Edge) => to !== 0);
  const edgesCount = edgesCurrent.length;
  const nodesCount = nodes.length;
  const relations = nodes.get().splice(0, 5).map(({ label }: Edge) => label);

  return (
    <div className={styles.storageFile__data}>
      <div className={styles.storageFile__data_head}>
        <Typography type="h1">Data core structure</Typography>
        {/* <Button className={styles.storageFile__data_btn} theme="white">Delete file</Button> */}
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

        <GraphVis
          // graphData={graphData}
          setGraphData={setGraphData}
          nodes={nodes}
          edges={edges}
          isEdit={isEdit}
        />

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
            <p>Core Entities</p>
            <span>{relations.join(', ')}</span>
          </div>
        </div>
      </div>
    </div>
  );
});
