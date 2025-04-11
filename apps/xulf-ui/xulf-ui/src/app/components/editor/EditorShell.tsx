'use client';

import { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import { useDraggable } from '@dnd-kit/core';
import { v4 as uuid } from 'uuid';
import DroppableCanvas from './DroppableCanvas';
import { componentRegistry, propMetaRegistry } from '@xulf/editor-ui';
import type { SiteJson } from '../../types/layout';

interface EditorShellProps {
  siteJson: SiteJson;
}

const defaultModuleProps: Record<string, any> = {
  box: {
    customStyles: 'bg-gray-100 p-4',
    children: 'Empty Box',
  },
  buttonOverlay: {
    label: 'Click Me',
    customStyles: 'p-3 bg-blue-600 text-white rounded',
  },
  image: {
    src: 'https://via.placeholder.com/400x200',
    alt: 'Placeholder Image',
    customStyles: 'rounded shadow',
  },
  modal: {
    title: 'Modal Title',
    body: 'This is a modal body.',
    triggerLabel: 'Open Modal',
  },
};

function DraggableModule({ type }: { type: string }) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: `draggable-${type}`,
    data: { type },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="p-2 border rounded bg-white shadow text-sm cursor-pointer hover:bg-gray-50"
    >
      {type}
    </div>
  );
}

export default function EditorShell({ siteJson }: EditorShellProps) {
  const [editorState, setEditorState] = useState<SiteJson>({
    modules: siteJson.modules,
  });

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedModule = editorState.modules.find((m) => m.id === selectedId);
  const editableProps = selectedModule ? propMetaRegistry[selectedModule.type] ?? [] : [];

  const handleDrop = (event: any) => {
    const { over, active } = event;
    const type = active.data?.current?.type;

    if (over?.id === 'canvas-dropzone' && type) {
      setEditorState((prev) => ({
        ...prev,
        modules: [
          ...prev.modules,
          {
            id: uuid(),
            type,
            props: defaultModuleProps[type] ?? {},
          },
        ],
      }));
    }
  };

  const handlePropChange = (id: string, key: string, value: any) => {
    setEditorState((prev) => ({
      ...prev,
      modules: prev.modules.map((mod) =>
        mod.id === id
          ? {
              ...mod,
              props: {
                ...mod.props,
                [key]: value,
              },
            }
          : mod
      ),
    }));
  };

  return (
    <DndContext onDragEnd={handleDrop}>
      <div className="h-screen w-full overflow-hidden flex">
        {/* Left Panel */}
        <aside className="w-64 border-r bg-white p-4 overflow-y-auto">
          <h2 className="text-sm font-semibold mb-4">Modules</h2>
          <div className="space-y-2">
            <DraggableModule type="box" />
            <DraggableModule type="buttonOverlay" />
            <DraggableModule type="image" />
            <DraggableModule type="modal" />
          </div>
        </aside>

        {/* Center Canvas */}
        <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">
          <h2 className="text-sm font-semibold mb-4">Canvas</h2>
          <DroppableCanvas
            layout={editorState.modules}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
          <pre className="text-xs bg-gray-100 p-2 rounded mt-6 overflow-x-auto">
            {JSON.stringify(editorState, null, 2)}
          </pre>
        </main>

        {/* Right Panel */}
        <aside className="w-80 border-l bg-white p-4 overflow-y-auto">
          <h2 className="text-sm font-semibold mb-4">Edit Props</h2>
          {!selectedModule ? (
            <p className="text-sm text-gray-500">Select a module to edit its props.</p>
          ) : (
            <div className="space-y-4">
              <div className="text-xs uppercase text-gray-400 tracking-wide">
                {selectedModule.type}
              </div>
              <div className="border p-2 rounded bg-gray-50">
                {(() => {
                  const Component = componentRegistry[selectedModule.type];
                  return Component ? (
                    <Component {...selectedModule.props} />
                  ) : (
                    <div className="text-red-500">Unknown component</div>
                  );
                })()}
              </div>
              <div className="space-y-2">
                {editableProps.map(({ label, type }) => (
                  <div key={label} className="text-sm">
                    <label className="block font-medium text-gray-700 mb-1">{label}</label>

                    {type === 'text' && (
                      <input
                        type="text"
                        value={selectedModule.props[label] || ''}
                        onChange={(e) =>
                          handlePropChange(selectedModule.id, label, e.target.value)
                        }
                        className="w-full border rounded px-2 py-1 text-sm"
                      />
                    )}

                    {type === 'number' && (
                      <input
                        type="number"
                        value={selectedModule.props[label] || 0}
                        onChange={(e) =>
                          handlePropChange(selectedModule.id, label, Number(e.target.value))
                        }
                        className="w-full border rounded px-2 py-1 text-sm"
                      />
                    )}

                    {type === 'boolean' && (
                      <input
                        type="checkbox"
                        checked={!!selectedModule.props[label]}
                        onChange={(e) =>
                          handlePropChange(selectedModule.id, label, e.target.checked)
                        }
                        className="h-4 w-4"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </DndContext>
  );
}
