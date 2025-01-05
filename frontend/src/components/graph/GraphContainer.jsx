import { useEffect, useRef, useState } from 'react';
import cytoscape from 'cytoscape';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import NodeDetails from './NodeDetails';
import GraphControls from './GraphControls';
import cola from 'cytoscape-cola';
import CreateNodeDialog from './CreateNodeDialog';
import { graphStyles } from '../../constants/graphStyles';
import { toast } from 'sonner'
import { editNode } from '../../pages/api/endpoint';
import { Const } from '@/utils/Constant';

cytoscape.use(cola);

const GraphContainer = ({ data, setUpdate, handleSearch }) => {
  const cyRef = useRef(null);
  const [cy, setCy] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  
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

  const handleCreateNode = async(newNode) => {

    try {
      const res = await fetch(`${Const.Link}api/graph`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNode),
      });
      setUpdate((prev)=>!prev);
      toast.success('Node created successfully');
    } catch (error) {
      console.error(error);
    }

  };

  const handleEditNode = async (updatedNode) => {
    try {
      const agentId = selectedNode.id;
      const userId = selectedNode.userId || 'default'; // Adjust based on your data structure
      await editNode(userId, JSON.stringify(updatedNode), agentId);
      setUpdate(prev => !prev);
      toast.success('Node updated successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to update node');
    }
  };

  const transformData = (data) => {
    const elements = [];
    if(data){ 
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
  }
    return elements;
  };

  console.log(selectedNode,"selectedNode")


  return (
    <>
    <div className="h-screen flex">
      <div className="w-3/4 relative">
        <div className="absolute top-4 left-4 z-10 flex gap-2">
          <input
            placeholder="Search nodes..."
            value={searchTerm}
            style={{backgroundColor:"#171717", padding:"0.3rem 0.4rem", color:"white", borderRadius:"5px", }}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 color-white"
          />
          <Button onClick={()=>{handleSearch(searchTerm)}}>Search</Button>
        </div>
        <GraphControls cy={cy} />
        <div ref={cyRef} className="w-full h-full" />
      </div>
      <div className="w-1/4 p-4 border-l pt-20">
        {selectedNode ? (
          <NodeDetails node={selectedNode} onEdit={handleEditNode} />
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