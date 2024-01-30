import { FC, memo } from 'react';
import { Edge } from 'vis-network';
import { Tooltip } from 'react-tooltip';
import cx from 'classnames';

import {
  ButtonIcon,
  Typography,
} from 'components';

import { GraphResponseType } from 'types';
import { fullscreenIcon } from 'assets';
import { GraphVis } from './GraphVis';
import { transformDataToNodesAndEdges } from './utils';
import { GraphLoader } from '../Loader';
import { DeleteBtn } from '../DeleteBtn';

import styles from './styles.module.scss';

interface GraphProps {
  graphData: GraphResponseType[];
  setGraphData: (edges: GraphResponseType[]) => void;
  onFullScreen: () => void;
  setNodesLabelWithoutEdges: (args0: string[]) => void;
  isEdit: boolean;
  isLoading: boolean;
  articleId: number;
  isOwner: boolean;
  isPublished?: boolean;
  topCoreEntities: string;
}

export const Graph: FC<GraphProps> = memo(({
  graphData, setGraphData, isEdit,
  isLoading, onFullScreen, articleId, isOwner, topCoreEntities,
  setNodesLabelWithoutEdges, isPublished,
}) => {
  const { nodes, edges } = transformDataToNodesAndEdges(graphData);
  const edgesCurrent = edges.get().filter(({ to }: Edge) => to !== 0);
  const edgesCount = edgesCurrent.length;
  const nodesCount = nodes.length;

  return (
    <div className={styles.storageFile__data}>
      <div className={cx(styles.storageFile__data_head, {
        [styles.storageFile__data_head_owner]: isOwner && articleId,
      })}
      >
        <Typography className={styles.dataCoreTitle} type="h2">Data core structure</Typography>
        {(isOwner && articleId) && (
          <DeleteBtn
            className={styles.storageFile__data_btn}
            articleId={articleId}
            isPublished={isPublished}
          />
        )}
      </div>
      <div className={styles.storageFile__wrapper}>
        <ButtonIcon
          image={fullscreenIcon}
          onClick={onFullScreen}
          className={styles.storageFile__fullscreen}
        />
        {isLoading && (
          <GraphLoader />
        )}
        <GraphVis
          setGraphData={setGraphData}
          nodes={nodes}
          edges={edges}
          isEdit={isEdit}
          setNodesLabelWithoutEdges={setNodesLabelWithoutEdges}
        />

        <h2 style={{ fontSize: 19, fontStyle: 'normal', fontWeight: 700 }}>
          Data highlights: 
        </h2>
        {/* <Typography type="h2">
          Data highlights: 
        </Typography> */}
        <hr />
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
            <span data-tooltip-id={topCoreEntities}>{topCoreEntities}</span>
            <Tooltip
              id={topCoreEntities}
              place="top"
              className={styles.tooltip}
              noArrow
              offset={-10}
            >
              {topCoreEntities}
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
});
