import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { useState } from "react";

const EditToolDialog = ({ node, onSubmit }) => {

    console.log("Node",node);

  const [formData, setFormData] = useState({
    name: node.name || node.label || "",
    input: node.input || "",
    output: node.output || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Tool</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Tool</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label style={{color:"black"}}>Name</label>
            <Input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div>
            <label style={{color:"black"}}>Input</label>
            <Input
              value={formData.input}
              onChange={(e) =>
                setFormData({ ...formData, input: e.target.value })
              }
            />
          </div>
          <div>
            <label style={{color:"black"}}>Output</label>
            <Input
              value={formData.output}
              onChange={(e) =>
                setFormData({ ...formData, output: e.target.value })
              }
            />
          </div>
          <Button type="submit">Save Changes</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditToolDialog;
