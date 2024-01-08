export const options = {
  interaction: {
    hover: true,
    navigationButtons: true,
    multiselect: true,
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
    timestep: 1,
    minVelocity: 5,
    // maxVelocity: 5,
    // stabilization: {
    //   enabled: true,
    // },
    // barnesHut: {
    //   gravitationalConstant: -8000,
    //   avoidOverlap: 1,
    //   springLength: 300,
    //   springConstant: 0.05,
    // },
    solver: 'forceAtlas2Based',
    forceAtlas2Based: {
      gravitationalConstant: -1000,
      springLength: 300,
      springConstant: 0.02,
      avoidOverlap: 1,
    },
  },
  nodes: {
    shape: 'dot',
    // shape: 'custom',
    size: 16,
    // size: 40,
    color: {
      background: '#fff',
      border: '#4659FE',
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
      // background: '#000',
    },
    shadow: {
      enabled: true,
      color: '#747474',
      size: 10,
      x: 0,
      y: 0,
    },
    // scaling: {
    //   // min: 10,
    //   // max: 30,
    //   label: {
    //     // min: 8,
    //     // max: 30,
    //     // drawThreshold: 12,
    //     // maxVisible: 10,
    //   },
    // },
    scaling: {
      min: 0,
      max: 60,
      label: {
        enabled: true,
        min: 0,
        max: 800,
        maxVisible: 800,
        // drawThreshold: 5,
      },
      // customScalingFunction(min, max, total, value) {
      //   if (max === min) {
      //     return 0.5;
      //   } 
      //   const scale = 1 / (max - min);
      //   return Math.max(0, (value - min) * scale);
      // },
    },
    // ctxRenderer: ({
    //   ctx, id, x, y, state: { selected, hover }, style, label,
    // }) => {
    //   const r = style.size;

    //   const drawNode = () => {
    //     ctx.drawSomeNode();
    //     // ctx.beginPath();
    //     // ctx.arc(x, y, r, 0, 2 * Math.PI);
    //     // ctx.save();
    //     // ctx.fillStyle = 'white';
    //     // ctx.strokeStyle = '#00DEA3';
    //     // // ctx.strokeWidth = '2px';
    //     // ctx.fill();

    //     // ctx.stroke();

    //     // const textWidth = ctx.measureText(label).width;
    //     // ctx.fillStyle = 'white';
    //     // ctx.fillRect(x - textWidth / 2 - 5, y + r, textWidth + 10, 20);

    //     // ctx.font = 'normal 16px Montserrat';
    //     // ctx.fillStyle = 'black';
    //     // ctx.textAlign = 'center';
    //     // ctx.fillText(label, x, y + r + 12);
    //     // ctx.restore();
    //   };
    //   return {
    //     drawNode,
    //     nodeDimensions: { width: 2 * r, height: 2 * r },
    //   };
    // },
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
