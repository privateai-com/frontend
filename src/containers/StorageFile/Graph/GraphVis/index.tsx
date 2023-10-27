import React, {
  FC, useCallback, useEffect, useMemo, useRef, useState, 
} from 'react';
import {
  Data, Edge, Network, Node, 
} from 'vis-network';
import cx from 'classnames';
import 'vis-network/styles/vis-network.css';

import { DatasetEdgeType, DatasetNodeType, GraphResponseType } from 'containers/StorageFile/types';
import { ButtonIcon } from 'components';
import { closeModalIcon } from 'assets';
import { options } from './constants';
import { apdateGraphControls } from './hooks';

import styles from './styles.module.scss';

interface GraphVisProps {
  graphData: GraphResponseType[];
  setGraphData: (edges: GraphResponseType[]) => void;
  nodes: DatasetNodeType,
  edges: DatasetEdgeType,
  isEdit: boolean,
}

export const GraphVis: FC<GraphVisProps> = ({
  graphData, setGraphData, nodes, edges, isEdit,
}) => {
  const visJsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [editingNodeId, setEditingNodeId] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleAddNode = useCallback((data: Node, callback: (data: Node) => void) => {
    const newNode: Node = {
      ...data,
      id: nodes.length + 1,
    };
    setEditingNodeId(Number(newNode.id));
    setShowPopup(true);
    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.value = newNode.label || '';
      setTimeout(() => {
        inputElement.focus();
        inputElement.select();
      }, 10);
    }
    const newGraphData = [
      ...graphData,
      {
        head: 'new',
        tail: '',
        type: '',
        meta: {
          spans: [[0]],
        },
      },
    ];
    setGraphData(newGraphData);
    callback(newNode);
  }, [graphData, nodes, setGraphData]);

  const handleAddOrEditEdge = useCallback((data: Edge, callback: (data: Edge) => void) => {
    if (!data.to || !data.from) return;
    const nodeTo = nodes.get(data.to);
    const nodeFrom = nodes.get(data.from);
    if (!nodeTo || !nodeFrom) return;
    const updatedGraphData = graphData.map((edge, index) => {
      if ((index + 1) === nodeFrom.id) {
        return {
          ...edge,
          tail: nodeTo.label,
        };
      }
      return edge;
    });
    setGraphData(updatedGraphData);
    callback(data);
  }, [graphData, nodes, setGraphData]);

  const handleDeleteEdge = useCallback((data: Data, callback: (data: Data) => void) => {
    if (Array.isArray(data?.edges) && data.edges.length === 1) {
      const edgeIdToDelete = data.edges[0];
      const currentEdge = edges.get().find(({ id }) => id === edgeIdToDelete);
      if (!currentEdge) return;
      const nodeFrom = nodes.get(currentEdge.from);
      if (!nodeFrom) return;
      const updatedGraphData = graphData.map((edge, index) => {
        if ((index + 1) === Number(nodeFrom.id)) {
          return {
            ...edge,
            tail: '',
          };
        }
        return edge;
      });
      setGraphData(updatedGraphData);
    }
    callback(data);
  }, [edges, graphData, nodes, setGraphData]);

  const currentOption = useMemo(() => ({
    ...options,
    manipulation: {
      enabled: isEdit,
      addNode: handleAddNode,
      addEdge: handleAddOrEditEdge,
      editEdge: handleAddOrEditEdge,
      deleteNode: (data: Data, callback: (data: Data) => void) => {
        if (!Array.isArray(data?.nodes)) return;
        const nodeIdToDelete = data.nodes[0];
        const updatedGraphData =
          graphData.filter((_, index) => (index + 1) !== nodeIdToDelete);
        setGraphData(updatedGraphData);
        
        callback(data);
      },
      deleteEdge: handleDeleteEdge,
    }, 
  }), [graphData, handleAddNode, handleAddOrEditEdge, handleDeleteEdge, isEdit, setGraphData]);

  useEffect(() => {
    const network = visJsRef.current &&
      new Network(
        visJsRef.current, 
        { nodes, edges: edges.get().map((edge) => edge) },
        currentOption,
      );
    apdateGraphControls(visJsRef);
    if (!network || !isEdit) return;

    network.on('doubleClick', (event) => {
      const canvasPosition = network.canvasToDOM(event.pointer.canvas);
      const nodeId = network.getNodeAt(canvasPosition);

      if (nodeId !== undefined) {
        setEditingNodeId(Number(nodeId));
        setShowPopup(true);
        const inputElement = inputRef.current;
        const node = nodes.get(nodeId);

        if (!node || !inputElement) return;

        nodes.update(node);
        
        if (node) {
          inputElement.value = node.label;
        }
        setTimeout(() => {
          inputElement.focus();
          inputElement.select();
        }, 10);
      } else {
        setShowPopup(false);
        setEditingNodeId(null);
      }
    });
  }, [currentOption, edges, isEdit, nodes]);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (editingNodeId !== null) {
        const updatedNode = nodes.get(editingNodeId);
        if (updatedNode) {
          const updatedGraph = graphData.map((edge, index) => {
            if (index === editingNodeId - 1) {
              return {
                ...edge,
                head: inputRef.current?.value || '',
              };
            }
            return edge;
          });
  
          setGraphData(updatedGraph);
        }
        setShowPopup(false);
        setEditingNodeId(null);
      }
    }
  }, [editingNodeId, graphData, nodes, setGraphData]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  useEffect(() => {
    if (visJsRef.current) {
      apdateGraphControls(visJsRef);
    }
  }, []);

  const onClosePopup = useCallback(() => {
    setShowPopup(false);
    setEditingNodeId(null);
  }, []);

  useEffect(() => {
    // const handleClickOutside = (event: MouseEvent) => {
    //   if (showPopup && inputRef.current && !inputRef.current.contains(event.target as Node)) {
    //     setShowPopup(false);
    //     setEditingNodeId(null);
    //   }
    // };
  
    // document.addEventListener('click', handleClickOutside);
  
    // return () => {
    //   document.removeEventListener('click', handleClickOutside);
    // };
  }, [showPopup]);

  return (
    <div className={styles.visContainer}>
      <div ref={visJsRef} style={{ height: '500px', width: '100%' }} />
      <div>
        <span id="eventSpanHeading" />
        <pre id="eventSpanContent" />
      </div>
      <div
        className={cx(styles.popup, {
          [styles.show]: showPopup,
        })}
      >
        <input
          type="text"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            if (inputRef.current) {
              inputRef.current.value = event.target.value;
            }
          }}
          ref={inputRef}
        />
        <ButtonIcon image={closeModalIcon} onClick={onClosePopup} />
      </div>
    </div>
  );
};
