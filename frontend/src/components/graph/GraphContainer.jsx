import { useEffect, useRef, useState } from 'react';
import cytoscape from 'cytoscape';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import NodeDetails from './NodeDetails';
import GraphControls from './GraphControls';
import cola from 'cytoscape-cola';
import CreateNodeDialog from './CreateNodeDialog';
import { graphStyles } from '../../constants/graphStyles';

cytoscape.use(cola);

const GraphContainer = ({ data }) => {
  const cyRef = useRef(null);
  const [cy, setCy] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  
  useEffect(() => {
    if (!cyRef.current) return;

    const cyInstance = cytoscape({
        container: cyRef.current,
        elements: transformData(data),
        style: graphStyles,
        layout: {
          name: 'cola',
          animate: true,
          refresh: 1,
          maxSimulationTime: 2000,
          nodeSpacing: 30,
          edgeLength: 100,
          randomize: true
        }
      });

    cyInstance.on('tap', 'node', (evt) => {
      setSelectedNode(evt.target.data());
    });

    setCy(cyInstance);
    return () => cyInstance.destroy();
  }, [data]);

  const handleCreateNode = (newNode) => {
    const elements = transformData([newNode]);
    cy.add(elements);
    cy.layout({ name: 'cola' }).run();
  };

  const transformData = (data) => {
    const elements = [];
    data.forEach(item => {
      item.agents.forEach(agent => {
        elements.push({
          data: {
            id: agent._id,
            label: agent.name,
            type: 'agent',
            ...agent
          }
        });

        agent.tools.forEach(tool => {
          elements.push({
            data: {
              id: tool._id,
              label: tool.name,
              type: 'tool',
              ...tool
            }
          });

          elements.push({
            data: {
              source: agent._id,
              target: tool._id,
              label: 'uses',
            }
          });
        });
      });
    });
    return elements;
  };

  const handleSearch = () => {
    if (!cy) return;
    cy.elements().removeClass('highlighted');
    if (searchTerm) {
      cy.elements().filter(ele => 
        ele.data().label.toLowerCase().includes(searchTerm.toLowerCase())
      ).addClass('highlighted');
    }
  };

  return (
    <>
    <div className="h-screen flex">
      <div className="w-3/4 relative">
        <div className="absolute top-4 left-4 z-10 flex gap-2">
          <Input
            placeholder="Search nodes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Button onClick={handleSearch}>Search</Button>
        </div>
        <GraphControls cy={cy} />
        <div ref={cyRef} className="w-full h-full" />
      </div>
      <div className="w-1/4 p-4 border-l">
        {selectedNode ? (
          <NodeDetails node={selectedNode} />
        ) : (
          <Card className="p-4">
            <p>Select a node to view details</p>
          </Card>
        )}
      </div>
    </div>
    <CreateNodeDialog onSubmit={handleCreateNode} />
    </>

  );
};

export default GraphContainer;