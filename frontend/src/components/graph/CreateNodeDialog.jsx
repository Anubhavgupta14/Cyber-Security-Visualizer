import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const CreateNodeDialog = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    query: '',
    agentName: '',
    toolName: '',
    toolInput: '',
    toolOutput: '',
    agentOutput: '',
    response: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newNode = {
      timestamp: new Date().toISOString(),
      idx: `msg_${Math.random().toString(36).substr(2, 9)}`,
      query: formData.query,
      agents: [
        {
          name: formData.agentName,
          tools: [
            {
              name: formData.toolName,
              input: formData.toolInput,
              output: formData.toolOutput,
              idx: `tool_${Math.random().toString(36).substr(2, 9)}`,
              _id: Math.random().toString(36).substr(2, 9)
            }
          ],
          images: [],
          output: formData.agentOutput,
          idx: `agent_${Math.random().toString(36).substr(2, 9)}`,
          _id: Math.random().toString(36).substr(2, 9)
        }
      ],
      response: formData.response,
      total_tokens: 0,
      is_active: true,
      _id: Math.random().toString(36).substr(2, 9)
    };

    onSubmit(newNode);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="absolute top-4 right-4 z-10">Create Node</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Security Analysis</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Query</Label>
            <Input 
              value={formData.query}
              onChange={(e) => setFormData({...formData, query: e.target.value})}
              placeholder="Enter query"
            />
          </div>
          
          <div>
            <Label>Agent Name</Label>
            <Input 
              value={formData.agentName}
              onChange={(e) => setFormData({...formData, agentName: e.target.value})}
              placeholder="Security Scanner"
            />
          </div>
          
          <div>
            <Label>Tool Name</Label>
            <Input 
              value={formData.toolName}
              onChange={(e) => setFormData({...formData, toolName: e.target.value})}
              placeholder="SQL Analyzer"
            />
          </div>
          
          <div>
            <Label>Tool Input</Label>
            <Input 
              value={formData.toolInput}
              onChange={(e) => setFormData({...formData, toolInput: e.target.value})}
              placeholder="Enter tool input"
            />
          </div>
          
          <div>
            <Label>Tool Output</Label>
            <Input 
              value={formData.toolOutput}
              onChange={(e) => setFormData({...formData, toolOutput: e.target.value})}
              placeholder="Enter tool output"
            />
          </div>
          
          <div>
            <Label>Agent Output</Label>
            <Input 
              value={formData.agentOutput}
              onChange={(e) => setFormData({...formData, agentOutput: e.target.value})}
              placeholder="Enter agent output"
            />
          </div>
          
          <div>
            <Label>Response</Label>
            <Input 
              value={formData.response}
              onChange={(e) => setFormData({...formData, response: e.target.value})}
              placeholder="Enter final response"
            />
          </div>

          <Button type="submit" className="w-full">Create</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNodeDialog;