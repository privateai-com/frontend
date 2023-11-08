import { FC, memo } from 'react';
import { Edge } from 'vis-network';

import {
  ButtonIcon,
  Typography,
} from 'components';

import { getTopEdges } from 'utils';
import { GraphResponseType } from 'types';
import { fullscreenIcon } from 'assets';
import { GraphVis } from './GraphVis';
import { transformDataToNodesAndEdges } from './utils';
import { GraphLoader } from '../Loader';

import styles from './styles.module.scss';

interface GraphProps {
  graphData: GraphResponseType[];
  setGraphData: (edges: GraphResponseType[]) => void;
  onFullScreen: () => void;
  isEdit: boolean;
  isLoading: boolean;
}

export const Graph: FC<GraphProps> = memo(({
  graphData, setGraphData, isEdit, isLoading, onFullScreen,
}) => {
  const { nodes, edges } = transformDataToNodesAndEdges(graphData);
  const edgesCurrent = edges.get().filter(({ to }: Edge) => to !== 0);
  const edgesCount = edgesCurrent.length;
  const nodesCount = nodes.length;
  const topEdges = getTopEdges(edges.get(), nodes.get());
  const coreEntities = topEdges.map(({ label }) => label).join(', ');

  return (
    <div className={styles.storageFile__data}>
      <div className={styles.storageFile__data_head}>
        <Typography type="h1">Data core structure</Typography>
        {/* <Button className={styles.storageFile__data_btn} theme="white">Delete file</Button> */}
      </div>
      <div className={styles.storageFile__wrapper}>
        <ButtonIcon
          image={fullscreenIcon}
          onClick={onFullScreen}
          className={styles.storageFile__fullscreen}
        />
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
        {isLoading && (
          <GraphLoader />
        )}
        <GraphVis
          // graphData={graphData}
          setGraphData={setGraphData}
          nodes={nodes}
          edges={edges}
          isEdit={isEdit}
        />

        <Typography type="h2">Data highlights:</Typography>
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
            <span>{coreEntities}</span>
          </div>
        </div>
      </div>
    </div>
  );
});
