import { useState } from 'react';
import cytoscape from 'cytoscape';
import { graphStyles } from '@/constants/graphStyles';
import { transformData } from '@/lib/utils';

export function useGraph() {
  const [cy, setCy] = useState(null);

  const initializeGraph = (container, data) => {
    const cyInstance = cytoscape({
      container,
      elements: transformData(data),
      style: graphStyles,
      layout: {
        name: 'cola',
        animate: true,
        refresh: 1
      }
    });

    cyInstance.on('tap', 'node', (evt) => {
      setSelectedNode(evt.target.data());
    });

    setCy(cyInstance);
    return () => cyInstance.destroy();
  };

  return { cy, initializeGraph };
}