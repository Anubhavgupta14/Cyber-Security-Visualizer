# Cyber Security Graph

A graph-based visualization and analysis tool for cyber security relationships and dependencies.

## Project Overview

This project implements a graph-based system to visualize and analyze relationships between various cyber security components, vulnerabilities, and dependencies.

### Graph Structure

![Graph Structure](./docs/images/graph-structure.png)

The graph consists of:
- Nodes: Representing security entities (assets, vulnerabilities, controls)
- Edges: Representing relationships and dependencies
- Properties: Attributes for both nodes and edges

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/Anubhavgupta14/Cyber-Security-Graph.cd Cyber-Security-Graph
```

2. Select Frontend & Backend:
```bash
For Frontend
cd frontend

For Backend
cd Backend
```

3. Install dependencies:
```bash
npm install
```

4. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your settings
```

5. Run the application:
```bash
npm start
```

## API Documentation

### Graph Operations

#### GET /api/graph
Returns the complete graph structure.

**Response:**
```json
{
    "nodes": [...],
    "edges": [...],
    "metadata": {...}
}
```

#### POST /api/nodes
Adds a new node to the graph.

**Request Body:**
```json
{
    "type": "asset",
    "properties": {...}
}
```

[Additional API endpoints documentation...]

## Performance Benchmarks

| Operation | Average Response Time | Load Time | Notes |
|-----------|---------------------|-----------|--------|
| Graph Load | 1.2s | 0.8s | Initial load |
| Node Query | 150ms | - | Single node |
| Path Search | 350ms | - | Depth-first |

## Limitations

1. **Scalability**: Current implementation efficiently handles graphs up to 10,000 nodes. Larger graphs may require pagination or streaming.

2. **Real-time Updates**: Updates are currently pull-based. Push notifications for real-time updates are planned.

3. **Browser Support**: Optimized for modern browsers. IE11 and below not supported.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and submission process.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
