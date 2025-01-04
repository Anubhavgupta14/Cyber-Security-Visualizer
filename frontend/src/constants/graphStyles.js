export const graphStyles = [
    {
      selector: 'node',
      style: {
        'background-color': '#4299e1',
        'label': 'data(label)',
        'width': 30,
        'height': 30,
        'font-size': 12,
      }
    },
    {
      selector: 'edge',
      style: {
        'width': 2,
        'line-color': '#a0aec0',
        'target-arrow-color': '#a0aec0',
        'target-arrow-shape': 'triangle',
        'curve-style': 'bezier'
      }
    },
    {
      selector: '.highlighted',
      style: {
        'background-color': '#48bb78',
        'line-color': '#48bb78',
        'target-arrow-color': '#48bb78',
      }
    }
  ];