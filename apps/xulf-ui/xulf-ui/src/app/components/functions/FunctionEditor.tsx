'use client';

import ReactFlow, {
  Background,
  Controls,
  addEdge,
  useEdgesState,
  useNodesState,
  Connection,
  Node,
  ReactFlowProvider,
} from 'react-flow-renderer';

import { useCallback, useMemo, useState, useEffect } from 'react';
import { FunctionNodeComponent } from './function-nodes/FunctionNodeComponent';
import { DraggableFunctionNode } from './function-nodes/DraggableFunctionNode';
import type { FunctionConnection } from '@xulf/module-props';

interface FunctionEditorProps {
  siteId: string;
  onConnect?: (fromId: string, toId: string) => void;  // Accept onConnect here
}

export default function FunctionEditor({ siteId, onConnect }: FunctionEditorProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [connections, setConnections] = useState<FunctionConnection[]>([]);
  const [isDirty, setIsDirty] = useState(false); // Track if the function graph is modified

  // Fetch the existing function graph from the server when the component mounts
  useEffect(() => {
    const fetchFunctionGraph = async () => {
      try {
        console.log(`Fetching function graph for siteId: ${siteId}`);
        const response = await fetch(`/api/sites/${siteId}/functions`);
        if (response.ok) {
          const data = await response.json();
          if (data.nodes && data.edges) {
            console.log('Fetched function graph:', data);
            setNodes(data.nodes);
            setEdges(data.edges);
          } else {
            console.warn('No functionGraph found in the response');
          }
        } else {
          console.error('Failed to fetch function graph');
        }
      } catch (error) {
        console.error('Error fetching function graph:', error);
      }
    };

    fetchFunctionGraph();
  }, [siteId]);

  const onConnectCallback = useCallback(
    (connection: Connection) => {
      console.log('New connection made:', connection);

      // 1. Visual edge
      setEdges((eds) => addEdge(connection, eds));

      // 2. Logical function connection
      const { source, target } = connection;

      if (source && target) {
        setConnections((prev: FunctionConnection[]) => [
          ...prev,
          { from: source, to: target, type: 'event' },
        ]);

        // Call onConnect if provided
        if (onConnect) {
          onConnect(source, target);
        }
      }

      setIsDirty(true); // Mark as modified when a connection is made
    },
    [onConnect]
  );

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

    console.log('Dropped new node:', newNode);  // Log the newly dropped node
    setNodes((nds) => [...nds, newNode]);

    setIsDirty(true); // Mark as modified when a new node is dropped
  }, [setNodes]);

  // Handle node changes
  const onNodesChangeCallback = useCallback(
    (changes: any) => {
      onNodesChange(changes);
      setIsDirty(true); // Mark as dirty when nodes change
    },
    [onNodesChange]
  );

  // Handle edge changes
  const onEdgesChangeCallback = useCallback(
    (changes: any) => {
      onEdgesChange(changes);
      setIsDirty(true); // Mark as dirty when edges change
    },
    [onEdgesChange]
  );

  // Save the function graph (nodes and edges) to the server
  const saveFunctionGraph = async () => {
    try {
      const functionGraph = { nodes, edges };
      console.log('Saving function graph:', functionGraph);  // Log the functionGraph before sending it

      const response = await fetch(`/api/sites/${siteId}/functions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(functionGraph),
      });

      if (response.ok) {
        console.log('Function graph saved successfully!');
        setIsDirty(false); // Reset the dirty flag after saving
      } else {
        console.error('Failed to save function graph');
      }
    } catch (error) {
      console.error('Error saving function graph:', error);
    }
  };

  return (
    <>
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
              onNodesChange={onNodesChangeCallback}
              onEdgesChange={onEdgesChangeCallback}
              onConnect={onConnectCallback}  // Use onConnectCallback here
              fitView
            >
              <Background />
              <Controls />
            </ReactFlow>
          </div>
        </div>

      </ReactFlowProvider>
      {/* Save Button */}
      {isDirty && (
        <div className="fixed top-4 right-4 z-10 p-4" style={{top: 30, right: 0}}>
          <button
            onClick={saveFunctionGraph}
            className="bg-blue-600 text-white rounded px-6 py-2 hover:bg-blue-700"
          >
            Save Function Graph
          </button>
        </div>
      )}
    </>
  );
}
