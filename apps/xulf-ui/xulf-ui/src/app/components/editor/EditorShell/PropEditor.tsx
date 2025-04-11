'use client';

import { componentRegistry } from '@xulf/modules';
import { EditableProp } from '@xulf/modules/src/types';

import type { LayoutModule } from '../../../types/layout';

interface PropEditorProps {
  selectedModule: LayoutModule | null;
  editableProps: EditableProp[];
  onPropChange: (key: string, value: any) => void;
}

export function PropEditor({ selectedModule, editableProps, onPropChange }: PropEditorProps) {
  if (!selectedModule) {
    return <p className="text-sm text-gray-500">Select a module to edit its props.</p>;
  }

  const Component = componentRegistry[selectedModule.type];

  return (
    <div className="space-y-4">
      <div className="text-xs uppercase text-gray-400 tracking-wide">
        {selectedModule.type}
      </div>

      <div className="border p-2 rounded bg-gray-50">
        {Component ? <Component {...selectedModule.props} /> : <div className="text-red-500">Unknown component</div>}
      </div>

      <div className="space-y-2">
        {editableProps.map(({ name, type }) => (
          <div key={name} className="text-sm">
            <label className="block font-medium text-gray-700 mb-1">{name}</label>

            {type === 'string' && (
              <input
                type="text"
                value={selectedModule.props[name] || ''}
                onChange={(e) => onPropChange(name, e.target.value)}
                className="w-full border rounded px-2 py-1 text-sm"
              />
            )}

            {type === 'number' && (
              <input
                type="number"
                value={selectedModule.props[name] || 0}
                onChange={(e) => onPropChange(name, Number(e.target.value))}
                className="w-full border rounded px-2 py-1 text-sm"
              />
            )}

            {type === 'boolean' && (
              <input
                type="checkbox"
                checked={!!selectedModule.props[name]}
                onChange={(e) => onPropChange(name, e.target.checked)}
                className="h-4 w-4"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
