import {
  RefObject, useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import {
  Data,
  DataInterfaceEdges,
  DataInterfaceNodes,
  Edge,
  Network,
  Node,
  Position,
} from 'vis-network';
import { GraphResponseType } from 'types';
import { notification } from 'utils';
import { DatasetEdgeType, DatasetNodeType, ExtendedNetwork } from './types';
import { transformNodesAndEdgesToData } from './Graph/utils';
import { options } from './Graph/GraphVis/constants';

interface GraphControlsProps {
  // network: ExtendedNetwork | null;
  nodes: DatasetNodeType;
  edges: DatasetEdgeType;
  setNodesLabelWithoutEdges: (args0: string[]) => void,
  inputRef: RefObject<HTMLInputElement>;
  graphRef: RefObject<HTMLDivElement>;
  setGraphData: (edges: GraphResponseType[]) => void;
  isEdit: boolean;
}

export const useGraphControls = ({
  nodes, edges, setNodesLabelWithoutEdges,
  inputRef, setGraphData, isEdit, graphRef,
}: GraphControlsProps) => {
  const networkRef = useRef<ExtendedNetwork | null>(null);
  const [editingNodeId, setEditingNodeId] = useState<string | null>(null);
  const [editingEdgeId, setEditingEdgeId] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [shouldDeleteNode, setShouldDeleteNode] = useState(false);

  const getNodesLabelWithoutEdges = useCallback(() => {
    const network = networkRef.current;
    if (network) {
      const nodesWithoutEdges: string[] = [];
      const allNodes = nodes.get();

      allNodes.forEach((node) => {
        const connectedEdges = network.getConnectedEdges(node.id);

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
    const inputElement = inputRef?.current;
    if (inputElement) {
      inputElement.value = newNode.label || '';
      setTimeout(() => {
        inputElement.focus();
        inputElement.select();
      }, 10);
    }

    setShouldDeleteNode(true);
    callback(newNode);
  }, [inputRef, nodes.length]);

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
  }, [inputRef]);

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
  }, [edges, getNodesLabelWithoutEdges, inputRef, nodes, setGraphData]);

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

  useEffect(() => {
    const network = networkRef.current;
    
    const onDoubleClick = (event: { pointer: { canvas: Position; }; }) => {
      if (!network) return;
      const canvasPosition = network.canvasToDOM(event.pointer.canvas);
      const nodeId = network.getNodeAt(canvasPosition);
      const edgeId = network.getEdgeAt(canvasPosition);
      if (nodeId !== undefined) {
        setEditingNodeId(nodeId as string);
        setShowPopup(true);
        const node = nodes.get(nodeId);
        if (node && inputRef.current) {
          // eslint-disable-next-line no-param-reassign
          inputRef.current.value = node.label;
          inputRef.current.focus();
        }
      } else if (edgeId !== undefined) {
        setEditingEdgeId(edgeId as string);
        setShowPopup(true);
        const edge = edges.get(edgeId);
        if (edge && inputRef.current) {
          // eslint-disable-next-line no-param-reassign
          inputRef.current.value = edge.label ?? '';
          inputRef.current.focus();
        }
      } else {
        setShowPopup(false);
        setEditingNodeId(null);
        setEditingEdgeId(null);
      }
    };

    if (network) network.on('doubleClick', onDoubleClick);

    return () => {
      if (network) {
        network.off('doubleClick', onDoubleClick);
        network.destroy();
        // network = null;
      }
    };
  }, [edges, inputRef, nodes, setGraphData]);

  const handleEnterPress = useCallback(() => {
    if (editingNodeId !== null) {
      const updatedNode = nodes.get(editingNodeId);
      if (updatedNode && inputRef.current) {
        const newLabel = inputRef.current.value.trim();
        const existingNode = nodes.get({
          filter: (node) => node.label === newLabel && node.id !== editingNodeId,
        });

        if (existingNode.length > 0) {
          notification.info({ message: `Node with label "${newLabel}" already exists` });
          return;
        } if (newLabel === '') {
          setShouldDeleteNode(true);
        } else {
          updatedNode.label = newLabel;
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
  }, [
    edges, editingEdgeId, editingNodeId, getNodesLabelWithoutEdges,
    inputRef, nodes, setGraphData]);

  useEffect(() => {
    const network = networkRef.current;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Delete' && network && isEdit) {
        const selectedNodes = network.getSelectedNodes();
        const selectedEdges = network.getSelectedEdges();
        if (selectedNodes.length > 0) {
          nodes.remove(selectedNodes);
        }
        if (selectedEdges.length > 0) {
          edges.remove(selectedEdges);
        }
        setGraphData(transformNodesAndEdgesToData(nodes, edges));
        getNodesLabelWithoutEdges();
        setShowPopup(false);
        network.unselectAll();
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
  
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [edges, getNodesLabelWithoutEdges, isEdit, nodes, setGraphData]);

  // useEffect(() => {
  //   if (visJsGraphRef) {
  //     updateGraphControls(visJsGraphRef);
  //   }
  // }, [visJsGraphRef]);

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
  }, [shouldDeleteNode, editingEdgeId, nodes, editingNodeId, edges, inputRef, setGraphData]);

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
    networkRef.current = graphRef.current &&
      new Network(
        graphRef.current, 
        { nodes: nodes as DataInterfaceNodes, edges: edges as DataInterfaceEdges },
        currentOption,
      ) as ExtendedNetwork;
    // updateGraphControls(visJsGraphRef);
  }, [currentOption, edges, graphRef, nodes]);

  return {
    showPopup,
    handleEnterPress,
    onClosePopup,
  };
};
