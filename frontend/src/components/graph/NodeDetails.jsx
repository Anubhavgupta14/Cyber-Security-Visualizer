import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import EditAgentDialog from './EditAgentDialog';
import EditToolDialog from './EditToolDialog';

const NodeDetails = ({ node, onEdit }) => {
  if (!node) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{node.label}</CardTitle>
        {node.type === 'agent' ? (
          <EditAgentDialog node={node} onSubmit={onEdit} />
        ) : (
          <EditToolDialog node={node} onSubmit={onEdit} />
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Type</h3>
            <p>{node.type}</p>
          </div>
          {node.output && (
            <div>
              <h3 className="font-medium">Output</h3>
              <p>{node.output}</p>
            </div>
          )}
          {node.input && (
            <div>
              <h3 className="font-medium">Input</h3>
              <p>{node.input}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default NodeDetails;