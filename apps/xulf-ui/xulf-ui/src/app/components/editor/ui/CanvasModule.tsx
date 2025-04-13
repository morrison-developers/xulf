'use client';
import { editorComponentRegistry } from '@xulf/modules';
import { getFunctionProps } from '@xulf/utils';

import type { LayoutModule } from '@xulf/types';
import { useDraggableModule } from '../hooks/useDraggableModule';
import { EditableProp } from '@xulf/modules/src/types';

interface CanvasModuleProps {
  mod: LayoutModule;
  isSelected: boolean;
  onSelect: (id: string) => void;
  connections: { input: string; event: string }[];
  editableProps: EditableProp[];
}

export function CanvasModule({
  mod,
  isSelected,
  onSelect,
  connections,
  editableProps,  // Receive editableProps from EditorShell
}: CanvasModuleProps) {
  const { attributes, listeners, setNodeRef } = useDraggableModule(mod);


  const Component = editorComponentRegistry[mod.type]; 

  if (!Component) {
    return <div className="border p-4 text-red-500">Unknown module type: {mod.type}</div>;
  }


  const handleClick = () => {
    console.log(`Module clicked: ${mod.id}`);
    onSelect(mod.id);
  };

  const updatedProps = {
    ...mod.props,
    ...editableProps.reduce((acc: { [key: string]: any }, { name, type }) => {
      acc[name] = mod.props[name]; // This assumes you want to merge mod.props and editableProps
      return acc;
    }, {}),
  };

  return (
    <div
      ref={setNodeRef}
      onClick={handleClick}
      className={`group relative border rounded p-4 transition cursor-pointer ${
        isSelected ? 'border-blue-500 ring-2 ring-blue-300' : 'border-gray-300 hover:border-gray-400'
      }`}
      style={{
        padding: '16px',
        margin: '8px',
        border: '2px solid #d1d5db',
        borderRadius: '8px',
      }}
    >
      <Component {...updatedProps} {...getFunctionProps(mod.id, connections)} />

      <span className="absolute top-2 right-2 text-xs text-gray-400 opacity-80">
        {mod.type}
      </span>
    </div>
  );
}
