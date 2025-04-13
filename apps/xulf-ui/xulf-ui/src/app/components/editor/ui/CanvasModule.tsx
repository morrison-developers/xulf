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
  editableProps,
}: CanvasModuleProps) {
  const { attributes, listeners, setNodeRef } = useDraggableModule(mod);

  const Component = editorComponentRegistry[mod.type]; 
  if (!Component) {
    return <div className="border p-4 text-red-500">Unknown module type: {mod.type}</div>;
  }

  const handleClick = () => {
    console.log(`🖱️ Module clicked: ${mod.id}`);
    onSelect(mod.id);
  };

  // Log the props being passed to the component
  console.log(`🔧 Rendering <${mod.type}>`, {
    id: mod.id,
    props: mod.props,
    hasCustomStyles: mod.props?.['custom-styles'],
    functionProps: getFunctionProps(mod.id, connections),
  });

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
      <Component
        {...Object.fromEntries(
          Object.entries(mod.props).map(([key, value]) => [
            key.replace(/-([a-z])/g, (_, c) => c.toUpperCase()), // kebab-case → camelCase
            value,
          ])
        )}
        {...getFunctionProps(mod.id, connections)}
      />

      <span className="absolute top-2 right-2 text-xs text-gray-400 opacity-80">
        {mod.type}
      </span>

      {!mod.props?.['custom-styles'] && (
        <div className="text-red-500 text-xs mt-2">⚠️ No custom-styles defined</div>
      )}
    </div>
  );
}
