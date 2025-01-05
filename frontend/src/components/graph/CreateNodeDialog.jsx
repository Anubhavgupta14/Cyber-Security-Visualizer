import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Plus, Trash2 } from "lucide-react"

const CreateNodeDialog = ({ onSubmit, mode = 'create', initialData = null }) => {
  const [formData, setFormData] = useState({
    query: '',
    agentName: '',
    tools: [
      {
        name: '',
        input: '',
        output: '',
      }
    ],
    agentOutput: '',
    response: ''
  });


  useEffect(() => {
    if (mode === 'edit' && initialData) {


      setFormData({
        query: initialData.query || '',
        agentName: initialData.name || '',
        tools: initialData.tools || [{ name: '', input: '', output: '' }],
        agentOutput: initialData.output || '',
        response: initialData.response || ''
      });
    }
  }, [initialData, mode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newNode = {
      timestamp: new Date().toISOString(),
      idx: `msg_${Math.random().toString(36).substr(2, 9)}`,
      query: formData.query,
      agents: [
        {
          name: formData.agentName,
          tools: formData.tools.map(tool => ({
            ...tool,
            idx: `tool_${Math.random().toString(36).substr(2, 9)}`,
          })),
          images: [],
          output: formData.agentOutput,
          idx: `agent_${Math.random().toString(36).substr(2, 9)}`,
        }
      ],
      response: formData.response,
      total_tokens: 1909,
      is_active: true,
    };

    onSubmit(newNode);
  };

  const addTool = () => {
    setFormData({
      ...formData,
      tools: [...formData.tools, { name: '', input: '', output: '' }]
    });
  };

  const removeTool = (index) => {
    if (formData.tools.length === 1) return;
    const newTools = formData.tools.filter((_, i) => i !== index);
    setFormData({ ...formData, tools: newTools });
  };

  const updateTool = (index, field, value) => {
    const newTools = [...formData.tools];
    newTools[index] = { ...newTools[index], [field]: value };
    setFormData({ ...formData, tools: newTools });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={mode === 'create' ? "absolute top-4 right-4 z-10" : ""}>
          {mode === 'create' ? 'Create Node' : 'Edit Node'}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{mode === 'create' ? 'Create New' : 'Edit'} Security Analysis</DialogTitle>
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
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Tools</Label>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={addTool}
                className="flex items-center gap-2 color-[#000]"
              >
                <Plus style={{color:"black"}} className="w-4 h-4" />
                <p style={{color:"black"}}>Add Tool</p>
              </Button>
            </div>
            
            {formData.tools.map((tool, index) => (
              <div key={index} className="space-y-4 p-4 border rounded-lg relative">
                {formData.tools.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => removeTool(index)}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                )}
                
                <div>
                  <Label>Tool Name</Label>
                  <Input 
                    value={tool.name}
                    onChange={(e) => updateTool(index, 'name', e.target.value)}
                    placeholder="SQL Analyzer"
                  />
                </div>
                
                <div>
                  <Label>Tool Input</Label>
                  <Input 
                    value={tool.input}
                    onChange={(e) => updateTool(index, 'input', e.target.value)}
                    placeholder="Enter tool input"
                  />
                </div>
                
                <div>
                  <Label>Tool Output</Label>
                  <Input 
                    value={tool.output}
                    onChange={(e) => updateTool(index, 'output', e.target.value)}
                    placeholder="Enter tool output"
                  />
                </div>
              </div>
            ))}
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

          <Button type="submit" className="w-full">
            {mode === 'create' ? 'Create' : 'Save Changes'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNodeDialog;