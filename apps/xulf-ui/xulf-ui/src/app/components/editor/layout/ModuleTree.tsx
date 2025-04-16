'use client';

import { Fragment } from 'react';
import type { ResolvedModuleInstance } from '@xulf/types';
import { CanvasModule } from './CanvasModule';
import { DropZone } from '../drag/DropZone';
import { EditableProp } from '@xulf/modules/src/types';

interface ModuleTreeProps {
  modules: ResolvedModuleInstance[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  editableProps: EditableProp[];
  connections: { input: string; event: string }[];
  onDrop: (
    draggedId: string,
    type: string,
    targetId: string,
    position: 'above' | 'below' | 'inside'
  ) => void;
}

export function ModuleTree({
  modules,
  selectedId,
  onSelect,
  editableProps,
  connections,
  onDrop,
}: ModuleTreeProps) {
  return (
    <div className="space-y-2">
      {modules.length > 0 && (modules[0].props.children?.length ?? 0) > 0 ? (
        <DropZone
          targetId={null}
          position="inside"
          onDrop={(draggedId, type) => onDrop(draggedId, type, '', 'inside')}
        />
      ) : (
        modules.map((mod, index) => (
          <Fragment key={mod.id}>
            <DropZone
              targetId={mod.id}
              position="above"
              onDrop={(draggedId, type) => onDrop(draggedId, type, mod.id, 'above')}
            />
            <CanvasModule
              mod={mod}
              isSelected={mod.id === selectedId}
              onSelect={onSelect}
              editableProps={mod.id === selectedId ? editableProps : []}
              connections={connections}
              onDrop={onDrop}
            />
            {index === modules.length - 1 && (
              <DropZone
                targetId={mod.id}
                position="below"
                onDrop={(draggedId, type) => onDrop(draggedId, type, mod.id, 'below')}
              />
            )}
          </Fragment>
        ))
      )}
    </div>
  );
}
