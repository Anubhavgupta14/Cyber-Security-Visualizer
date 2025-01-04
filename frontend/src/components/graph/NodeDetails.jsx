import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const NodeDetails = ({ node }) => {
  if (!node) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{node.label}</CardTitle>
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