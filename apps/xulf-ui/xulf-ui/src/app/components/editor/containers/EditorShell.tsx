import { DndContext, DragEndEvent } from '@dnd-kit/core';

import { EditorSidebar } from '../EditorSidebar';
import { DroppableMain } from '../DroppableMain';
import { CanvasModule } from '../ui/CanvasModule';
import { PropEditor } from '../PropEditor';
import { useEditorState } from '../hooks/useEditorState';
import { DragAndDropHandler } from '../utils/DragAndDropHandler';
import type { SiteJSON } from '@xulf/types';


interface EditorShellProps {
  siteId: string;
  siteJson: SiteJSON;
}

export default function EditorShell({ siteId, siteJson }: EditorShellProps) {
  const {
    editorState, setEditorState, selectedId, setSelectedId, saveStatus, editableProps, isDirty, setIsDirty, saveLayout, 
    // wiringMap, 
    selectedModule
  } = useEditorState(siteJson, siteId);

  const handleDrop = (event: DragEndEvent) => {
    DragAndDropHandler(event, setEditorState, setIsDirty);
  };

  const handlePropChange = (key: string, value: any) => {
    if (selectedModule && selectedModule.props[key] !== value) {
      const updatedEditorState = {
        ...editorState,
        modules: Object.values(editorState.layout.modules).map((mod) =>
          mod.id === selectedModule.id
            ? {
                ...mod,
                props: {
                  ...mod.props,
                  [key]: value, // Update the specific prop
                },
              }
            : mod
        ),
      };
  
      // Deeply serialize props (if necessary) before saving
      const serializedState = JSON.parse(JSON.stringify(updatedEditorState)); // Ensures all nested objects are deeply copied

      setEditorState(serializedState);
      setIsDirty(true);
      saveLayout(serializedState)
    
    }
  };
  

  return (
    <DndContext onDragEnd={(event) => handleDrop(event)}>
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
              {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved ✓' : isDirty ? 'Save Changes' : 'No Changes'}
            </button>
          </div>
          <div className="space-y-4">
            {Object.values(editorState.layout.modules).map((mod) => (
              <CanvasModule
                key={mod.id}
                mod={mod}
                isSelected={mod.id === selectedId}
                onSelect={setSelectedId}
                // connections={wiringMap[mod.id] ?? []}
                connections={[]}
                editableProps={mod.id === selectedId ? editableProps : []}
              />
            ))}
          </div>
        </DroppableMain>
        <aside className="w-80 border-l bg-white p-4 overflow-y-auto">
          <h2 className="text-sm font-semibold mb-4">Edit Props</h2>
          <PropEditor
            selectedModule={selectedModule}
            editableProps={editableProps}
            onPropChange={(key, value) => { if (selectedModule) handlePropChange(selectedModule.id, value); }}
          />
        </aside>
      </div>
    </DndContext>
  );
}
