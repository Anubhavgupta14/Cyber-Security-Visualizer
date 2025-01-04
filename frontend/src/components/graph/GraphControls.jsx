import { Button } from '../ui/button';

const GraphControls = ({ cy }) => {
  const handleZoomIn = () => cy?.zoom(cy.zoom() * 1.2);
  const handleZoomOut = () => cy?.zoom(cy.zoom() * 0.8);
  const handleFit = () => cy?.fit();

  return (
    <div className="absolute bottom-4 left-4 z-10 flex gap-2">
      <Button onClick={handleZoomIn}>Zoom In</Button>
      <Button onClick={handleZoomOut}>Zoom Out</Button>
      <Button onClick={handleFit}>Fit</Button>
    </div>
  );
};

export default GraphControls;