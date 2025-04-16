'use client';

import { editorComponentRegistry } from '@xulf/modules';
import { getFunctionProps } from '@xulf/utils';
import { useDragItem } from '../drag/useDragItem';

import type { ResolvedModuleInstance } from '@xulf/types';
import { EditableProp } from '@xulf/modules/src/types';

import { DropZone } from '../drag/DropZone';
import { DropTargetOverlay } from './DropTargetOverlay';

interface CanvasModuleProps {
  mod: ResolvedModuleInstance;
  isSelected: boolean;
  onSelect: (id: string) => void;
  connections: { input: string; event: string }[];
  editableProps: EditableProp[];
  onDrop: (
    draggedId: string,
    type: string,
    targetId: string,
    position: 'above' | 'below' | 'inside'
  ) => void;
}

export function CanvasModule({
  mod,
  isSelected,
  onSelect,
  connections,
  editableProps,
  onDrop,
}: CanvasModuleProps) {
  const { dragRef, listeners, attributes } = useDragItem({
    id: mod.id,
    type: mod.type,
  });  

  const Component = editorComponentRegistry[mod.type];
  if (!Component) {
    return <div className="border p-4 text-red-500">Unknown module type: {mod.type}</div>;
  }

  const handleClick = () => {
    onSelect(mod.id);
  };

  const camelProps = Object.fromEntries(
    Object.entries(mod.props).map(([key, value]) => [
      key.replace(/-([a-z])/g, (_, c) => c.toUpperCase()),
      value,
    ])
  );

  const children = Array.isArray(mod.props.children) ? mod.props.children : [];

  return (
    <div className="relative">
      <DropZone
        targetId={mod.id}
        position="above"
        onDrop={(draggedId, type) => onDrop(draggedId, type, mod.id, 'above')}
      />
      <div
        ref={dragRef}
        onClick={handleClick}
        {...listeners}
        {...attributes}
        className={`group relative border rounded p-4 transition cursor-pointer ${
          isSelected ? 'border-blue-500 ring-2 ring-blue-300' : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <DropTargetOverlay id={mod.id} />

        <Component
          {...camelProps}
          {...getFunctionProps(mod.id, connections)}
        />

        <span className="absolute top-2 right-2 text-xs text-gray-400 opacity-80">{mod.type}</span>
      </div>

      {children.length === 0 && (
        <DropZone
          targetId={mod.id}
          position="inside"
          onDrop={(draggedId, type) => onDrop(draggedId, type, mod.id, 'inside')}
        />
      )}

      {children.map((child, index) => (
        <div key={child.id}>
          <DropZone
            targetId={child.id}
            position="above"
            onDrop={(draggedId, type) => onDrop(draggedId, type, child.id, 'above')}
          />
          <CanvasModule
            mod={child}
            isSelected={child.id === mod.id}
            onSelect={onSelect}
            connections={connections}
            editableProps={[]}
            onDrop={onDrop}
          />
          {index === children.length - 1 && (
            <DropZone
              targetId={child.id}
              position="below"
              onDrop={(draggedId, type) => onDrop(draggedId, type, child.id, 'below')}
            />
          )}
        </div>
      ))}
    </div>
  );
}