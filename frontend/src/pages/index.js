import GraphContainer from '@/components/Graph/GraphContainer';
import { dummyData } from '@/constants/dummyData';

export default function Home() {
  return (
    <main className="min-h-screen">
      <GraphContainer data={dummyData} />
    </main>
  );
}