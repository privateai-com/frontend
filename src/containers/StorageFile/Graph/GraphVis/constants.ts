export const options = {
  interaction: {
    hover: true,
    navigationButtons: true,
  },
  layout: {
    randomSeed: 6,
    // improvedLayout:true,
    improvedLayout: false,
    // clusterThreshold: 150,
    hierarchical: {
      enabled: false,
      // levelSeparation: 150,
      // nodeSpacing: 100,
      // treeSpacing: 200,
      // blockShifting: false,
      // edgeMinimization: true,
      // parentCentralization: false,
      // direction: 'UD',        // UD, DU, LR, RL
      // sortMethod: 'hubsize',  // hubsize, directed
      // shakeTowards: 'leaves'
    },
  },
  autoResize: true,
  height: '100%',
  width: '100%',
  physics: {
    enabled: true,
    // solver: 'forceAtlas2Based',
    barnesHut: {
      gravitationalConstant: -6000,
      springConstant: 0.001,
      springLength: 150,
      // avoidOverlap: 0.01,
    },
  },
  nodes: {
    shape: 'dot',
    size: 16,
    color: {
      background: '#fff',
      border: '#00DEA3',
      hover: {
        background: '#fff',
        border: '#747474',
      },
      highlight: {
        background: '#fff',
        border: '#747474',
      },
    },
    borderWidth: 3,
    font: {
      color: '#747474',
      face: 'Montserrat',
      size: 16,
      strokeWidth: 16,
      background: '#000',
    },
    shadow: {
      enabled: true,
      color: '#747474',
      size: 10,
      x: 0,
      y: 0,
    },
  },
  edges: {
    smooth: false,
    font: {
      align: 'top',
      color: '#747474',
      face: 'Montserrat',
      size: 16,
    },
    arrows: 'to',
    color: {
      color: '#747474',
    },
  },
};
