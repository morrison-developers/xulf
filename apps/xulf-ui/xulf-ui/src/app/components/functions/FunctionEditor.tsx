'use client';

import ReactFlow, {
  Background,
  Controls,
  addEdge,
  useEdgesState,
  useNodesState,
  Connection,
  Node,
  Edge,
  ReactFlowProvider,
} from 'react-flow-renderer';

import { useCallback, useMemo, useState } from 'react';
import { FunctionNodeComponent } from './function-nodes/FunctionNodeComponent';
import { DraggableFunctionNode } from './function-nodes/DraggableFunctionNode';
import type { FunctionConnection } from '../../types/functions';

export default function FunctionEditor() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [connections, setConnections] = useState<FunctionConnection[]>([]);

  const onConnect = useCallback((connection: Connection) => {
    // 1. Visual edge
    setEdges((eds) => addEdge(connection, eds));

    // 2. Logical function connection
    const { source, target } = connection;

    if (source && target) {
      setConnections((prev: FunctionConnection[]) => [
        ...prev,
        { from: source, to: target, type: 'event' },
      ]);
    }
  }, []);

  const nodeTypes = useMemo(() => ({
    functionNode: FunctionNodeComponent,
  }), []);

  const onDrop = useCallback((event: React.DragEvent) => {
    const type = event.dataTransfer.getData('application/x-function-node');
    if (!type) return;

    const newNode: Node = {
      id: `${type}-${Date.now()}`,
      type: 'functionNode',
      position: { x: event.clientX - 300, y: event.clientY - 100 },
      data: { label: type, type },
    };

    setNodes((nds) => [...nds, newNode]);
  }, [setNodes]);

  return (
    <ReactFlowProvider>
      <div className="flex h-full w-full">
        {/* Sidebar */}
        <aside className="w-64 p-4 border-r bg-white overflow-y-auto space-y-2">
          {['buttonOverlay.onClick', 'modal.open'].map((fn) => (
            <DraggableFunctionNode key={fn} type={fn} />
          ))}
        </aside>

        {/* Canvas */}
        <div
          className="flex-1 relative h-full"
          onDrop={onDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>
      </div>
    </ReactFlowProvider>
  );
}
