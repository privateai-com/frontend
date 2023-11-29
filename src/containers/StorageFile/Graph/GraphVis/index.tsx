import React, {
  FC, memo, useCallback, useEffect, useMemo, useRef, useState, 
} from 'react';
import {
  Data,
  DataInterfaceEdges,
  DataInterfaceNodes,
  DataSet,
  Edge,
  Network,
  Node,
  Position, 
} from 'vis-network';
import cx from 'classnames';
import 'vis-network/styles/vis-network.css';

import { DatasetEdgeType, DatasetNodeType } from 'containers/StorageFile/types';
import { Button, ButtonIcon } from 'components';
import { closeModalIcon } from 'assets';
import { GraphResponseType } from 'types';
import { options } from './constants';
import { apdateGraphControls } from './hooks';
import { transformNodesAndEdgesToData } from '../utils';

import styles from './styles.module.scss';

interface ExtendedNetwork extends Network {
  body: {
    data: {
      nodes: DataSet<Node>;
      edges: DataSet<Edge>;
    };
  };
}

interface GraphVisProps {
  setGraphData: (edges: GraphResponseType[]) => void
  nodes: DatasetNodeType,
  edges: DatasetEdgeType,
  isEdit: boolean,
  setNodesLabelWithoutEdges: (args0: string[]) => void,
}

export const GraphVis: FC<GraphVisProps> = memo(({
  nodes, edges, isEdit, setGraphData, setNodesLabelWithoutEdges,
}) => {
  const visJsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [editingNodeId, setEditingNodeId] = useState<string | null>(null);
  const [editingEdgeId, setEditingEdgeId] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const networkRef = useRef<ExtendedNetwork | null>(null);
  const [shouldDeleteNode, setShouldDeleteNode] = useState(false);

  const getNodesLabelWithoutEdges = useCallback(() => {
    if (networkRef.current) {
      const nodesWithoutEdges: string[] = [];
      const allNodes = nodes.get(); // Получаем идентификаторы всех узлов

      allNodes.forEach((node) => {
        const connectedEdges = (networkRef.current as ExtendedNetwork).getConnectedEdges(node.id);

        if (connectedEdges.length === 0) {
          nodesWithoutEdges.push(node.label);
        }
      });
      setNodesLabelWithoutEdges(nodesWithoutEdges);
    }
  }, [nodes, setNodesLabelWithoutEdges]);

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

    setShouldDeleteNode(true);
    callback(newNode);
  }, [nodes]);

  const handleEditNode = useCallback((data: Node, callback: (data: Node) => void) => {
    setEditingNodeId(data.id as string);
    setShowPopup(true);
    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.value = data.label || '';
      setTimeout(() => {
        inputElement.focus();
        inputElement.select();
      }, 10);
    }
    setShouldDeleteNode(inputRef.current?.value.trim() === '');
    callback(data);
  }, []);

  const handleAddEdge = useCallback((data: Edge, callback: (data: Edge) => void) => {
    if (!data.to || !data.from) return;
    const nodeTo = nodes.get(data.to);
    const nodeFrom = nodes.get(data.from);
    if (!nodeTo || !nodeFrom) return;
    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.value = data.label || '';
      setTimeout(() => {
        inputElement.focus();
        inputElement.select();
      }, 10);
    }

    const newEdgeId = (edges.length + 1).toString();
    setEditingEdgeId(newEdgeId);
    callback({ ...data, id: newEdgeId });
    setShowPopup(true);
    setGraphData(transformNodesAndEdgesToData(nodes, edges));
    getNodesLabelWithoutEdges();
  }, [edges, getNodesLabelWithoutEdges, nodes, setGraphData]);

  const handleDeleteEdge = useCallback((data: Data, callback: (data: Data) => void) => {
    if (Array.isArray(data?.edges) && data.edges.length === 1) {
      const edgeIdToDelete = data.edges[0];
      const currentEdge = edges.get().find(({ id }) => id === edgeIdToDelete);
      if (!currentEdge) return;
      const nodeFrom = nodes.get(currentEdge.from);
      if (!nodeFrom) return;
    }
    callback(data);
    setGraphData(transformNodesAndEdgesToData(nodes, edges));
    getNodesLabelWithoutEdges();
  }, [edges, getNodesLabelWithoutEdges, nodes, setGraphData]);

  const handleDeleteNode = useCallback((data: Data, callback: (data: Data) => void) => {
    if (!Array.isArray(data?.nodes)) return;
    callback(data);
    setGraphData(transformNodesAndEdgesToData(nodes, edges));
    getNodesLabelWithoutEdges();
  }, [edges, getNodesLabelWithoutEdges, nodes, setGraphData]);

  const currentOption = useMemo(() => ({
    ...options,
    manipulation: {
      enabled: isEdit,
      initiallyActive: isEdit,
      addNode: handleAddNode,
      editNode: handleEditNode,
      addEdge: handleAddEdge,
      deleteNode: handleDeleteNode,
      deleteEdge: handleDeleteEdge,
    }, 
  }), [handleAddEdge, handleAddNode, handleDeleteEdge, handleDeleteNode, handleEditNode, isEdit]);

  useEffect(() => {
    if (networkRef.current != null) {
      networkRef.current.destroy();
      networkRef.current = null;
    }
    networkRef.current = visJsRef.current &&
      new Network(
        visJsRef.current, 
        { nodes: nodes as DataInterfaceNodes, edges: edges as DataInterfaceEdges },
        currentOption,
      ) as ExtendedNetwork;
    apdateGraphControls(visJsRef);

    const onDoubleClick = (event: { pointer: { canvas: Position; }; }) => {
      if (!networkRef.current) return;
      const canvasPosition = networkRef.current.canvasToDOM(event.pointer.canvas);
      const nodeId = networkRef.current.getNodeAt(canvasPosition);
      const edgeId = networkRef.current.getEdgeAt(canvasPosition);
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
          inputRef.current.value = edge.label ?? '';
          inputRef.current.focus();
        }
      } else {
        setShowPopup(false);
        setEditingNodeId(null);
        setEditingEdgeId(null);
      }
    };

    if (networkRef.current) networkRef.current.on('doubleClick', onDoubleClick);

    return () => {
      if (networkRef.current) {
        networkRef.current.off('doubleClick', onDoubleClick);
        networkRef.current.destroy();
        networkRef.current = null;
      }
    };
  }, [currentOption, edges, isEdit, nodes, setGraphData]);

  const handleEnterPress = () => {
    if (editingNodeId !== null) {
      const updatedNode = nodes.get(editingNodeId);
      if (updatedNode && inputRef.current) {
        if (inputRef.current.value.trim() === '') {
          setShouldDeleteNode(true);
        } else {
          updatedNode.label = inputRef.current.value;
          nodes.update(updatedNode);
        }
      }
      setEditingNodeId(null);
    }

    if (editingEdgeId !== null || editingEdgeId !== undefined) {
      const currentEdges = edges.get();
      const updatedEdge = edges.get(editingEdgeId as string);
      if (updatedEdge && currentEdges) {
        const newLabel = inputRef.current?.value.trim();
        if (newLabel) {
          currentEdges.forEach((edge) => {
            if (edge.id === updatedEdge.id) {
              const newEdge = { ...edge };
              newEdge.label = newLabel;
              const index = currentEdges.findIndex((e) => e.id === updatedEdge.id);
              if (index !== -1) {
                currentEdges[index] = newEdge;
              }
            }
          });
          edges.update(currentEdges);
        } else {
          edges.remove(editingEdgeId as string);
        }
      }
      setEditingEdgeId(null);
    }
    setGraphData(transformNodesAndEdgesToData(nodes, edges));
    getNodesLabelWithoutEdges();
    setShowPopup(false);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Delete' && networkRef.current && isEdit) {
        const selectedNodes = networkRef.current.getSelectedNodes();
        const selectedEdges = networkRef.current.getSelectedEdges();
        if (selectedNodes.length > 0) {
          nodes.remove(selectedNodes);
        }
        if (selectedEdges.length > 0) {
          edges.remove(selectedEdges);
        }
        setGraphData(transformNodesAndEdgesToData(nodes, edges));
        getNodesLabelWithoutEdges();
        setShowPopup(false);
        networkRef.current.unselectAll();
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
  
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [edges, getNodesLabelWithoutEdges, isEdit, nodes, setGraphData]);

  useEffect(() => {
    if (visJsRef.current) {
      apdateGraphControls(visJsRef);
    }
  }, []);

  const onClosePopup = useCallback(() => {
    if (shouldDeleteNode) {
      nodes.remove(editingNodeId as string);
    }
  
    if (editingEdgeId !== null) {
      const updatedEdge = edges.get(editingEdgeId);
      if (updatedEdge) {
        const newLabel = inputRef.current?.value.trim();
        if (!newLabel) {
          edges.remove(editingEdgeId);
          setGraphData(transformNodesAndEdgesToData(nodes, edges));
        }
      }
    }
  
    setShowPopup(false);
    setEditingNodeId(null);
    setEditingEdgeId(null);
    setShouldDeleteNode(false);
  }, [shouldDeleteNode, editingEdgeId, nodes, editingNodeId, edges, setGraphData]);

  // useEffect(() => {
  //   if (networkRef.current) {
  //     const nodesWithoutEdges: string[] = [];
  //     const allNodes = nodes.getIds(); // Получаем идентификаторы всех узлов

  //     allNodes.forEach((nodeId) => {
  //       const connectedEdges = networkRef.current.getConnectedEdges(nodeId);

  //       if (connectedEdges.length === 0) {
  //         nodesWithoutEdges.push(nodeId as string);
  //       }
  //     });
  //     console.log({ nodesWithoutEdges })
  //     setNodesLabelWithoutEdges(nodesWithoutEdges);
  //   }
  // }, [nodes, setNodesLabelWithoutEdges]);

  return (
    <div className={styles.visContainer}>
      <div className={styles.visWrapper} ref={visJsRef} />
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
          <Button className={styles.popup_button_ok} onClick={handleEnterPress}>Ok</Button>
          <ButtonIcon image={closeModalIcon} onClick={onClosePopup} />
        </div>
      </div>
    </div>
  );
});
