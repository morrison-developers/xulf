'use client';
import type { LayoutModule } from '../../types/layout';

interface FunctionShellProps {
  modules: LayoutModule[];
  selected?: string | null;
  onConnect?: (fromId: string, toId: string) => void;
}

export function FunctionShell({ modules, selected, onConnect }: FunctionShellProps) {
  return (
    <div className="space-y-4 text-sm text-gray-700">
      <p>
        <strong>Function Editor</strong> – {modules.length} modules available to wire.
      </p>
      
      <div className="space-y-2">
        {modules.map((mod) => (
          <div
            key={mod.id}
            className={`p-2 border rounded ${
              selected === mod.id ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
          >
            <p className="font-medium">{mod.type}</p>
            <p className="text-xs text-gray-500">ID: {mod.id}</p>
            <button
              className="mt-1 text-xs text-blue-600 underline"
              onClick={() => onConnect?.(selected ?? '', mod.id)}
              disabled={!selected || selected === mod.id}
            >
              Connect to this
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}