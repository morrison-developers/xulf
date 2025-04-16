'use client';

import { Fragment, useEffect, useCallback } from 'react';
import { DropZone } from '../drag/DropZone';
import { CanvasModule } from '../layout/CanvasModule';
import { PropEditor } from '../props/PropEditor';
import { EditorSidebar } from '../sidebar/EditorSidebar';
import { useEditorState } from '../hooks/useEditorState';
import type { SiteJSON } from '@xulf/types';
import { ModuleInstanceToResolvedModuleInstance } from '@xulf/utils';
import { useDnd } from '../drag/DndProvider';

interface EditorShellProps {
  siteId: string;
  siteJson: SiteJSON;
}

export default function EditorShell({ siteId, siteJson }: EditorShellProps) {
  const {
    editorState,
    setEditorState,
    selectedId,
    setSelectedId,
    saveStatus,
    editableProps,
    isDirty,
    setIsDirty,
    saveLayout,
    selectedModule,
  } = useEditorState(siteJson, siteId);

  const { setOnDropHandler } = useDnd();

  const handlePropChange = (moduleId: string, key: string, value: any) => {
    console.log(`🛠️ Prop change → module: ${moduleId}, ${key} =`, value);
    setEditorState((prev) => {
      const mod = ModuleInstanceToResolvedModuleInstance(
        editorState.layout.modules[moduleId],
        editorState.layout.modules
      );

      if (!mod) {
        console.warn(`❌ Module ${moduleId} not found in prop change`);
        return prev;
      }

      const updatedModule = {
        ...mod,
        props: {
          ...mod.props,
          [key]: value,
        },
      };

      const updatedState = {
        ...prev,
        layout: {
          ...prev.layout,
          modules: {
            ...prev.layout.modules,
            [moduleId]: updatedModule,
          },
        },
      };

      setIsDirty(true);
      return updatedState as SiteJSON;
    });
  };

  const handleDropToRoot = useCallback((draggedId: string, type: string, index: number) => {
    console.log(`📥 Drop to root → ${draggedId} (type: ${type}) at index ${index}`);

    setEditorState((prev) => {
      const layout = { ...prev.layout };

      if (!layout.modules[draggedId]) {
        console.log(`🆕 Creating new module ${draggedId} of type ${type}`);
        layout.modules[draggedId] = {
          id: draggedId,
          type: type as 'box',
          props: {},
          children: [],
        };
      }

      Object.values(layout.modules).forEach((mod) => {
        if (mod.children?.includes(draggedId)) {
          console.log(`↪️ Removing ${draggedId} from parent ${mod.id}`);
        }
        mod.children = mod.children?.filter((id) => id !== draggedId) ?? [];
      });

      const newRootIds = layout.rootModuleIds.filter((id) => id !== draggedId);
      newRootIds.splice(index, 0, draggedId);
      console.log('🧱 New rootModuleIds:', newRootIds);

      return {
        ...prev,
        layout: {
          ...layout,
          rootModuleIds: newRootIds,
        },
      };
    });

    setIsDirty(true);
  }, [setEditorState, setIsDirty]);

  const handleDropToModule = useCallback((draggedId: string, type: string, targetId: string, position: 'inside' | 'above' | 'below') => {
    console.log(`📥 Drop to module → ${draggedId} → ${position} ${targetId}`);

    setEditorState((prev) => {
      const layout = { ...prev.layout };

      Object.values(layout.modules).forEach((mod) => {
        if (mod.children?.includes(draggedId)) {
          console.log(`↪️ Removing ${draggedId} from parent ${mod.id}`);
        }
        mod.children = mod.children?.filter((id) => id !== draggedId) ?? [];
      });

      if (!layout.modules[draggedId]) {
        console.log(`🆕 Creating new module ${draggedId} of type ${type}`);
        layout.modules[draggedId] = {
          id: draggedId,
          type: type as 'box',
          props: {},
          children: [],
        };
      }

      if (position === 'inside') {
        console.log(`📦 Inserting ${draggedId} inside ${targetId}`);
        layout.modules[targetId].children = [
          ...(layout.modules[targetId].children ?? []),
          draggedId,
        ];
      } else {
        const parent = Object.values(layout.modules).find((mod) =>
          mod.children?.includes(targetId)
        );

        if (parent) {
          const siblings = parent.children!;
          const idx = siblings.indexOf(targetId);
          const insertAt = position === 'above' ? idx : idx + 1;
          siblings.splice(insertAt, 0, draggedId);
          console.log(`📐 Inserted ${draggedId} ${position} ${targetId} in parent ${parent.id}`);
        } else {
          // fallback for root-level siblings
          const idx = layout.rootModuleIds.indexOf(targetId);
          const newRootIds = layout.rootModuleIds.filter((id) => id !== draggedId);
          const insertAt = position === 'above' ? idx : idx + 1;
          newRootIds.splice(insertAt, 0, draggedId);
          layout.rootModuleIds = newRootIds;
          console.log(`📐 Inserted ${draggedId} ${position} ${targetId} at root level`);
        }
      }

      return { ...prev, layout };
    });

    setIsDirty(true);
  }, [setEditorState, setIsDirty]);

  useEffect(() => {
    setOnDropHandler((payload) => {
      if (!payload || !payload.draggedId || !payload.type) {
        console.warn('❌ Drop handler called with invalid payload', payload);
        return;
      }
  
      const { draggedId, type, targetId, position } = payload;
  
      if (targetId === null) {
        handleDropToRoot(draggedId, type, 0);
      } else {
        handleDropToModule(draggedId, type, targetId, position);
      }
    });
  }, []);  

  return (
    <div className="h-screen w-full overflow-hidden flex">
      <EditorSidebar />

      <div className="flex-1 bg-gray-50 p-6 overflow-y-auto space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold">Canvas</h2>
          <button
            onClick={() => {
              console.log('💾 Saving layout...');
              saveLayout(editorState);
            }}
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

        {editorState.layout.rootModuleIds.length === 0 ? (
          <DropZone
            targetId={null}
            position="inside"
            onDrop={(draggedId, type) => handleDropToRoot(draggedId, type, 0)}
          />
        ) : (
          editorState.layout.rootModuleIds.map((id, index) => {
            const mod = editorState.layout.modules[id];
            const resolvedMod = ModuleInstanceToResolvedModuleInstance(mod, editorState.layout.modules);

            return (
              <Fragment key={id}>
                <DropZone
                  targetId={null}
                  position="above"
                  onDrop={(draggedId, type) => handleDropToRoot(draggedId, type, index)}
                />
                <CanvasModule
                  mod={resolvedMod}
                  isSelected={resolvedMod.id === selectedId}
                  onSelect={(id) => {
                    console.log(`🎯 Module selected: ${id}`);
                    setSelectedId(id);
                  }}
                  connections={[]}
                  editableProps={resolvedMod.id === selectedId ? editableProps : []}
                  onDrop={(draggedId, type, targetId, pos) =>
                    handleDropToModule(draggedId, type, targetId, pos)
                  }
                />
                {index === editorState.layout.rootModuleIds.length - 1 && (
                  <DropZone
                    targetId={null}
                    position="below"
                    onDrop={(draggedId, type) =>
                      handleDropToRoot(draggedId, type, index + 1)
                    }
                  />
                )}
              </Fragment>
            );
          })
        )}
      </div>

      <aside className="w-80 border-l bg-white p-4 overflow-y-auto">
        <h2 className="text-sm font-semibold mb-4">Edit Props</h2>
        <PropEditor
          selectedModule={selectedModule}
          editableProps={editableProps}
          onPropChange={(key, value) => {
            if (selectedModule) {
              console.log(`✏️ Editing prop for ${selectedModule.id}: ${key} =`, value);
              handlePropChange(selectedModule.id, key, value);
            }
          }}
        />
      </aside>
    </div>
  );
}
