'use client';

import { Handle, NodeProps, Position } from 'react-flow-renderer';

export function FunctionNodeComponent({ data }: NodeProps) {
  return (
    <div className="bg-blue-100 border border-blue-400 p-2 rounded shadow text-sm">
      <div className="font-semibold">{data.label}</div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
