// @ts-nocheck
import {
  FC,
  useCallback, useEffect, useRef, useState,
} from 'react';
import * as d3 from 'd3';
import { zoom } from 'd3-zoom';
import { Button } from 'components';

import styles from './styles.module.scss';
import { GraphDataType, GraphResponseType, NodeDatum } from '../../types';
import {
  drag,
  initialGraphData,
  normalizeGraphEdges,
} from './utils';

const width = 687;
const height = 500;

interface GraphD3Props {
  edges: GraphResponseType[];
  setEdges: (edges: GraphResponseType[]) => void;
}

export const GraphD3: FC<GraphD3Props> = ({ edges, setEdges }) => {
  const svgRef = useRef<SVGGElement | null>(null);
  const [graph, setGraph] = useState<GraphDataType>(initialGraphData);
  const [showEdit, setShowEdit] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [editedValue, setEditedValue] = useState('');
  const [positionEdit, setPosition] = useState({ x: 0, y: 0 });

  function clearGraph() {
    if (svgRef.current) {
      d3.select(svgRef.current).selectAll('*').remove();
    }
  }

  const handleSaveClick = () => {
    setShowEdit(false);
  };

  const handleDeleteNode = useCallback((nodeData: NodeDatum) => {
    if (graph && graph?.nodes?.length) {
      const updatedEdges = [...edges];
      const indexToDelete =
      updatedEdges.findIndex((edge) => edge.head === nodeData.id || edge.type === nodeData.id);

      if (indexToDelete !== -1) {
        updatedEdges.splice(indexToDelete, 1);
        setEdges(updatedEdges);
      }
    }
  }, [graph, edges, setEdges]);
  
  useEffect(() => {
    clearGraph();
    if (!graph || !graph?.nodes?.length) return;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .on('mousedown', () => setShowEdit(false))
      .on('dblclick', (event) => event.preventDefault());

    const graphGroup = svg.append('g');

    const simulation: d3.Simulation<NodeDatum, d3.SimulationLinkDatum<NodeDatum>> =
    d3.forceSimulation(graph.nodes)
      .force('link', d3.forceLink(graph.links).id((d) => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-500))
      .force('center', d3.forceCenter(width / 2, height / 2));

    svg.append('defs').append('marker')
      .attr('id', 'arrow')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 17)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-3L10,0L0,3Z')
      .attr('fill', '#747474');

    const links = graphGroup.selectAll('.link')
      .data(graph.links)
      .enter()
      .append('line')
      .attr('class', 'link')
      .style('stroke', '#747474')
      .style('stroke-width', 4)
      .attr('marker-end', 'url(#arrow)'); 

    const nodes = graphGroup.selectAll('.node')
      .data(graph.nodes)
      .enter()
      .append('circle')
      .attr('class', 'node')
      // .attr('r', 20)
      .attr('r', 20)
      .style('fill', '#fff')
      .style('stroke', '#00DEA3')
      .style('stroke-width', 2)
      .style('background', 'radial-gradient(#00DEA3, transparent)')
      .call(drag(simulation))
      .on('dblclick', (event) => {
        event.preventDefault();
        setShowEdit((state) => !state);
        const svgT = d3.select(svgRef.current);
        const [x, y] = d3.pointer(event, svgT.node());
        setPosition({ x, y });
      })
      .on('contextmenu', (event, d) => {
        event.preventDefault();
        handleDeleteNode(d);
      });

    const labels = graphGroup.selectAll('.label')
      .data(graph.nodes)
      .enter()
      .append('text')
      .attr('class', 'label')
      .text((d) => d.id)
      .style('font-size', '24px')
      .attr('dy', '0.35em')
      .attr('dx', 24);

    function handleZoom(event: d3.D3ZoomEvent<SVGGElement, NodeDatum>) {
      const transformString = `matrix(${event.transform.k} 0 0 ${event.transform.k} ${event.transform.x} ${event.transform.y})`;
      graphGroup.attr('transform', transformString);
    }

    const zoomBehavior = zoom()
      .scaleExtent([0.1, 3])
      .on('zoom', handleZoom);

    const initialScale = 0.7;
    svg
      .call(zoomBehavior.transform, d3.zoomIdentity.scale(initialScale))
      .call(zoomBehavior)
      .on('dblclick.zoom', null);

    simulation
      .nodes(graph.nodes)
      .on('tick', () => {
        links
          .attr('x1', (d) => d.source.x)
          .attr('y1', (d) => d.source.y)
          .attr('x2', (d) => d.target.x)
          .attr('y2', (d) => d.target.y);

        nodes
          .attr('cx', (d) => d.x)
          .attr('cy', (d) => d.y);

        labels
          .attr('x', (d) => d.x)
          .attr('y', (d) => d.y);
      });

    simulation.force('link').links(graph.links);

    return () => {
      simulation.stop();
    };
  }, [graph, handleDeleteNode]);

  useEffect(() => {
    if (normalizeGraphEdges && edges?.length) {
      const normalizedEdges = normalizeGraphEdges([...edges]);
      setGraph(normalizedEdges);
    }
  }, [edges]);
  
  return (
    <div className={styles.graphD3_container}>
      <svg ref={svgRef} width="100%" height="100%" />
      {showEdit && (
        <div
          className={styles.edit}
          style={{ top: `${positionEdit.y}px`, left: `${positionEdit.x}px` }}
        >
          <input
            type="text"
            ref={inputRef}
            value={editedValue}
            onChange={(e) => setEditedValue(e.target.value)}
            placeholder="Edit node name"
          />
          <Button className={styles.button_save} onClick={handleSaveClick}>Save</Button>
          <Button className={styles.button_delete} onClick={handleSaveClick}>Delete node</Button>
        </div>
      )}
    </div>
  );
};
