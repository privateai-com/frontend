import React, {
  FC, memo, useCallback, useEffect, useMemo, useRef, useState, 
} from 'react';
import {
  Data,
  DataInterfaceEdges,
  DataInterfaceNodes,
  Edge,
  Network,
  Node, 
} from 'vis-network';
import cx from 'classnames';
import 'vis-network/styles/vis-network.css';

import { DatasetEdgeType, DatasetNodeType, GraphResponseType } from 'containers/StorageFile/types';
import { ButtonIcon } from 'components';
import { closeModalIcon } from 'assets';
import { options } from './constants';
import { apdateGraphControls } from './hooks';

import styles from './styles.module.scss';
import { transformNodesAndEdgesToData } from '../utils';

interface GraphVisProps {
  setGraphData: (edges: GraphResponseType[]) => void
  nodes: DatasetNodeType,
  edges: DatasetEdgeType,
  isEdit: boolean,
}

export const GraphVis: FC<GraphVisProps> = memo(({
  nodes, edges, isEdit, setGraphData,
}) => {
  const visJsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [editingNodeId, setEditingNodeId] = useState<string | null>(null);
  const [editingEdgeId, setEditingEdgeId] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleAddNode = useCallback((data: Node, callback: (data: Node) => void) => {
    const newNode: Node = {
      ...data,
      id: (nodes.length + 1).toString(),
    };
    setEditingNodeId(newNode.id as string);
    setShowPopup(true);
    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.value = newNode.label || '';
      setTimeout(() => {
        inputElement.focus();
        inputElement.select();
      }, 10);
    }
    callback(newNode);
  }, [nodes]);

  const handleAddOrEditEdge = useCallback((data: Edge, callback: (data: Edge) => void) => {
    if (!data.to || !data.from) return;
    const nodeTo = nodes.get(data.to);
    const nodeFrom = nodes.get(data.from);
    if (!nodeTo || !nodeFrom) return;
    setGraphData(transformNodesAndEdgesToData(nodes, edges));
    callback(data);
  }, [edges, nodes, setGraphData]);

  const handleDeleteEdge = useCallback((data: Data, callback: (data: Data) => void) => {
    if (Array.isArray(data?.edges) && data.edges.length === 1) {
      const edgeIdToDelete = data.edges[0];
      const currentEdge = edges.get().find(({ id }) => id === edgeIdToDelete);
      if (!currentEdge) return;
      const nodeFrom = nodes.get(currentEdge.from);
      if (!nodeFrom) return;
    }
    setGraphData(transformNodesAndEdgesToData(nodes, edges));
    callback(data);
  }, [edges, nodes, setGraphData]);

  const handleDeleteNode = useCallback((data: Data, callback: (data: Data) => void) => {
    if (!Array.isArray(data?.nodes)) return;
    setGraphData(transformNodesAndEdgesToData(nodes, edges));
    callback(data);
  }, [edges, nodes, setGraphData]);

  const currentOption = useMemo(() => ({
    ...options,
    manipulation: {
      enabled: isEdit,
      addNode: handleAddNode,
      addEdge: handleAddOrEditEdge,
      deleteNode: handleDeleteNode,
      deleteEdge: handleDeleteEdge,
    }, 
  }), [handleAddNode, handleAddOrEditEdge, handleDeleteEdge, handleDeleteNode, isEdit]);

  useEffect(() => {
    const network = visJsRef.current &&
      new Network(
        visJsRef.current, 
        { nodes: nodes as DataInterfaceNodes, edges: edges as DataInterfaceEdges },
        currentOption,
      );
    apdateGraphControls(visJsRef);
    if (!network || !isEdit) return;

    // network.on('doubleClick', (event) => {
    //   const canvasPosition = network.canvasToDOM(event.pointer.canvas);
    //   const nodeId = network.getNodeAt(canvasPosition);

    //   if (nodeId !== undefined) {
    //     setEditingNodeId(Number(nodeId));
    //     setShowPopup(true);
    //     const inputElement = inputRef.current;
    //     const node = nodes.get(nodeId);

    //     if (!node || !inputElement) return;

    //     nodes.update(node);
        
    //     if (node) {
    //       inputElement.value = node.label;
    //     }
    //     setTimeout(() => {
    //       inputElement.focus();
    //       inputElement.select();
    //     }, 10);
    //   } else {
    //     setShowPopup(false);
    //     setEditingNodeId(null);
    //   }
    // });
    network.on('doubleClick', (event) => {
      const canvasPosition = network.canvasToDOM(event.pointer.canvas);
      const nodeId = network.getNodeAt(canvasPosition);
      const edgeId = network.getEdgeAt(canvasPosition);
      if (nodeId !== undefined) {
        setEditingNodeId(nodeId as string);
        setShowPopup(true);
        const node = nodes.get(nodeId);
        if (node && inputRef.current) {
          inputRef.current.value = node.label;
          inputRef.current.focus();
        }
      } else if (edgeId !== undefined) {
        setEditingEdgeId(edgeId as string);
        setShowPopup(true);
        const edge = edges.get(edgeId);
        if (edge && inputRef.current) {
          inputRef.current.value = edge.label;
          inputRef.current.focus();
        }
      } else {
        setShowPopup(false);
        setEditingNodeId(null);
        setEditingEdgeId(null);
      }
    });
  }, [currentOption, edges, isEdit, nodes, setGraphData]);

  const handleEnterPress = () => {
    if (editingNodeId !== null) {
      const updatedNode = nodes.get(editingNodeId);
      if (updatedNode && inputRef.current) {
        updatedNode.label = inputRef.current.value;
        nodes.update(updatedNode);
      }
      setEditingNodeId(null);
    }
    if (editingEdgeId !== null) {
      const currentEdges = edges.get();
      const updatedEdge = edges.get(editingEdgeId);
      if (updatedEdge && currentEdges) {
        currentEdges.forEach((edge) => {
          if (edge.id === updatedEdge.id && inputRef.current) {
            const newEdge = { ...edge };
            newEdge.label = inputRef.current.value;
            const index = currentEdges.findIndex((e) => e.id === updatedEdge.id);
            if (index !== -1) {
              currentEdges[index] = newEdge;
            }
          }
        });
        edges.update(currentEdges);
      }
      setEditingEdgeId(null);
    }
    setGraphData(transformNodesAndEdgesToData(nodes, edges));
    setShowPopup(false);
  };

  useEffect(() => {
    if (visJsRef.current) {
      apdateGraphControls(visJsRef);
    }
  }, []);

  const onClosePopup = useCallback(() => {
    setShowPopup(false);
    setEditingNodeId(null);
  }, []);

  return (
    <div className={styles.visContainer}>
      <div ref={visJsRef} style={{ height: '500px', width: '100%' }} />
      <div
        className={cx(styles.popup, {
          [styles.show]: showPopup,
        })}
      >
        <div className={styles.popup_container}>
          <input
            type="text"
            onKeyUp={(event) => {
              if (event.key === 'Enter') {
                handleEnterPress();
              }
            }}
            ref={inputRef}
          />
          <ButtonIcon image={closeModalIcon} onClick={onClosePopup} />
        </div>
      </div>
    </div>
  );
});
