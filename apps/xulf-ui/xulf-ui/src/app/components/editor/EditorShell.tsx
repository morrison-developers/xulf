'use client';

import { useState, useEffect, useMemo } from 'react';
import { DndContext } from '@dnd-kit/core';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { v4 as uuid } from 'uuid';
import { componentRegistry, propMetaRegistry } from '@xulf/modules';
import type { SiteJson } from '../../types/layout';
import debounce from 'lodash/debounce';

interface EditorShellProps {
  siteId: string;
  siteJson: SiteJson;
  selected?: string | null;
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

function DroppableMain({ children }: { children: React.ReactNode }) {
  const { setNodeRef } = useDroppable({
    id: 'canvas-dropzone',
  });

  return (
    <main
      ref={setNodeRef}
      className="flex-1 bg-gray-50 p-6 overflow-y-auto"
    >
      {children}
    </main>
  );
}

function getFunctionProps(id: string, connections: { input: string; event: string }[] = []) {
  const props: Record<string, any> = {};
  for (const { input, event } of connections) {
    if (event === 'onClick') props.openTriggerId = input;
  }
  return props;
}

export default function EditorShell({ siteId, siteJson }: EditorShellProps) {
  const [editorState, setEditorState] = useState<SiteJson>(() => ({
    modules: siteJson?.modules ?? [],
    functionGraph: siteJson?.functionGraph ?? { nodes: [], edges: [] },
  }));  
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedModule = editorState.modules.find((m) => m.id === selectedId);
  const editableProps = selectedModule ? propMetaRegistry[selectedModule.type] ?? [] : [];

  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [isDirty, setIsDirty] = useState(false);

  const saveLayout = debounce(async (newState: SiteJson) => {
    setSaveStatus('saving');
    await fetch(`/api/sites/${siteId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newState),
    });
    setSaveStatus('saved');
    setIsDirty(false);
    setTimeout(() => setSaveStatus('idle'), 1500);
  }, 2000);

  useEffect(() => {
    const fetchLayout = async () => {
      const res = await fetch(`/api/sites/${siteId}`);
      const data = await res.json();
      setEditorState({
        modules: data.layoutJson?.modules ?? [],
        functionGraph: data.layoutJson?.functionGraph ?? { nodes: [], edges: [] },
      });
    };
    fetchLayout();
  }, [siteId]);

  useEffect(() => {
    if (isDirty) {
      saveLayout(editorState);
    }
  }, [editorState, isDirty]);

  const wiringMap = useMemo(() => {
    const map: Record<string, { input: string; event: string }[]> = {};
  
    const edges = editorState.functionGraph?.edges ?? [];
    for (const edge of edges) {
      const [sourceId, sourceEvent] = edge.source.split(':');
      const [targetId, targetHandler] = edge.target.split(':');
  
      if (!map[targetId]) map[targetId] = [];
      map[targetId].push({ input: sourceId, event: sourceEvent });
    }
  
    return map;
  }, [editorState.functionGraph]);  

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
      setIsDirty(true);
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
    setIsDirty(true);
  };

  return (
    <DndContext onDragEnd={handleDrop}>
      <div className="h-screen w-full overflow-hidden flex">
        <aside className="w-64 border-r bg-white p-4 overflow-y-auto">
          <h2 className="text-sm font-semibold mb-4">Modules</h2>
          <div className="space-y-2">
            <DraggableModule type="box" />
            <DraggableModule type="buttonOverlay" />
            <DraggableModule type="image" />
            <DraggableModule type="modal" />
          </div>
        </aside>

        <DroppableMain>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold">Canvas</h2>
            <button
              onClick={() => saveLayout(editorState)}
              disabled={!isDirty}
              className="text-xs px-3 py-1 border rounded bg-white shadow disabled:opacity-50"
            >
              {saveStatus === 'saving'
                ? 'Saving...'
                : saveStatus === 'saved'
                ? 'Saved ✓'
                : isDirty
                ? 'Save Changes'
                : 'No Changes'}
            </button>
          </div>

          <div className="space-y-4">
            {editorState.modules.map((mod) => {
              const Component = componentRegistry[mod.type];
              if (!Component) return <div key={mod.id}>Unknown module type: {mod.type}</div>;

              return (
                <div key={mod.id} onClick={() => setSelectedId(mod.id)}>
                  <Component
                    id={mod.id}
                    {...mod.props}
                    {...getFunctionProps(mod.id, wiringMap[mod.id])}
                  />
                </div>
              );
            })}
          </div>
        </DroppableMain>

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
                {editableProps.map(({ name, type }) => (
                  <div key={name} className="text-sm">
                    <label className="block font-medium text-gray-700 mb-1">{name}</label>

                    {type === 'string' && (
                      <input
                        type="text"
                        value={selectedModule.props[name] || ''}
                        onChange={(e) =>
                          handlePropChange(selectedModule.id, name, e.target.value)
                        }
                        className="w-full border rounded px-2 py-1 text-sm"
                      />
                    )}

                    {type === 'number' && (
                      <input
                        type="number"
                        value={selectedModule.props[name] || 0}
                        onChange={(e) =>
                          handlePropChange(selectedModule.id, name, Number(e.target.value))
                        }
                        className="w-full border rounded px-2 py-1 text-sm"
                      />
                    )}

                    {type === 'boolean' && (
                      <input
                        type="checkbox"
                        checked={!!selectedModule.props[name]}
                        onChange={(e) =>
                          handlePropChange(selectedModule.id, name, e.target.checked)
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