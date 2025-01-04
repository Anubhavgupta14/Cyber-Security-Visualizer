export const graphStyles = [
  {
    selector: 'node',
    style: {
      'background-color': '#4299e1',
      'label': 'data(label)',
      'color': '#ffffff',
      'text-outline-color': '#000000',
      'text-outline-width': 1,
      'width': 50,
      'height': 50,
      'font-size': 8,
      'text-valign': 'center',
      'text-halign': 'center',
      'text-wrap': 'wrap',
      'text-max-width': 80,
      'padding': '15px'
    }
  },
  {
    selector: 'edge',
    style: {
      'width': 2,
      'line-color': '#a0aec0',
      'target-arrow-color': '#a0aec0',
      'target-arrow-shape': 'triangle',
      'curve-style': 'bezier',
      'label': 'data(label)', // Show edge labels
      'font-size': 8,
      'text-background-color': '#ffffff', // White background for edge labels
      'text-background-opacity': 1,
      'text-background-padding': 3,
      'text-background-shape': 'roundrectangle',
      'color': '#4a5568' // Dark gray text for edge labels
    }
  },
  {
    selector: '.highlighted',
    style: {
      'background-color': '#48bb78',
      'line-color': '#48bb78',
      'target-arrow-color': '#48bb78',
      'color': '#ffffff',
      'text-outline-color': '#2f855a',
      'text-outline-width': 1
    }
  },
  {
    selector: 'node:selected',
    style: {
      'border-width': 2,
      'border-color': 'white',
      'border-opacity': 1
    }
  },
  {
    selector: 'edge:selected',
    style: {
      'width': 3,
      'line-color': '#f6ad55',
      'target-arrow-color': '#f6ad55'
    }
  }
];