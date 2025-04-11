'use client';

import { useEffect, useMemo, useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import debounce from 'lodash/debounce';
import { v4 as uuid } from 'uuid';

import { componentRegistry, propMetaRegistry } from '@xulf/modules';
import type { SiteJson } from '../../../types/layout';

import { EditorSidebar } from './EditorSidebar';
import { DroppableMain } from './DroppableMain';
import { CanvasModule } from './CanvasModule';
import { PropEditor } from './PropEditor';

interface EditorShellProps {
  siteId: string;
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

export default function EditorShell({ siteId, siteJson }: EditorShellProps) {
  const [editorState, setEditorState] = useState<SiteJson>(() => ({
    modules: siteJson?.modules ?? [],
    functionGraph: siteJson?.functionGraph ?? { nodes: [], edges: [] },
  }));
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [isDirty, setIsDirty] = useState(false);

  const selectedModule = editorState.modules.find((m) => m.id === selectedId) ?? null;
  const editableProps = selectedModule ? propMetaRegistry[selectedModule.type] ?? [] : [];

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
    if (isDirty) saveLayout(editorState);
  }, [editorState, isDirty]);

  const wiringMap = useMemo(() => {
    const map: Record<string, { input: string; event: string }[]> = {};
    for (const edge of editorState.functionGraph?.edges ?? []) {
      const [sourceId, sourceEvent] = edge.source.split(':');
      const [targetId] = edge.target.split(':');

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
          ? { ...mod, props: { ...mod.props, [key]: value } }
          : mod
      ),
    }));
    setIsDirty(true);
  };

  return (
    <DndContext onDragEnd={handleDrop}>
      <div className="h-screen w-full overflow-hidden flex">
        <EditorSidebar />

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
            {editorState.modules.map((mod) => (
              <CanvasModule
                key={mod.id}
                mod={mod}
                isSelected={mod.id === selectedId}
                onSelect={setSelectedId}
                connections={wiringMap[mod.id] ?? []}
              />
            ))}
          </div>
        </DroppableMain>

        <aside className="w-80 border-l bg-white p-4 overflow-y-auto">
          <h2 className="text-sm font-semibold mb-4">Edit Props</h2>
          <PropEditor
            selectedModule={selectedModule}
            editableProps={editableProps}
            onPropChange={(key, value) => {
              if (selectedModule) handlePropChange(selectedModule.id, key, value);
            }}
          />
        </aside>
      </div>
    </DndContext>
  );
}
