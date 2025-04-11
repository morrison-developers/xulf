'use client';

import ReactFlow, {
  Background,
  Controls,
  addEdge,
  useEdgesState,
  useNodesState,
  Connection,
  Node,
} from 'react-flow-renderer';
import 'react-flow-renderer/dist/style.css';

interface FunctionEditorProps {
  modules: { id: string; type: string }[];
}

export default function FunctionEditor({ modules }: FunctionEditorProps) {
  const initialNodes: Node[] = modules.map((mod) => ({
    id: mod.id,
    type: 'default',
    data: { label: mod.type },
    position: { x: Math.random() * 300, y: Math.random() * 300 },
  }));

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = (connection: Connection) =>
    setEdges((eds) => addEdge(connection, eds));

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
